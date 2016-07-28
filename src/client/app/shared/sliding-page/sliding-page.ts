import {ElementRef, OnDestroy} from '@angular/core';
import {AnimatorService, TransientAnimationJob} from '../animation/index';
import {RouteDefinition, RouterService} from '../router/index';
import {PageSlideInJob, PageSlideOutJob} from './page-slide.animation-job';
import {randomFloatInRange} from '../utils';
import {Subscription} from 'rxjs/Subscription';

// In radians.
const MAX_PAGE_ROTATION = Math.PI / 28;

/**
 * This class represents a page that slides in and out.
 */
export class SlidingPage implements OnDestroy {
  private pageElement: HTMLElement;
  private rotation: number;
  private slideJob: TransientAnimationJob;
  private routeSubscription: Subscription;

  constructor(pageElementRef: ElementRef, private animator: AnimatorService,
              private router: RouterService) {
    this.pageElement = pageElementRef.nativeElement;
    let bodyElement: HTMLElement = document.querySelector('body') as HTMLElement;
    this.rotation = randomFloatInRange(-MAX_PAGE_ROTATION, MAX_PAGE_ROTATION);

    // Animate in.
    this.slideJob = new PageSlideInJob(this.pageElement, bodyElement, this.rotation);
    this.animator.startJob(this.slideJob);

    this.routeSubscription = this.router.registerRouteListener(this.handleRouteChange.bind(this));
  }

  handleRouteChange(routeDefinition: RouteDefinition) {
    this.cancelPreviousAnimation();

    // Animate out.
    this.slideJob = new PageSlideOutJob(this.pageElement, this.rotation);
    this.animator.startJob(this.slideJob);
  }

  ngOnDestroy() {
    this.cancelPreviousAnimation();
    this.router.unregisterRouteListener(this.routeSubscription);
  }

  private cancelPreviousAnimation() {
    if (this.slideJob) {
      this.animator.cancelJob(this.slideJob);
      this.slideJob = null;
    }
  }
}
