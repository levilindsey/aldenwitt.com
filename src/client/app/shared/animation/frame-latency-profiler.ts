import {DOMHighResTimeStamp} from './animator.service';
import Timer = NodeJS.Timer;

/**
 * Keeps track of avg/min/max frame latencies over the last logging time period and periodically
 * logs these values.
 */
export class FrameLatencyProfiler {
  private frameCount: number;
  private maxFrameLatency: number;
  private minFrameLatency: number;
  private avgFrameLatency: number;
  private intervalId: Timer;

  /**
   * @param {Number} logPeriod The period at which to print latency log messages. In milliseconds.
   * @param {Number} latencyWarningThreshold If the average latency exceeds this threshold, then the
   * log message is shown as a warning. In milliseconds.
   * @param {String} logLabel A label to show for each latency log message.
   */
  constructor(private logPeriod: number, private latencyWarningThreshold: number,
              private logLabel: string) {}

  start() {
    this.stop();
    this.reset();

    this.intervalId = setInterval(() => {
      this.logFrameLatency();
      this.reset();
    }, this.logPeriod);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  reset() {
    this.frameCount = 0;
    this.maxFrameLatency = Number.MIN_VALUE;
    this.minFrameLatency = Number.MAX_VALUE;
    this.avgFrameLatency = 0;
  }

  /**
   * Keeps track of a running average, min value, and max value for the frame latencies.
   */
  recordFrameLatency(frameLatency: DOMHighResTimeStamp) {
    this.frameCount++;
    this.maxFrameLatency =
        this.maxFrameLatency < frameLatency ? frameLatency : this.maxFrameLatency;
    this.minFrameLatency =
        this.minFrameLatency > frameLatency ? frameLatency : this.minFrameLatency;
    this.avgFrameLatency =
        this.avgFrameLatency + (frameLatency - this.avgFrameLatency) / this.frameCount;
  }

  logFrameLatency() {
    if (this.frameCount > 0) {
      let message = `${this.logLabel}:  AVG=${this.avgFrameLatency.toFixed(3)}  ` +
          `(MAX=${this.maxFrameLatency.toFixed(3)}; MIN=${this.minFrameLatency.toFixed(3)})`;
      if (this.maxFrameLatency >= this.latencyWarningThreshold) {
        console.warn(message);
      } else {
        console.debug(message);
      }
    }
  }
}
