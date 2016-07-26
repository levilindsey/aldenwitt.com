import {Component, ComponentRef, DynamicComponentLoader, ViewContainerRef, Type} from '@angular/core';
import {MyRouterService} from './router.service';

/**
 * This class represents a custom router outlet component.
 *
 * I created a custom component, because the current official Angular2 router does not support the
 * simultaneous animation of the old and new routes together.
 */
@Component({
  moduleId: module.id,
  selector: 'my-router-outlet',
  template: ''
})
export class MyRouterOutletComponent {
  private oldComponentRef:ComponentRef<Type>;

  constructor(private routerService: MyRouterService, private loader: DynamicComponentLoader,
              private containerRef: ViewContainerRef) {
    routerService.registerRouteListener(this.handleRouteChange.bind(this));
  }

  handleRouteChange(path : String, component : any) {
    if (this.oldComponentRef) {
      this.oldComponentRef.destroy();
    }
    this.loader.loadNextToLocation(component, this.containerRef).then((ref:ComponentRef) => {
      this.oldComponentRef = ref;
    });
  }
}
