/**
 * 轮询回滚类
 */
export default class PollingRollback {
  /**
   * 构造函数
   * @param {number} interval - 轮询时间间隔，默认为3000ms
   */
  constructor(interval = 3000) {
    // 回滚函数映射表
    this.rollbackMap = {};
    // 回滚定时器
    this.rollbackTimer = null;
    // 轮询时间间隔
    this.interval = interval;
  }

  /**
   * 设置回滚函数
   * @param {string} id - 回滚函数的id
   * @param {function} rollback - 回滚函数
   */
  set(id, rollback) {
    this.rollbackMap[id] = rollback;
  }

  /**
   * 移除回滚函数
   * @param {string} id - 回滚函数的id
   */
  remove(id) {
    delete this.rollbackMap[id];
  }

  /**
   * 开启轮询
   */
  open() {
    this.rollbackTimer = setInterval(() => {
      Object.values(this.rollbackMap).forEach((rollback) => rollback && rollback());
    }, this.interval);
  }

  /**
   * 关闭轮询
   */
  close() {
    clearInterval(this.rollbackTimer);
  }
}
