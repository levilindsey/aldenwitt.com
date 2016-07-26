import {Component} from '@angular/core';
import {RouterService} from '../router-outlet/index';
import {RouterLinkDirective} from '../router-outlet/index';

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
