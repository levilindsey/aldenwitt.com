import {Component, ElementRef, OnDestroy} from '@angular/core';
import {AnimatorService} from '../shared/animation/index';
import {RouterService} from '../shared/router/index';
import {SlidingPage} from '../shared/sliding-page/index';

let END_ROTATION = -0.03 * Math.PI;

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css']
})
export class HomeComponent extends SlidingPage implements OnDestroy {
  constructor(pageElementRef: ElementRef, animator: AnimatorService, router: RouterService) {
    super(pageElementRef, animator, router, END_ROTATION);
  }
}
