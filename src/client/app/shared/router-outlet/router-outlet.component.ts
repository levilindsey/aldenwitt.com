import {Component, ComponentRef, DynamicComponentLoader, ViewContainerRef, Type} from '@angular/core';
import {RouterService} from './router.service';

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
  }

  handleRouteChange(path : string, component : any) {
    if (this.oldComponentRef) {
      this.oldComponentRef.destroy();
    }
    this.loader.loadNextToLocation(component, this.containerRef).then((ref:ComponentRef) => {
      this.oldComponentRef = ref;
    });
  }
}
