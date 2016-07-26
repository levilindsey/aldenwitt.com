import {RouteConfig} from './shared/index';
import {AboutComponent} from './about/index';
import {HomeComponent} from './home/index';

var routeConfig = new RouteConfig({
  '/': HomeComponent,
  'home': HomeComponent,
  'about': AboutComponent
});

export const ROUTER_PROVIDERS = [
  {provide: RouteConfig, useValue: routeConfig}
];
