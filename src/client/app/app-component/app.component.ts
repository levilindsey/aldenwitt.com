import {Component, Inject, ElementRef, AfterContentInit} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {
  ROUTE_CONFIG, RouteConfig, RouterService, RouterOutletComponent, SideMenuComponent
} from '../shared/index';
import {AnimatorService} from '../shared/animation/animator.service';
import {PageSlideInJob} from '../shared/sliding-page/index';

// In milliseconds.
const SLIDE_IN_DURATION = 400;

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
  directives: [RouterOutletComponent, SideMenuComponent]
})
export class AppComponent implements AfterContentInit {
  constructor(private pageElementRef: ElementRef, private animator: AnimatorService,
              @Inject(ROUTE_CONFIG) routeConfig: RouteConfig, router: RouterService) {
    router.initialize(routeConfig);
  }

  ngAfterContentInit() {
    let pageElement: HTMLElement = this.pageElementRef.nativeElement.querySelector('.note-pad');
    let bodyElement: HTMLElement = document.querySelector('body') as HTMLElement;

    // Animate in.
    let slideJob = new PageSlideInJob(pageElement, bodyElement, SLIDE_IN_DURATION, 0, Math.PI / 6);
    this.animator.startJob(slideJob);
  }
}
