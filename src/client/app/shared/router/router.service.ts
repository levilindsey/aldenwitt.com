import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {RouteConfig, RouteDefinition} from './route-config.model';

/**
 * This class provides the MyRouter service that enables custom routing behavior.
 *
 * I created a custom component, because the current official Angular2 router does not support the
 * simultaneous animation of the old and new routes together.
 */
@Injectable()
export class RouterService {
  private routeChangeStream = new Subject();
  private routes = new Map<String, RouteDefinition>();
  private isNavigationInProgress: boolean;
  private defaultRoute: RouteDefinition;

  currentRoute: RouteDefinition;
  isInitialRoute: boolean = false;

  initialize(routeConfig: RouteConfig) {
    // Register a statically defined configuration of default routes.
    routeConfig.forEach((def: RouteDefinition) => {
      this.routes.set(def.name, def);
      if (def.isDefault) {
        this.defaultRoute = def;
      }
    });

    // Listen for URL hash changes.
    window.addEventListener('hashchange', this.handleUrlChange.bind(this));

    // Navigate to the initial route.
    this.handleUrlChange();
  }

  registerRouteListener(callback: RouteChangeHandler): Subscription {
    return this.routeChangeStream.subscribe(callback);
  }

  unregisterRouteListener(subscription: Subscription) {
    subscription.unsubscribe();
  }

  registerRoute(def: RouteDefinition) {
    this.routes.set(def.name, def);
  }

  goToRoute(routeName: string) {
    this.isNavigationInProgress = true;
    let routeDefinition = this.routes.get(routeName) || this.defaultRoute;
    this.isInitialRoute = !this.currentRoute;
    this.currentRoute = routeDefinition;
    location.hash = routeDefinition.path;
    this.routeChangeStream.next(routeDefinition);
  }

  private handleUrlChange() {
    // Don't handle URL changes that were triggered internally.
    if (this.isNavigationInProgress) {
      this.isNavigationInProgress = false;
      return;
    }

    let path = location.hash.slice(1) || '';

    let matchingDefinition: RouteDefinition;
    this.routes.forEach(def => {
      if (def.path === path) {
        matchingDefinition = def;
      }
    });

    this.goToRoute(matchingDefinition && matchingDefinition.name || '');
  }
}

type RouteChangeHandler = (def: RouteDefinition) => void;
