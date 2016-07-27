import {Component, ComponentRef, DynamicComponentLoader, ViewContainerRef, Type} from '@angular/core';
import {RouterService} from './router.service';
import {RouteDefinition} from './route-config.model';

const MAX_VIEW_ANIMATION_DURATION = 500;

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
  private currComponentRef:ComponentRef<Type>;
  private prevComponentRef:ComponentRef<Type>;

  constructor(private routerService: RouterService, private loader: DynamicComponentLoader,
              private containerRef: ViewContainerRef) {
    routerService.registerRouteListener(this.handleRouteChange.bind(this));

    // Render the initial route.
    this.handleRouteChange(routerService.currentRoute);
  }

  handleRouteChange(def: RouteDefinition) {
    this.loader.loadNextToLocation(def.component, this.containerRef)
      .then((ref:ComponentRef<any>) => {
        // Clean up any old component that may not have finished animating out.
        this.destroyPreviousComponent();

        this.prevComponentRef = this.currComponentRef;
        this.currComponentRef = ref;

        // Clean up the old component after letting it animate out.
        setTimeout(() => {
          this.destroyPreviousComponent();
        }, MAX_VIEW_ANIMATION_DURATION);
      });
  }

  private destroyPreviousComponent() {
    if (this.prevComponentRef) {
      this.prevComponentRef.destroy();
      this.prevComponentRef = null;
    }
  }
}
