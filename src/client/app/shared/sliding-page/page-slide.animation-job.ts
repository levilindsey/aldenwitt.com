import {DOMHighResTimeStamp, TransientAnimationJob} from '../animation/index';
import {createTransformString, easingFunctions, getDocumentOffset, setTransform} from '../utils';

// In milliseconds.
const SLIDE_IN_DURATION = 3500;
const SLIDE_OUT_DURATION = 2500;

class PageSlideJob extends TransientAnimationJob {// FIXME: Figure out why and fix the bug where the page sliding out is destroyed early
  private deltaTranslationX: number;
  private deltaTranslationY: number;
  private deltaRotation: number;

  private currentTranslationX: number;
  private currentTranslationY: number;
  private currentRotation: number;

  constructor(private pageElement: HTMLElement, private startTranslationX: number,
              private startTranslationY: number, private startRotation: number,
              endTranslationX: number, endTranslationY: number, endRotation: number,
              duration: number) {
    this.deltaTranslationX = endTranslationX - startTranslationX;
    this.deltaTranslationY = endTranslationY - startTranslationY;
    this.deltaRotation = endRotation - startRotation;
    super(duration, easingFunctions.easeInOutQuart);
  }

  update(currentTime: DOMHighResTimeStamp, deltaTime: DOMHighResTimeStamp) {
    let progress = (currentTime - this.startTime) / this.duration;
    progress = this.easingFunction(progress);

    this.currentTranslationX = this.deltaTranslationX * progress + this.startTranslationX;
    this.currentTranslationY = this.deltaTranslationY * progress + this.startTranslationY;
    this.currentRotation = this.deltaRotation * progress + this.startRotation;
  }

  draw() {
    let transform = createTransformString(this.currentTranslationX, this.currentTranslationY,
        this.currentRotation);
    setTransform(this.pageElement, transform);
  }
}

export class PageSlideInJob extends PageSlideJob {
  constructor(pageElement: HTMLElement, bodyElement: HTMLElement, endRotation: number) {
    let documentOffsetY = getDocumentOffset(pageElement).y;
    let startTranslationX = 50;
    let startTranslationY = bodyElement.clientHeight - documentOffsetY + 40;
    let startRotation = Math.PI / 6;
    let endTranslationX = 0;
    let endTranslationY = 0;

    super(pageElement, startTranslationX, startTranslationY, startRotation, endTranslationX,
        endTranslationY, endRotation, SLIDE_IN_DURATION);
  }
}

export class PageSlideOutJob extends PageSlideJob {
  constructor(pageElement: HTMLElement, startRotation: number) {
    let documentOffsetX = getDocumentOffset(pageElement).x;
    let startTranslationX = 0;
    let startTranslationY = 0;
    let endTranslationX = -(documentOffsetX + pageElement.clientWidth + 40);// FIXME: Check that clientWidth is correct (as opposed to offsetWidth)
    let endTranslationY = 100;
    let endRotation = Math.PI / 6;

    super(pageElement, startTranslationX, startTranslationY, startRotation, endTranslationX,
        endTranslationY, endRotation, SLIDE_OUT_DURATION);
  }
}
