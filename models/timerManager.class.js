class TimerManager {
  static instance = null;

  constructor() {
    if (TimerManager.instance) {
      throw new Error("You can only create one instance of TimerManager!");
    }
    this.intervals = [];
  }

  static getInstance() {
    if (!TimerManager.instance) {
      TimerManager.instance = new TimerManager();
    }
    return TimerManager.instance;
  }

  setInterval(func, duration) {
    const intervalId = setInterval(func, duration);
    this.intervals.push(intervalId);
    return intervalId;
  }

  clearInterval(intervalId) {
    clearInterval(intervalId);
    this.intervals = this.intervals.filter((id) => id !== intervalId);
  }

  clearAllIntervals() {
    this.intervals.forEach((intervalId) => clearInterval(intervalId));
    this.intervals = [];
  }
}
