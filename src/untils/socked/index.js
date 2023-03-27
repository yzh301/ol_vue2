/**
 * websocket
 */
import Heartbeat from "./heartbeat";
import PollingRollback from "./pollingRollback";

export default class Socket {
  constructor(url) {
    this.ws = null;
    this.url = url;
    this.subscriptionMap = {};
    this.pollingRollback = null;
    this.createPollingCallback(); // 创建轮询
    this.start(); // 启动websocket连接
  }

  start() {
    if (!this.url) return console.error("url is required");
    this.ws = new WebSocket(this.url + "?lang=" + window.localStorage.lang);
    /**
     * websocket 连接
     */
    this.ws.addEventListener("open", this.onOpen); // 监听websocket连接成功事件
    this.ws.addEventListener("message", this.onMessage); // 监听websocket接收到消息事件
    this.ws.addEventListener("close", this.onClose); // 监听websocket关闭事件
    this.ws.addEventListener("error", this.onError); // 监听websocket错误事件
  }

  /**
   * 发送请求
   * @param {Object} payload 请求参数
   */
  request(payload) {
    // 单纯地给服务器发送数据
    if (this.isConnected()) {
      this.ws.send(JSON.stringify({ ...payload, event: "req" }));
    }
  }

  /**
   * 订阅
   * @param {Object} payload 订阅参数
   * @param {Boolean} isReSubscribe 是否重新订阅
   */
  subscribe({ payload, rollback, callback }, isReSubscribe) {
    if (!isReSubscribe && this.subscriptionMap[payload.id]) return;
    this.subscriptionMap[payload.id] = { payload, rollback, callback };
    this.pollingRollback.set(payload.id, rollback);

    if (this.isConnected()) {
      this.ws.send(JSON.stringify({ ...payload, event: "sub" }));
    }
  }

  /**
   * 取消订阅
   * @param {String} id 订阅id
   */
  unSubscribe(id) {
    if (!id) return;

    if (this.isConnected()) {
      if (this.subscriptionMap[id]) {
        const payload = this.subscriptionMap[id].payload;
        this.ws.send(JSON.stringify({ ...payload, event: "cancel" }));

        this.pollingRollback.remove(id);
        delete this.subscriptionMap[id];
      }
    }
  }

  /**
   * 判断websocket是否连接
   * @returns {Boolean} 是否连接
   */
  isConnected() {
    return this.ws && this.ws.readyState === WebSocket.OPEN;
  }

  /**
   * websocket连接成功事件
   */
  onOpen = () => {
    clearInterval(this.reConnectTimer);
    this.createHeartbeat(); // 创建 socket 心脏
    this.reSubscribe(); // 重新订阅已有的sub
    this.pollingRollback.close(); // ws 连接之后，关闭轮询
  };

  /**
   * websocket接收到消息事件
   * @param {Object} result 消息
   */
  onMessage = (result) => {
    const data = result.data;
    if (/ping|pong/i.test(data)) return;

    const normalizedData = JSON.parse(data || "{}");
    this.handleCallback(normalizedData);
  };

  /**
   * 处理回调
   * @param {Object} data 回调数据
   */
  handleCallback = (data) => {
    const id = data.id;
    if (!id) return;

    if (this.subscriptionMap[id]) {
      this.subscriptionMap[id]["callback"] && this.subscriptionMap[id]["callback"](data);
    }
  };

  /**
   * websocket关闭事件
   */
  onClose = () => {
    console.warn(`【Websocket is closed】`);
    this.ws.removeEventListener("open", this.onOpen);
    this.ws.removeEventListener("message", this.onMessage);
    this.ws.removeEventListener("close", this.onClose);
    this.ws.removeEventListener("error", this.onError);
    this.ws = null;
  };

  /**
   * websocket错误事件
   * @param {Object} error 错误信息
   */
  onError = (error) => {
    if (error && error.message) {
      console.error(`【Websocket error】 ${error.message}`);
    }
    this.ws.close();
    this.reConnect();
  };

  /**
   * 重连
   */
  reConnect() {
    // 开启重连
    this.pollingRollback.open(); // ws连接之前，开启轮询

    if (this.reConnectTimer) return;
    this.reConnectTimer = setInterval(() => {
      this.start();
    }, 3000);
  }

  /**
   * 重新订阅
   */
  reSubscribe() {
    Object.values(this.subscriptionMap).forEach((subscription) => this.subscribe(subscription, true));
  }

  /**
   * 创建心跳
   */
  createHeartbeat() {
    this.heartbeat = new Heartbeat(this.ws);
    this.heartbeat.addEventListener("die", () => {
      this.ws.close();
      this.ws.reConnect();
    });
  }

  /**
   * 创建轮询
   */
  createPollingCallback() {
    this.pollingRollback = new PollingRollback();
  }
}
