/**
 * WebSocket客户端类
 */

class WebSocketClient {
  /**

   * 构造函数

   * @param {string} url WebSocket连接地址

   */

  constructor(url) {
    this.url = url;

    this.socket = null;

    this.onOpen = null;

    this.onClose = null;

    this.onMessage = null;

    this.onError = null;
  }

  /**

   * 连接WebSocket服务器

   */

  connect() {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = (event) => {
      if (this.onOpen) {
        this.onOpen(event);
      }
    };

    this.socket.onclose = (event) => {
      if (this.onClose) {
        this.onClose(event);
      }
    };

    this.socket.onmessage = (event) => {
      if (this.onMessage) {
        this.onMessage(event);
      }
    };

    this.socket.onerror = (event) => {
      if (this.onError) {
        this.onError(event);
      }
    };
  }

  /**

   * 发送数据到WebSocket服务器

   * @param {string} data 要发送的数据

   */

  send(data) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(data);
    }
  }

  /**

   * 关闭WebSocket连接

   */

  close() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export default WebSocketClient;
