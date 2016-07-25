import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { Config, NameListService, MyRouterOutletComponent, NavbarComponent, ToolbarComponent } from './shared/index';

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, AboutComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'sd-app',
  viewProviders: [NameListService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  directives: [NavbarComponent, ToolbarComponent]
})
export class AppComponent {
  constructor() {
    console.log('Environment config', Config);
  }
}
