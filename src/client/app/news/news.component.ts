import {Component, ElementRef, AfterViewInit} from '@angular/core';
import {AnimatorService} from '../shared/animation/index';
import {RouterService} from '../shared/router/index';
import {SlidingPage} from '../shared/sliding-page/index';
import {Jsonp} from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const END_ROTATION = 0.015 * Math.PI;

// This shouldn't be included here on the client, but Instagram doesn't seem to support an
// alternative system for accessing a dynamic feed from a static client.
const ACCESS_TOKEN = '2912057398.1677ed0.42f517282dc3420690f72141aa685f15';

const USER_ID = '2912057398';
const IMAGE_COUNT = 6;
const INSTAGRAM_FEED_URL = `https://api.instagram.com/v1/users/${USER_ID}/media/recent?callback=JSONP_CALLBACK&access_token=${ACCESS_TOKEN}&count=${IMAGE_COUNT}`;

const CREDITS = [
  {
    year: '2017',
    credits: [
      {
        title: 'Modern Times EP',
        artist: 'Josh Doyle',
        aldenRole: 'Producer/Writer',
      },
      {
        title: 'Separate Way',
        artist: 'w-inds',
        aldenRole: 'Writer',
      },
    ]
  },
  {
    year: '2016',
    credits: [
      {
        title: 'Burn The Bed',
        artist: 'Candi Carpenter',
        aldenRole: 'Writer',
      },
    ]
  },
];

/**
 * This class represents the lazy loaded NewsComponent.
 */
@Component({
  moduleId: module.id,
  selector: 'alden-news',
  templateUrl: 'news.component.html',
  styleUrls: ['news.component.css']
})
export class NewsComponent extends SlidingPage implements AfterViewInit {
  credits = CREDITS;
  imageConfigs: InstagramPostConfig[];

  constructor(pageElementRef: ElementRef, animator: AnimatorService, router: RouterService, private jsonp: Jsonp) {
    super(pageElementRef, animator, router, END_ROTATION);
  }

  ngAfterViewInit() {
    this.jsonp.request(INSTAGRAM_FEED_URL).subscribe(response => {
      this.imageConfigs = response.json().data || [];
    });
  }
}

interface InstagramPostConfig {
  images: {thumbnail: InstagramImageConfig, standard_resolution: InstagramImageConfig};
  caption: InstagramImageCaption;
  link: string;
}

interface InstagramImageConfig {
  url: string;
}

interface InstagramImageCaption {
  text: string;
}
