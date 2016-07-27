import {Component} from '@angular/core';
import {AnimatorService} from '../shared/animation/index';
import {RouteDefinition, RouterService} from '../shared/router/index';
import {PageSlideInJob} from './page-slide-in.animation-job';
import {PageSlideOutJob} from './page-slide-out.animation-job';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent {// FIXME: Move the slideState setting and route listening logic to a common parent class.
  constructor(private animator: AnimatorService, router: RouterService) {
    // Animate in.
    this.animator.startJob(new PageSlideInJob());// FIXME

    router.registerRouteListener(this.handleRouteChange.bind(this));
  }

  handleRouteChange(routeDefinition: RouteDefinition) {
    // Animate out.
    this.animator.startJob(new PageSlideOutJob());
    // FIXME:
    // - Add my custom animation module.
    // - Create custom page-slide-in and page-slide-out animation jobs.
    // - Call the jobs from the constructor and here.
  }
}
