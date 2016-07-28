import {ROUTE_CONFIG} from './shared/index';
import {BioComponent} from './bio/index';
import {HomeComponent} from './home/index';
import {ContactComponent} from './contact/contact.component';

export const ROUTER_PROVIDERS = [
  {provide: ROUTE_CONFIG, useValue: [
    {name: 'home', path: '', component: HomeComponent, isDefault: true},
    {name: 'bio', path: 'bio', component: BioComponent},
    {name: 'contact', path: 'contact', component: ContactComponent},
  ]}
];
