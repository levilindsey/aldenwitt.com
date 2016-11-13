import {Component} from '@angular/core';
import {LightboxService} from './lightbox.service';
import {LightboxVideoComponent} from './lightbox-video/lightbox-video.component';

/**
 * This class handles showing and hiding a lightbox that covers the whole page.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-lightbox-outlet',
  templateUrl: 'lightbox-outlet.component.html',
  styleUrls: ['lightbox-outlet.component.css'],
  directives: [LightboxVideoComponent]
})
export class LightboxOutletComponent {
  isLightboxShown : boolean = false;

  constructor(private service: LightboxService) {
    this.service.registerDisplayChangeListener(this.handleDisplayChange.bind(this));
  }

  get url() : string {
    return this.service.url;
  }

  private handleDisplayChange() {
    this.isLightboxShown = this.service.isLightboxShown;
  }

  closeLightbox() {
    this.service.hideLightbox();
  }
}
