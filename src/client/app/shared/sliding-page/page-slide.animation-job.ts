import {DOMHighResTimeStamp, TransientAnimationJob} from '../animation/index';
import {
  createTransformString, easingFunctions, EasingFunction, getDocumentOffset, setTransform,
  getTranslateXFromTransform, getTranslateYFromTransform, getRotateFromTransform
} from '../utils';

class PageSlideJob extends TransientAnimationJob {
  private deltaTranslationX: number;
  private deltaTranslationY: number;
  private deltaRotation: number;

  private currentTranslationX: number;
  private currentTranslationY: number;
  private currentRotation: number;

  constructor(private pageElement: HTMLElement, private startTranslationX: number,
              private startTranslationY: number, private startRotation: number,
              endTranslationX: number, endTranslationY: number, endRotation: number,
              duration: number, delay: number,  easingFunctionOrName: EasingFunction | string) {
    this.deltaTranslationX = endTranslationX - startTranslationX;
    this.deltaTranslationY = endTranslationY - startTranslationY;
    this.deltaRotation = endRotation - startRotation;
    super(duration, delay, easingFunctionOrName);
  }

  update(currentTime: DOMHighResTimeStamp, deltaTime: DOMHighResTimeStamp) {
    let progress = (currentTime - this.startTime - this.delay) / this.duration;
    progress = progress < 0 ? 0 : progress;
    progress = this.easingFunction(progress);
    this.updateWithProgress(progress);
  }

  private updateWithProgress(progress: number) {
    this.currentTranslationX = this.deltaTranslationX * progress + this.startTranslationX;
    this.currentTranslationY = this.deltaTranslationY * progress + this.startTranslationY;
    this.currentRotation = this.deltaRotation * progress + this.startRotation;
  }

  draw() {
    let transform = createTransformString(this.currentTranslationX, this.currentTranslationY,
        this.currentRotation);
    setTransform(this.pageElement, transform);
  }

  finish(isCancelled: boolean) {
    if (isCancelled) {
      // Leave the page where it is, so that the slide-out animation can start at the current
      // position.
    } else {
      // End the animation with the page at its destination.
      this.updateWithProgress(1);
      this.draw();
    }
  }
}

export class PageSlideInJob extends PageSlideJob {
  constructor(pageElement: HTMLElement, bodyElement: HTMLElement, duration: number, delay: number,
              endRotation: number, startRotation?: number) {
    let documentOffsetY = getDocumentOffset(pageElement).y;
    let startTranslationX = 50;
    let startTranslationY = bodyElement.clientHeight - documentOffsetY + 400;
    let startRotation = typeof startRotation === 'number' ? startRotation : Math.PI / 6;
    let endTranslationX = 0;
    let endTranslationY = 0;

    super(pageElement, startTranslationX, startTranslationY, startRotation, endTranslationX,
        endTranslationY, endRotation, duration, delay, easingFunctions.easeOutQuart);
  }
}

export class PageSlideOutJob extends PageSlideJob {
  constructor(pageElement: HTMLElement, duration: number) {
    let startTranslationX = getTranslateXFromTransform(pageElement);
    let startTranslationY = getTranslateYFromTransform(pageElement);
    let startRotation = getRotateFromTransform(pageElement);
    let documentOffsetX = getDocumentOffset(pageElement).x;
    let endTranslationX = -(documentOffsetX + pageElement.clientWidth + 400);
    let endTranslationY = 100;
    let endRotation = Math.PI / 5;

    super(pageElement, startTranslationX, startTranslationY, startRotation, endTranslationX,
        endTranslationY, endRotation, duration, 0, easingFunctions.easeInOutQuad);
  }
}
