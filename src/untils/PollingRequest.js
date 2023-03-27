/**
 * PollingRequest类，用于轮询请求
 */
class PollingRequest {
  requests = []; // 请求列表
  intervalId = ""; // 定时器id
  currentIndex = 0; // 当前请求的索引
  isPaused = false; // 是否暂停
  isStopped = false; // 是否停止
  isAutoStopped = false; // 是否自动停止
  errorCount = 0; // 请求错误次数
  maxErrorCount = 3; // 最大请求错误次数
  delay = 1000; // 请求间隔时间

  /**
   * 构造函数
   * @param requests 请求列表
   * @param delay 请求间隔时间
   * @param maxErrorCount 最大请求错误次数
   */
  constructor(requests, delay = 1000, maxErrorCount = 3) {
    this.requests = requests;
    this.delay = delay;
    this.maxErrorCount = maxErrorCount;
  }

  /**
   * 开始轮询
   */
  start() {
    if (this.isStopped) {
      console.log("轮询已停止。请创建新实例以重新开始轮询。");
      return;
    }

    if (this.intervalId !== undefined) {
      console.log("轮询已经在运行中。");
      return;
    }

    this.intervalId = setInterval(() => {
      if (this.isPaused) {
        return;
      }

      if (this.currentIndex >= this.requests.length) {
        this.stop();
        return;
      }

      const request = this.requests[this.currentIndex];
      request()
        .then((response) => {
          console.log(`请求 ${this.currentIndex + 1} 成功:`, response);
          this.currentIndex++;
          this.errorCount = 0;
        })
        .catch((error) => {
          console.log(`请求 ${this.currentIndex + 1} 失败:`, error);
          this.errorCount++;

          if (this.errorCount >= this.maxErrorCount) {
            console.log(
              `请求 ${this.currentIndex + 1} 失败，已达到最大错误次数 ${this.maxErrorCount} 次，轮询将停止。`
            );
            this.stop();
            return;
          }
        });
    }, this.delay);
  }

  /**
   * 暂停轮询
   */
  pause() {
    this.isPaused = true;
  }

  /**
   * 恢复轮询
   */
  resume() {
    this.isPaused = false;
  }

  /**
   * 停止轮询
   */
  stop() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
    this.isStopped = true;
  }

  /**
   * 停止自动轮询
   */
  stopAuto() {
    this.isAutoStopped = true;
  }

  /**
   * 判断是否正在轮询
   * @returns 是否正在轮询
   */
  isRunning() {
    return this.intervalId !== undefined;
  }

  /**
   * 判断是否暂停
   * @returns 是否暂停
   */
  isPollingPaused() {
    return this.isPaused;
  }

  /**
   * 判断是否停止
   * @returns 是否停止
   */
  isPollingStopped() {
    return this.isStopped;
  }

  /**
   * 重新开始轮询
   */
  restart() {
    this.currentIndex = 0;
    this.isPaused = false;
    this.isStopped = false;
    this.isAutoStopped = false;
    this.errorCount = 0;
    this.start();
  }

  /**
   * 获取当前请求的索引
   * @returns 当前请求的索引
   */
  getCurrentIndex() {
    return this.currentIndex;
  }

  /**
   * 获取请求错误次数
   * @returns 请求错误次数
   */
  getErrorCount() {
    return this.errorCount;
  }

  /**
   * 设置请求间隔时间
   * @param delay 请求间隔时间
   */
  setDelay(delay) {
    this.delay = delay;
  }

  /**
   * 设置最大请求错误次数
   * @param maxErrorCount 最大请求错误次数
   */
  setMaxErrorCount(maxErrorCount) {
    this.maxErrorCount = maxErrorCount;
  }

  /**
   * 添加请求
   * @param request 请求
   */
  addRequest(request) {
    this.requests.push(request);
  }

  /**
   * 移除请求
   * @param index 请求的索引
   */
  removeRequest(index) {
    if (index < 0 || index >= this.requests.length) {
      console.log(`Index ${index} is out of range.`);
      return;
    }

    this.requests.splice(index, 1);

    if (this.currentIndex >= index) {
      this.currentIndex--;
    }
  }

  /**
   * 清空请求列表
   */
  clearRequests() {
    this.requests = [];
    this.currentIndex = 0;
  }

  /**
   * 获取请求列表
   * @returns 请求列表
   */
  getRequests() {
    return this.requests;
  }

  /**
   * 获取请求间隔时间
   * @returns 请求间隔时间
   */
  getDelay() {
    return this.delay;
  }

  /**
   * 获取最大请求错误次数
   * @returns 最大请求错误次数
   */
  getMaxErrorCount() {
    return this.maxErrorCount;
  }

  /**
   * 判断是否自动停止
   * @returns 是否自动停止
   */
  isAutoPollingStopped() {
    return this.isAutoStopped;
  }

  /**
   * 设置是否自动停止
   * @param isAutoStopped 是否自动停止
   */
  setAutoPollingStopped(isAutoStopped) {
    this.isAutoStopped = isAutoStopped;
  }

  /**
   * 设置当前请求的索引
   * @param index 当前请求的索引
   */
  setIndex(index) {
    if (index < 0 || index >= this.requests.length) {
      console.log(`Index ${index} is out of range.`);
      return;
    }

    this.currentIndex = index;
  }

  /**
   * 设置是否暂停
   * @param isPaused 是否暂停
   */
  setPollingPaused(isPaused) {
    this.isPaused = isPaused;
  }

  /**
   * 获取当前请求
   * @returns 当前请求
   */
  getCurrentRequest() {
    return this.requests[this.currentIndex];
  }

  /**
   * 获取定时器id
   * @returns 定时器id
   */
  getIntervalId() {
    return this.intervalId;
  }

  /**
   * 设置请求错误回调函数
   * @param onError 请求错误回调函数
   */
  setOnError(onError) {
    this.requests.forEach((request, index) => {
      this.requests[index] = () =>
        request().catch((error) => {
          onError(error);
          throw error;
        });
    });
  }

  /**
   * 创建PollingRequest实例并开始轮询
   * @param requests 请求列表
   * @param delay 请求间隔时间
    
   */
  static create(requests, delay = 1000, maxErrorCount = 3) {
    const pollingRequest = new PollingRequest(requests, delay, maxErrorCount);
    pollingRequest.start();
    return pollingRequest;
  }
}
export default PollingRequest;
