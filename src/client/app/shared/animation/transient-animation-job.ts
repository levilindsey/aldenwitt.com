import {AnimationJob} from './animation-job';
import {easingFunctions, EasingFunction} from '../utils';

/**
 * A TransientAnimationJob is temporary and has a definite beginning and end.
 */
export abstract class TransientAnimationJob extends AnimationJob {
  easingFunction: EasingFunction;

  constructor(protected duration: number, protected delay: number,
              easingFunctionOrName: EasingFunction | string,
              onComplete?: Function) {
    super(onComplete);

    this.easingFunction = typeof easingFunctionOrName == 'function'
        ? easingFunctionOrName
        : easingFunctions[easingFunctionOrName as string];
  }

  get endTime(): number {
    return this.startTime + this.duration + this.delay;
  }

  init() {}
}
