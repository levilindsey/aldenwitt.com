import {Component, ComponentRef, DynamicComponentLoader, ViewContainerRef, Type} from '@angular/core';
import {RouterService} from './router.service';
import {RouteDefinition} from './route-config.model';

/**
 * This class represents a custom router outlet component.
 *
 * I created a custom component, because the current official Angular2 router does not support the
 * simultaneous animation of the old and new routes together.
 */
@Component({
  moduleId: module.id,
  selector: 'router-outlet',
  template: ''
})
export class RouterOutletComponent {
  private oldComponentRef:ComponentRef<Type>;

  constructor(private routerService: RouterService, private loader: DynamicComponentLoader,
              private containerRef: ViewContainerRef) {
    routerService.registerRouteListener(this.handleRouteChange.bind(this));

    // Render the initial route.
    this.handleRouteChange(routerService.currentRoute);
  }

  handleRouteChange(def: RouteDefinition) {
    if (this.oldComponentRef) {
      this.oldComponentRef.destroy();
    }
    this.loader.loadNextToLocation(def.component, this.containerRef).then((ref:ComponentRef<any>) => {
      this.oldComponentRef = ref;
    });
  }
}
