import {Component} from '@angular/core';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {TestComponentBuilder} from '@angular/compiler/testing';

import {
  addProviders,
  async,
  inject
} from '@angular/core/testing';
import {
  RouterConfig
} from '@angular/router';

import {provideFakeRouter} from '../testing/router/router-testing-providers';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {BioComponent} from './bio/bio.component';
import {ContactComponent} from './contact/contact.component';

export function main() {
  describe('App component', () => {
    // Disable old forms
    let providerArr: any[];

    beforeEach(() => {
      providerArr = [disableDeprecatedForms(), provideForms()];

      // Support for testing component that uses Router
      let config:RouterConfig = [
        {path: '', component: HomeComponent},
        {path: 'bio', component: BioComponent}
        {path: 'contact', component: ContactComponent}
      ];

      addProviders([
        provideFakeRouter(TestComponent, config)
      ]);
    });

    it('should build without a problem',
      async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
        tcb.overrideProviders(TestComponent, providerArr)
          .createAsync(TestComponent)
          .then((fixture) => {
            expect(fixture.nativeElement.innerText.indexOf('Home')).toBeTruthy();
          });
      })));
  });
}

@Component({
  selector: 'test-cmp',
  template: '<alden-app></alden-app>',
  directives: [AppComponent]
})
class TestComponent {
}
