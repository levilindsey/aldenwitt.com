import {Component, Inject} from '@angular/core';
import {ROUTE_CONFIG, RouteConfig, RouterLinkDirective, RouterService} from '../router/index';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.css'],
  directives: [RouterLinkDirective]
})
export class SideMenuComponent {
  constructor(@Inject(ROUTE_CONFIG) public routeConfig: RouteConfig,
              public router: RouterService) {}
}
