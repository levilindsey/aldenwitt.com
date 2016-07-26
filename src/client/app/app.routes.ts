import {ROUTE_CONFIG} from './shared/index';
import {AboutComponent} from './about/index';
import {HomeComponent} from './home/index';

export const ROUTER_PROVIDERS = [
  {provide: ROUTE_CONFIG, useValue: [
    {name: 'home', path: '/', component: HomeComponent},
    {name: 'about', path: 'about', component: AboutComponent},
  ]}
];
