import {Directive, HostListener, Input} from '@angular/core';
import {RouterService} from './router.service';

/**
 * This class represents a custom router outlet component.
 *
 * I created a custom component, because the current official Angular2 router does not support the
 * simultaneous animation of the old and new routes together.
 */
@Directive({
  selector: '[routerLink]'
})
export class RouterLinkDirective {
  constructor(private router: RouterService) {}

  @Input('routerLink')
  path: string;

  @HostListener('click')
  onClick() {
    this.router.goToRoute(this.path);
  }
}
