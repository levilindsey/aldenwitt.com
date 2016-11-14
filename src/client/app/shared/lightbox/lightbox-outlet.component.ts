import {Component, ElementRef, HostListener} from '@angular/core';
import {LightboxService} from './lightbox.service';
import {LightboxVideoComponent} from './lightbox-video/lightbox-video.component';
import {debounce, getViewportSize} from '../utils';

const ESCAPE_KEY_CODE = 27;

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

  private element: any;

  constructor(private service: LightboxService, elementRef: ElementRef) {
    this.element = elementRef.nativeElement;

    this.service.registerDisplayChangeListener(this.handleDisplayChange.bind(this));

    this.updateElementDimensions();
    let debouncedResize = debounce(this.updateElementDimensions.bind(this), 200);
    window.addEventListener('resize', debouncedResize, false);
  }

  @HostListener('document:keydown', ['$event'])
  private handleKeyboardEvent(event: KeyboardEvent) {
    if (event.keyCode === ESCAPE_KEY_CODE) {
      this.closeLightbox();
    }
  }

  private updateElementDimensions() {
    let {w: viewportWidth, h: viewportHeight} = getViewportSize();
    if (this.isLightboxShown) {
      this.element.style.width = `${viewportWidth}px`;
      this.element.style.height = `${viewportHeight}px`;
    } else {
      this.element.style.width = '0px';
      this.element.style.height = '0px';
    }
  }

  get url() : string {
    return this.service.url;
  }

  private handleDisplayChange() {
    this.isLightboxShown = this.service.isLightboxShown;
    this.updateElementDimensions();
  }

  closeLightbox() {
    this.service.hideLightbox();
  }
}
