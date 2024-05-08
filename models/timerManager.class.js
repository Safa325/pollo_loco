class TimerManager {
  static instance = null;

  constructor() {
    if (TimerManager.instance) {
      throw new Error("You can only create one instance of TimerManager!");
    }
    this.intervals = [];
  }

  /**
   * Returns the singleton instance of TimerManager.
   * @returns {TimerManager} The singleton instance of TimerManager.
   */
  static getInstance() {
    if (!TimerManager.instance) {
      TimerManager.instance = new TimerManager();
    }
    return TimerManager.instance;
  }

  /**
   * Sets an interval and keeps track of its ID.
   * @param {Function} func - The function to execute at each interval.
   * @param {number} duration - The time, in milliseconds, between each execution of the function.
   * @returns {number} The interval ID.
   */
  setInterval(func, duration) {
    const intervalId = setInterval(func, duration);
    this.intervals.push(intervalId);
    return intervalId;
  }

  /**
   * Clears an interval and removes its ID from the tracking list.
   * @param {number} intervalId - The ID of the interval to clear.
   */
  clearInterval(intervalId) {
    clearInterval(intervalId);
    this.intervals = this.intervals.filter((id) => id !== intervalId);
  }

  /**
   * Clears all intervals and empties the tracking list.
   */
  clearAllIntervals() {
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals = [];
  }
}
