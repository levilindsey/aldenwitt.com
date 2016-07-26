import {Component} from '@angular/core';
import {RouterService} from '../router/index';
import {RouterLinkDirective} from '../router/index';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: [RouterLinkDirective]
})
export class NavbarComponent {
}
