import {Injectable} from '@angular/core';
import {FrameLatencyProfiler} from './frame-latency-profiler';
import {PersistentAnimationJob} from './persistent-animation-job';
import {TransientAnimationJob} from './transient-animation-job';
import {AnimationJob} from './animation-job';

let _DELTA_TIME_UPPER_THRESHOLD = 200;
let _FRAME_DURATION_WARNING_THRESHOLD = 1000 / 30;
let _FRAME_LATENCY_LOG_PERIOD = 5000;
let _LATENCY_LOG_LABEL = 'Animation frame period';

/**
 * Handles an animation loop.
 *
 * This class's responsibilities include:
 * - updating modules for the current frame,
 * - drawing renderables for the current frame,
 * - starting and stopping transient animation jobs,
 * - capping time step durations at a max threshold.
 */
@Injectable()
export class AnimatorService {
  private jobs: AnimationJob[] = [];
  private previousTime: number;
  private _isPaused: boolean = true;
  private requestAnimationFrameId: number;
  private latencyProfiler: FrameLatencyProfiler =
    new FrameLatencyProfiler(_FRAME_LATENCY_LOG_PERIOD, _FRAME_DURATION_WARNING_THRESHOLD,
      _LATENCY_LOG_LABEL);

  /**
   * Starts the given AnimationJob.
   */
  startJob(job: AnimationJob) {
    // Is this a restart?
    if (!job.isComplete) {
      console.debug(`Restarting AnimationJob: ${job.constructor.name}`);

      if (job instanceof PersistentAnimationJob) {
        job.reset();
      } else {
        job.finish(true);
        job.start(window.performance.now());
      }
    } else {
      console.debug(`Starting AnimationJob: ${job.constructor.name}`);

      job.start(window.performance.now());
      this.jobs.push(job);
    }

    this.startAnimationLoop();
  }

  /**
   * Cancels the given AnimationJob.
   */
  cancelJob(job: AnimationJob) {
    console.debug(`Cancelling AnimationJob: ${job.constructor.name}`);
    job.finish(true);
  }

  /**
   * Cancels all running AnimationJobs.
   */
  cancelAll() {
    while (this.jobs.length) {
      this.cancelJob(this.jobs[0]);
    }
  }

  get currentTime(): DOMHighResTimeStamp {
    return this.previousTime;
  }

  get isPaused(): boolean {
    return this._isPaused;
  }

  pause() {
    this.stopAnimationLoop();
    console.debug('Animator paused');
  }

  unpause() {
    this.startAnimationLoop();
    console.debug('Animator unpaused');
  }

  /**
   * This is the animation loop that drives all of the animation.
   */
  private animationLoop(currentTime: DOMHighResTimeStamp) {
    let deltaTime = currentTime - this.previousTime;

    this.latencyProfiler.recordFrameLatency(deltaTime);

    // Large delays between frames can cause lead to instability in the system, so this caps them to
    // a max threshold.
    deltaTime = deltaTime > _DELTA_TIME_UPPER_THRESHOLD ? _DELTA_TIME_UPPER_THRESHOLD : deltaTime;

    this.previousTime = currentTime;

    if (!this._isPaused) {
      this.requestAnimationFrameId = window.requestAnimationFrame(this.animationLoop.bind(this));
      this.updateJobs(currentTime, deltaTime);
      this.drawJobs();
    }
  }

  /**
   * Updates all of the active AnimationJobs.
   */
  private updateJobs(currentTime: DOMHighResTimeStamp, deltaTime: DOMHighResTimeStamp) {
    for (let i = 0, count = this.jobs.length; i < count; i += 1) {
      let job = this.jobs[i];

      // Remove jobs from the list after they are complete
      if (job.isComplete) {
        this.removeJob(job, i);
        i--;
        count--;
        continue;
      }

      // Check whether the job is transient and has reached its end.
      if (job instanceof TransientAnimationJob && job.endTime < currentTime) {
        job.finish(false);
      } else {
        job.update(currentTime, deltaTime);
      }
    }
  }

  /**
   * Removes the given job from the collection of active, animating jobs.
   */
  private removeJob(job: AnimationJob, index: number = -1) {
    console.debug(`Removing AnimationJob: ${job.constructor.name}`);
    if (index >= 0) {
      this.jobs.splice(index, 1);
    } else {
      let count = this.jobs.length;
      for (index = 0; index < count; index += 1) {
        if (this.jobs[index] === job) {
          this.jobs.splice(index, 1);
          break;
        }
      }
    }

    // Stop the animation loop when there are no more jobs to animate
    if (this.jobs.length === 0) {
      this.stopAnimationLoop();
    }
  }

  /**
   * Draws all of the active AnimationJobs.
   */
  private drawJobs() {
    for (let i = 0, count = this.jobs.length; i < count; i += 1) {
      this.jobs[i].draw();
    }
  }

  /**
   * Starts the animation loop if it is not already running.
   *
   * This method is idempotent.
   */
  private startAnimationLoop() {
    this._isPaused = false;

    // Only actually start the loop if it isn't already running and the page has focus.
    if (!this.requestAnimationFrameId && !document.hidden) {
      this.latencyProfiler.start();
      this.previousTime = window.performance.now();
      this.requestAnimationFrameId = window.requestAnimationFrame(this.animationLoop.bind(this));
    }
  }

  /**
   * Stops the animation loop.
   */
  private stopAnimationLoop() {
    this._isPaused = true;
    window.cancelAnimationFrame(this.requestAnimationFrameId);
    this.requestAnimationFrameId = null;
    this.latencyProfiler.stop();
  }
}

/**
 * A number of milliseconds, accurate to one thousandth of a millisecond.
 */
export type DOMHighResTimeStamp = number;
