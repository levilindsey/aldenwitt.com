import {Component, Inject} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';

import {Config, ROUTE_CONFIG, RouteConfig, RouterService, NameListService, RouterOutletComponent, NavbarComponent, ToolbarComponent} from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'alden-app',
  viewProviders: [RouterService, NameListService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  directives: [RouterOutletComponent, NavbarComponent, ToolbarComponent]
})
export class AppComponent {
  constructor(@Inject(ROUTE_CONFIG) routeConfig: RouteConfig, routerService: RouterService) {
    console.log('Environment config', Config);
    routerService.initialize(routeConfig);
  }
}
