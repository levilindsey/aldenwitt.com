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
  'assets/images/sexy-songwriter.png',
  // TODO: Keep these up-to-date!
  'assets/images/alden-witt-title.png',
  'assets/images/bio-header.png',
  'assets/images/bio-nav-arrow.png',
  'assets/images/bio-nav-no-arrow.png',
  'assets/images/boat.png',
  'assets/images/contact-header.png',
  'assets/images/contact-nav-arrow.png',
  'assets/images/contact-nav-no-arrow.png',
  'assets/images/envelope.png',
  'assets/images/groceries.png',
  'assets/images/home-nav-arrow.png',
  'assets/images/home-nav-no-arrow.png',
  'assets/images/napkin.png',
  'assets/images/notebook.png',
  'assets/images/sexy-songwriter.png',
  'assets/images/songwriter.png',
  'assets/images/spaceship.png',
  'assets/images/star-bio.png',
  'assets/images/star-contact.png',
  'assets/images/star-home.png',
  'assets/images/underline.png',
  'assets/images/wood.jpg',
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
      setTimeout(() => {
        this.areAssetsLoaded = true;
        router.initialize(routeConfig);
        setTimeout(() => this.slideIn(), 0);
      }, 1000);
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
