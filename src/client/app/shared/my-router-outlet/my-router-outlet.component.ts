import {Component, ComponentRef, DynamicComponentLoader, ViewContainerRef, Type} from '@angular/core';
import {MyRouterService} from './my-router-outlet.service';
import {HomeComponent} from '../../home/home.component';

/**
 * This class represents a custom router outlet component.
 *
 * I created a custom component, because the current official Angular2 router does not support the
 * simultaneous animation of the old and new routes together.
 */
@Component({
  moduleId: module.id,
  selector: 'my-router-outlet'
})
export class MyRouterOutletComponent {
  private oldComponentRef:ComponentRef<Type>;

  constructor(private routerService: MyRouterService, private loader: DynamicComponentLoader, private containerRef: ViewContainerRef) {
    this.handleRouteChange();
  }

  handleRouteChange(): Promise<void> {
    if (this.oldComponentRef) {
      this.oldComponentRef.destroy();
    }
    this.loader.loadNextToLocation(HomeComponent, this.containerRef).then((ref:ComponentRef<Type>) => {
      this.oldComponentRef = ref;
    });
    return Promise.resolve();// TODO: look up how to actually handle the Promise/PromiseController pair
  }

  // TODO
}
