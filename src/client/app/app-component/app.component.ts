import {Component, Inject, ElementRef} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {
  ROUTE_CONFIG, RouteConfig, RouterService, RouterOutletComponent, NavListComponent
} from '../shared/index';
import {AnimatorService} from '../shared/animation/animator.service';
import {PageSlideInJob} from '../shared/sliding-page/index';
import {preCacheImages} from '../shared/utils';

// In milliseconds.
const SLIDE_IN_DURATION = 1200;
const SLIDE_IN_DELAY = 300;

const IMAGE_PATHS = [
  'assets/images/envelope.png',
  'assets/images/napkin.png',
  'assets/images/notebook.png',
  'assets/images/wood.jpg',
  // TODO: Replace these
  'assets/images/star.png',
  'assets/images/underline.png',
];

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, BioComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'alden-app',
  viewProviders: [AnimatorService, RouterService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [RouterOutletComponent, NavListComponent]
})
export class AppComponent {
  areAssetsLoaded: boolean = false;
  hasAnimationStarted: boolean = false;

  constructor(private pageElementRef: ElementRef, private animator: AnimatorService,
              @Inject(ROUTE_CONFIG) routeConfig: RouteConfig, router: RouterService) {
    preCacheImages(IMAGE_PATHS).then(() => {
      this.areAssetsLoaded = true;
      router.initialize(routeConfig);
      setTimeout(() => this.slideIn(), 0);
    });
  }

  slideIn() {
    let pageElement: HTMLElement = this.pageElementRef.nativeElement.querySelector('.note-pad');
    let bodyElement: HTMLElement = document.querySelector('body') as HTMLElement;

    // Animate in.
    let slideJob = new PageSlideInJob(pageElement, bodyElement, SLIDE_IN_DURATION,
      SLIDE_IN_DELAY, 0, Math.PI / 6);
    this.animator.startJob(slideJob);
    this.hasAnimationStarted = true;
  }
}
