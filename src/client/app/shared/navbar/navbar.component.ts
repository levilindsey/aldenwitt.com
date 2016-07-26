import {Component} from '@angular/core';
import {MyRouterService} from '../my-router-outlet/index';

/**
 * This class represents the navigation bar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.css'],
  directives: []
})
export class NavbarComponent {
  constructor(private routerService : MyRouterService) {}

  onHomeClicked() {
    this.routerService.goToRoute('home');
  }

  onAboutClicked() {
    this.routerService.goToRoute('about');
  }
}
