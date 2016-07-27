import {AnimationJob} from './animation-job';
import {easingFunctions} from '../utils';
import {DOMHighResTimeStamp} from './animator.service';

/**
 * A TransientAnimationJob is temporary and has a definite beginning and end.
 */
export abstract class TransientAnimationJob extends AnimationJob {
  constructor(protected duration: number, protected easingFunction: Function | string,
              onComplete?: Function) {
    super(onComplete);

    this.duration = duration;
    this.easingFunction = typeof easingFunction == 'function'
        ? easingFunction
        : easingFunctions[easingFunction];
  }

  get endTime(): number {
    return this.startTime + this.duration;
  }

  init() {}

  cancel() {
    this.end();
  }

  start(startTime: DOMHighResTimeStamp) {
    this.startTime = startTime;
    this.isComplete = false;
  }

  protected end() {
    this.isComplete = true;
    this.onComplete();
  }
}
