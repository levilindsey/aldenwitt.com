import {Component, ElementRef, OnDestroy} from '@angular/core';
import {AnimatorService} from '../shared/animation/index';
import {RouterService} from '../shared/router/index';
import {SlidingPage} from '../shared/sliding-page/index';

/**
 * This class represents the lazy loaded ContactComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-contact',
  templateUrl: 'contact.component.html',
  styleUrls: ['contact.component.css']
})
export class ContactComponent extends SlidingPage implements OnDestroy {// FIXME: not showing up with correct template???????
  constructor(pageElementRef: ElementRef, animator: AnimatorService, router: RouterService) {
    super(pageElementRef, animator, router);
  }
}
