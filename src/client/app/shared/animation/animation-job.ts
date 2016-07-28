import {DOMHighResTimeStamp} from './animator.service';

var count = 0;// FIXME

/**
 * An AnimationJob is used with the animator controller to update and re-draw something each frame.
 */
export abstract class AnimationJob {
  protected startTime: DOMHighResTimeStamp = 0;
  isComplete: boolean = true;
  index;

  constructor(protected onComplete?: Function) {this.index = count++;}

  /**
   * Sets this AnimationJob as started.
   */
  start(startTime: DOMHighResTimeStamp) {
    this.startTime = startTime;
    this.isComplete = false;
  }

  /**
   * Updates the animation progress of this AnimationJob to match the given time.
   *
   * This is called from the overall animation loop.
   */
  abstract update(currentTime: DOMHighResTimeStamp, deltaTime: DOMHighResTimeStamp): void;

  /**
   * Draws the current state of this AnimationJob.
   *
   * This is called from the overall animation loop.
   */
  draw() {}

  /**
   * Handles any necessary state for this AnimationJob being finished.
   */
  finish() {
    // if (this.index === 18) {
    //   debugger;// FIXME
    // }
    this.isComplete = true;

    if (this.onComplete) {
      this.onComplete();
    }
  }
}
