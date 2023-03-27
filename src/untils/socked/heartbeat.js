/**
 * 心跳
 */
const INTERVAL = 5000; // ping 的间隔
const TIMEOUT = INTERVAL * 2; // 超时时间（只能是INTERVAL的整数倍数，超过这个时间会触发心跳死亡事件） 默认为 ping 两次没有响应则超时
const DIE_EVENT = new CustomEvent("die"); // 心跳死亡事件 => 超时时触发

export default class Heartbeat extends EventTarget {
  constructor(ws, interval, timeout) {
    super();
    if (!ws) return;
    this.ws = ws;
    this.interval = interval || INTERVAL;
    this.timeout = timeout || TIMEOUT;
    this.counter = 0;

    this.ws.addEventListener("message", this.onMessage);
    this.ws.addEventListener("close", this.onClose);
    this.start();
  }

  // 发送 ping 消息
  ping() {
    this.counter += 1;
    if (this.counter > this.timeout / this.interval) {
      // ping 没有响应 pong
      this.dispatchEvent(DIE_EVENT);
      return;
    }

    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const data = JSON.stringify({ ping: new Date().getTime() });
      this.ws.send(data);
    }
  }

  // 发送 pong 消息
  pong(data) {
    this.ws.send(data.replace("ping", "pong"));
  }

  // 处理收到的消息
  onMessage = (result) => {
    const data = result.data;

    if (/pong/i.test(data)) {
      // 服务器响应重新计数
      return (this.counter = 0);
    }

    if (/ping/.test(data)) {
      // 服务器 ping 我们
      return this.pong(data);
    }
  };

  // 关闭连接
  onClose = () => {
    this.ws.removeEventListener("message", this.onMessage);
    this.ws.removeEventListener("close", this.onClose);
    this.ws = null;
    clearInterval(this.keepAliveTimer);
  };
}
