import {Component, Inject} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {ROUTE_CONFIG, RouteConfig, RouterService, RouterOutletComponent, SideMenuComponent} from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'alden-app',
  viewProviders: [RouterService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [RouterOutletComponent, SideMenuComponent]
})
export class AppComponent {
  constructor(@Inject(ROUTE_CONFIG) routeConfig: RouteConfig, routerService: RouterService) {
    routerService.initialize(routeConfig);
  }
}
