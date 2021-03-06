import {Component, ElementRef, OnDestroy} from '@angular/core';
import {AnimatorService} from '../shared/animation/index';
import {RouterService} from '../shared/router/index';
import {SlidingPage} from '../shared/sliding-page/index';

let END_ROTATION = 0.04 * Math.PI;

/**
 * This class represents the lazy loaded ContactComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent extends SlidingPage implements OnDestroy {
  constructor(pageElementRef: ElementRef, animator: AnimatorService, router: RouterService) {
    super(pageElementRef, animator, router, END_ROTATION);
  }
}
