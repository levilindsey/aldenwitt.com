import {Component} from '@angular/core';
import {RouterService} from '../router/index';
import {RouterLinkDirective} from '../router/index';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-side-menu',
  templateUrl: 'side-menu.component.html',
  styleUrls: ['side-menu.component.css'],
  directives: [RouterLinkDirective]
})
export class SideMenuComponent {
}
