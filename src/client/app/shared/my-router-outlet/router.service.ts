import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RouteConfig} from './route-config.model';

/**
 * This class provides the MyRouter service that enables custom routing behavior.
 *
 * I created a custom component, because the current official Angular2 router does not support the
 * simultaneous animation of the old and new routes together.
 */
@Injectable()
export class MyRouterService {
  private routeChangeStream = new Subject();
  private routes = new Map<String, any>();

  constructor(routeConfig: RouteConfig) {
    // Register a statically defined configuration of default routes.
    Object.keys(routeConfig.config).forEach((path: String) =>
        this.routes.set(path, routeConfig.config[path]));
  }

  registerRouteListener(callback: RouteChangeHandler) {
    this.routeChangeStream.subscribe(path => callback(path, this.routes.get(path)));
  }

  registerRoute(path: String, component: any) {
    this.routes.set(path, component);
  }

  goToRoute(path: String) {
    this.routeChangeStream.next(path);
  }
}

type RouteChangeHandler = (path: String, component: any) => void;
