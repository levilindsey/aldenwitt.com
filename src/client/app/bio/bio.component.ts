import {Component, ElementRef, OnDestroy} from '@angular/core';
import {AnimatorService} from '../shared/animation/index';
import {RouterService} from '../shared/router/index';
import {SlidingPage} from '../shared/sliding-page/index';

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
    super(pageElementRef, animator, router);
  }
}
