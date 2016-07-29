import {
  Component, ComponentRef, DynamicComponentLoader, ViewContainerRef, Type,
  OnDestroy
} from '@angular/core';
import {RouterService} from './router.service';
import {RouteDefinition} from './route-config.model';
import {Subscription} from 'rxjs/Subscription';

const MAX_VIEW_ANIMATION_DURATION = 5000;

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
export class RouterOutletComponent implements OnDestroy {
  private currComponentRef: ComponentRef<Type>;
  private prevComponentRef: ComponentRef<Type>;
  private routeSubscription: Subscription;

  constructor(private router: RouterService, private loader: DynamicComponentLoader,
              private containerRef: ViewContainerRef) {
    this.routeSubscription = this.router.registerRouteListener(this.handleRouteChange.bind(this));

    // Render the initial route.
    this.handleRouteChange(this.router.currentRoute);
  }

  handleRouteChange(def: RouteDefinition) {
    this.loader.loadNextToLocation(def.component, this.containerRef)
      .then((ref:ComponentRef<any>) => {
        // Clean up any old component that may not have finished animating out.
        this.destroyPreviousComponent(this.prevComponentRef);

        this.prevComponentRef = this.currComponentRef;
        this.currComponentRef = ref;

        // Clean up the old component after letting it animate out.
        setTimeout(this.destroyPreviousComponent.bind(this, this.prevComponentRef),
            MAX_VIEW_ANIMATION_DURATION);
      });
  }

  private destroyPreviousComponent(prevComponentRef) {
    if (prevComponentRef) {
      prevComponentRef.destroy();
      prevComponentRef = null;
    }
  }

  ngOnDestroy() {
    this.router.unregisterRouteListener(this.routeSubscription);
  }
}
