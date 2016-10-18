import {Component, ElementRef, OnDestroy} from '@angular/core';
import {AnimatorService} from '../shared/animation/index';
import {RouterService} from '../shared/router/index';
import {SlidingPage} from '../shared/sliding-page/index';

let END_ROTATION = -0.0087 * Math.PI;

/**
 * This class represents the lazy loaded BioComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-bio',
  templateUrl: 'bio.component.html',
  styleUrls: ['bio.component.css']
})
export class BioComponent extends SlidingPage implements OnDestroy {
  constructor(pageElementRef: ElementRef, animator: AnimatorService, router: RouterService) {
    super(pageElementRef, animator, router, END_ROTATION);
  }
}
