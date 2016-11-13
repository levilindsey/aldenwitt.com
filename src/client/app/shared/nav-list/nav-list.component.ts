import {NgStyle} from '@angular/common';
import {Component, Inject} from '@angular/core';
import {
  ROUTE_CONFIG,
  RouteConfig,
  RouteDefinition,
  RouterLinkDirective,
  RouterService
} from '../router/index';
import {LightboxTriggerComponent} from '../lightbox/index';

const MAX_STAR_ROTATION = Math.PI / 12;

const SOCIAL_MEDIA_DATA = [
  {
    link: 'https://soundcloud.com/aldenwitt/sets/alden-witt-playlist/s-lo9Lr',
    src: 'assets/images/soundcloud-icon.png',
    alt: 'SoundCloud icon'
  },
  {
    link: 'https://www.facebook.com/Alden-Witt-159711814127085/',
    src: 'assets/images/facebook-icon.png',
    alt: 'Facebook icon'
  }
];

/**
 * This class represents navigation list component that can be styled to be shown either vertically
 * or horizontally.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-nav-list',
  templateUrl: 'nav-list.component.html',
  styleUrls: ['nav-list.component.css'],
  directives: [LightboxTriggerComponent, RouterLinkDirective, NgStyle]
})
export class NavListComponent {
  starRotationStyle: {transform: string} = {transform: ''};
  socialMediaData = SOCIAL_MEDIA_DATA;

  constructor(@Inject(ROUTE_CONFIG) public routeConfig: RouteConfig,
              public router: RouterService) {
    router.registerRouteListener(this.handleRouteChange.bind(this));
    this.handleRouteChange(router.currentRoute);
  }

  /**
   * Update the route indicator star with a random rotation each time the route changes.
   */
  private handleRouteChange(route: RouteDefinition) {
    // let rotation = randomFloatInRange(-MAX_STAR_ROTATION, MAX_STAR_ROTATION);
    // this.starRotationStyle.transform = createTransformString(0, 0, rotation);
  }
}
