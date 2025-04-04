/**
 * Logger Utility
 * 
 * Provides logging functionality for the Cline agent.
 */

class Logger {
  constructor(module) {
    this.module = module;
    this.levels = {
      debug: 0,
      info: 1,
      warn: 2,
      error: 3
    };

    // Default log level
    this.level = this.levels.info;

    // Check for environment configuration
    if (process.env.LOG_LEVEL && this.levels[process.env.LOG_LEVEL] !== undefined) {
      this.level = this.levels[process.env.LOG_LEVEL];
    }
  }

  /**
   * Format log message
   * @param {String} level Log level
   * @param {String} message Log message
   * @returns {String} Formatted message
   */
  formatMessage(level, message) {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level.toUpperCase()}] [${this.module}] ${message}`;
  }

  /**
   * Log debug message
   * @param {String} message Log message
   */
  debug(message) {
    if (this.level <= this.levels.debug) {
      console.debug(this.formatMessage('debug', message));
    }
  }

  /**
   * Log info message
   * @param {String} message Log message
   */
  info(message) {
    if (this.level <= this.levels.info) {
      console.info(this.formatMessage('info', message));
    }
  }

  /**
   * Log warning message
   * @param {String} message Log message
   */
  warn(message) {
    if (this.level <= this.levels.warn) {
      console.warn(this.formatMessage('warn', message));
    }
  }

  /**
   * Log error message
   * @param {String} message Log message
   */
  error(message) {
    if (this.level <= this.levels.error) {
      console.error(this.formatMessage('error', message));
    }
  }
}

export default Logger;