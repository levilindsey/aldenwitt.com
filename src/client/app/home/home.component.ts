import {Component} from '@angular/core';
import {RouteDefinition, RouterService} from '../shared/router/index';

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
  constructor(routerService: RouterService) {
    // Animate in.
    // FIXME

    routerService.registerRouteListener(this.handleRouteChange.bind(this));
  }

  handleRouteChange(routeDefinition: RouteDefinition) {
    // Animate out.
    // FIXME:
    // - Add my custom animation module.
    // - Create custom page-slide-in and page-slide-out animation jobs.
    // - Call the jobs from the constructor and here.
  }
}
