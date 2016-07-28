import {DOMHighResTimeStamp, TransientAnimationJob} from '../shared/animation/index';
import {createTransformString, easingFunctions, setTransform} from '../shared/utils';

// In milliseconds.
const _DURATION = 350;

export class PageSlideOutJob extends TransientAnimationJob {// FIXME: Remove the PageSlideIn job class, and make this one class configurable for both cases??
  constructor(private pageElement: HTMLElement, private bodyElement: HTMLElement) {
    super(_DURATION, easingFunctions.easeInOutQuart);

    // let boundingRect = this.pageElement.getBoundingClientRect();// position relative to viewport
    // window.pageXOffset//cross-browser scroll position

    // TODO: rewrite utils.getPageOffset using the above (and copy to other projects)

    endDisplacementX = ;
    endDisplacementY = ;
    endRotation = ;
  }

  update(currentTime: DOMHighResTimeStamp, deltaTime: DOMHighResTimeStamp) {
    if (currentTime > this.startTime + this.duration) {
      this.end();
    } else {
      let progress = (currentTime - this.startTime) / this.duration;
      progress = this.easingFunction(progress);

      this.displacementX = this.endDisplacementX * progress;
      this.displacementY = this.endDisplacementY * progress;
      this.rotation = this.endRotation * progress;
    }
  }

  draw() {
    let transform = createTransformString(this.displacementX, this.displacementY, this.rotation);
    setTransform(this.pageElement, transform);
  }
}
