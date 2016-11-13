import {Component, Input} from '@angular/core';
import {LightboxService} from '../lightbox.service';

/**
 * This class represents an element that triggers the display of a lightbox when clicked.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-lightbox-trigger',
  templateUrl: 'lightbox-trigger.component.html',
  styleUrls: ['lightbox-trigger.component.css']
})
export class LightboxTriggerComponent {
  @Input() youtubeId: String;

  constructor(private service: LightboxService) {}

  get thumbnailSrc() : string {
    return `https://img.youtube.com/vi/${this.youtubeId}/default.jpg`;
  }

  get videoUrl() : string {
    return `https://www.youtube.com/embed/${this.youtubeId}?rel=0`;
  }

  showLightbox() {
    this.service.showLightbox(this.videoUrl);
  }
}
