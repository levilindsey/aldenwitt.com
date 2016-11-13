import {NgStyle} from '@angular/common';
import {Component, Input} from '@angular/core';
import {DomSanitizationService, SafeResourceUrl} from '@angular/platform-browser';

import {debounce, getViewportSize} from '../../utils';

let VIDEO_ASPECT_RATIO: number = 16 / 9;
let MIN_PANEL_MARGIN: number = 20;
let PANEL_PADDING: number = 0;
let MAX_VIDEO_WIDTH: number = 1280;
let MAX_VIDEO_HEIGHT: number = 720;

let MAX_PANEL_WIDTH: number = MAX_VIDEO_WIDTH + PANEL_PADDING * 2;
let MAX_PANEL_HEIGHT: number = MAX_VIDEO_HEIGHT + PANEL_PADDING * 2;

// FIXME: url = https://www.youtube.com/embed/HFQTbvVLqII?rel=0

/**
 * This class represents a lightbox that shows a YouTube video.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-lightbox-video',
  templateUrl: 'lightbox-video.component.html',
  styleUrls: ['lightbox-video.component.css'],
  directives: [NgStyle]
})
export class LightboxVideoComponent {
  @Input() set url(value: string) {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(value);
  }

  safeUrl: SafeResourceUrl;

  panelWidth: number;
  panelHeight: number;
  videoWidth: number;
  videoHeight: number;

  constructor(private sanitizer: DomSanitizationService) {
    this.calculateDimensions();
    let debouncedResize = debounce(this.calculateDimensions.bind(this), 200);
    window.addEventListener('resize', debouncedResize, false);
  }

  private calculateDimensions() {
    let {w: viewportWidth, h: viewportHeight} = getViewportSize();
    let viewportAspectRatio = viewportWidth / viewportHeight;

    if (viewportWidth - MIN_PANEL_MARGIN * 2 < MAX_PANEL_WIDTH ||
      viewportHeight - MIN_PANEL_MARGIN * 2 < MAX_PANEL_HEIGHT) {
      if (viewportAspectRatio > VIDEO_ASPECT_RATIO) {
        // We're limited by the screen height.
        this.panelHeight = parseInt(viewportHeight - MIN_PANEL_MARGIN * 2);
        this.videoHeight = parseInt(this.panelHeight - PANEL_PADDING * 2);
        this.videoWidth = parseInt(this.videoHeight * VIDEO_ASPECT_RATIO);
        this.panelWidth = this.videoWidth + PANEL_PADDING * 2;
      } else {
        // We're limited by the screen width.
        this.panelWidth = parseInt(viewportWidth - MIN_PANEL_MARGIN * 2);
        this.videoWidth = parseInt(this.panelWidth - PANEL_PADDING * 2);
        this.videoHeight = parseInt(this.videoWidth / VIDEO_ASPECT_RATIO);
        this.panelHeight = this.videoHeight + PANEL_PADDING * 2;
      }
    } else {
      // We aren't limited by either the screen's width or height.
      this.panelWidth = MAX_PANEL_WIDTH;
      this.panelHeight = MAX_PANEL_HEIGHT;
      this.videoWidth = MAX_VIDEO_WIDTH;
      this.videoHeight = MAX_VIDEO_HEIGHT;
    }
  }
}
