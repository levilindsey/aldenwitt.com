import {Component, OnInit, animate, state, style, transition, trigger} from '@angular/core';
import {REACTIVE_FORM_DIRECTIVES} from '@angular/forms';

import {NameListService} from '../shared/index';

/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-home',
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  directives: [REACTIVE_FORM_DIRECTIVES],
  animations: [
    trigger('slideState', [
      state('in', style({transform: 'translateX(0) translateY(0)'})),
      transition('void => *', [
        style({transform: 'translateY(500px)'}),
        animate(300)
      ]),
      transition('* => void', [
        animate(250, style({transform: 'translateX(500px)'}))
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  newName: string = '';
  errorMessage: string;
  names: any[] = [];

  constructor() {}

  /**
   * Get the names OnInit
   */
  ngOnInit() {
    this.getNames();
  }

  /**
   * Handle the nameListService observable
   */
  getNames() {
    // this.nameListService.get()
    //                  .subscribe(
    //                    names => this.names = names,
    //                    error =>  this.errorMessage = <any>error
    //                    );
  }

  /**
   * Pushes a new name onto the names array
   * @return {boolean} false to prevent default form submit behavior to refresh the page.
   */
  addName(): boolean {
    // TODO: implement nameListService.post
    this.names.push(this.newName);
    this.newName = '';
    return false;
  }

}
