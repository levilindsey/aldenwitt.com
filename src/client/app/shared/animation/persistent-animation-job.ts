import {AnimationJob} from './animation-job';

/**
 * A PersistentAnimationJob recurs or has an indefinite duration.
 */
export abstract class PersistentAnimationJob extends AnimationJob {
  constructor(onComplete?: Function) {
    super(onComplete);
  }

  abstract reset(): void;
}
