import {Component, Inject, ElementRef} from '@angular/core';
import {HTTP_PROVIDERS, JSONP_PROVIDERS} from '@angular/http';
import {
  ROUTE_CONFIG, RouteConfig, RouterService, RouterOutletComponent, NavListComponent
} from '../shared/index';
import {AnimatorService} from '../shared/animation/animator.service';
import {PageSlideInJob} from '../shared/sliding-page/index';
import {LightboxOutletComponent, LightboxService} from '../shared/lightbox/index';

// In milliseconds.
const SLIDE_IN_DURATION = 1200;
const SLIDE_IN_DELAY = 300;

// TODO: Keep these up-to-date!
const EAGER_IMAGE_DATA = [
  {
    path: 'assets/images/alden-witt-title.png',
    size: 59
  },
  {
    path: 'assets/images/bio-nav-arrow.png',
    size: 2
  },
  {
    path: 'assets/images/contact-nav-arrow.png',
    size: 3
  },
  {
    path: 'assets/images/facebook-icon.png',
    size: 1
  },
  {
    path: 'assets/images/home-nav-arrow.png',
    size: 3
  },
  {
    path: 'assets/images/instagram-icon.png',
    size: 1
  },
  {
    path: 'assets/images/news-nav-arrow.png',
    size: 3
  },
  {
    path: 'assets/images/notebook.png',
    size: 762
  },
  {
    path: 'assets/images/sexy-songwriter.png',
    size: 291
  },
  {
    path: 'assets/images/soundcloud-icon.png',
    size: 1
  },
  {
    path: 'assets/images/tablet.png',
    size: 10
  },
  {
    path: 'assets/images/wood.jpg',
    size: 215
  },
];
const DEFERRED_IMAGE_DATA = [
  {
    path: 'assets/images/bio-header.png',
    size: 3
  },
  {
    path: 'assets/images/bio-nav-no-arrow.png',
    size: 2
  },
  {
    path: 'assets/images/contact-header.png',
    size: 4
  },
  {
    path: 'assets/images/contact-nav-no-arrow.png',
    size: 3
  },
  {
    path: 'assets/images/envelope.png',
    size: 363
  },
  {
    path: 'assets/images/home-nav-no-arrow.png',
    size: 2
  },
  {
    path: 'assets/images/napkin.png',
    size: 238
  },
  {
    path: 'assets/images/news-nav-no-arrow.png',
    size: 3
  },
  {
    path: 'assets/images/star-bio.png',
    size: 2
  },
  {
    path: 'assets/images/star-contact.png',
    size: 2
  },
  {
    path: 'assets/images/star-home.png',
    size: 2
  },
  {
    path: 'assets/images/star-news.png',
    size: 2
  },
  {
    path: 'assets/images/underline.png',
    size: 8
  },
];

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, BioComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'alden-app',
  viewProviders: [AnimatorService, LightboxService, RouterService, HTTP_PROVIDERS, JSONP_PROVIDERS],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [LightboxOutletComponent, RouterOutletComponent, NavListComponent]
})
export class AppComponent {
  areAssetsLoaded: boolean = false;
  hasAnimationStarted: boolean = false;
  loadingElement: HTMLElement;
  loadingProgressElement: HTMLElement;

  constructor(private pageElementRef: ElementRef, private animator: AnimatorService,
              @Inject(ROUTE_CONFIG) routeConfig: RouteConfig, router: RouterService) {
    this.loadingElement = document.querySelector('.loading') as HTMLElement;
    this.loadingProgressElement = document.querySelector('.progress') as HTMLElement;

    this.preCacheEagerImages().then(() => {
      this.areAssetsLoaded = true;
      // Hide the loading message.
      this.loadingElement.style.display = 'none';
      router.initialize(routeConfig);
      setTimeout(() => this.slideIn(), 0);
      this.preCacheDeferredImages();
    });
  }

  slideIn() {
    let pageElement: HTMLElement = this.pageElementRef.nativeElement.querySelector('.note-pad');
    let bodyElement: HTMLElement = document.querySelector('body') as HTMLElement;

    // Animate in.
    let slideJob = new PageSlideInJob(pageElement, bodyElement, SLIDE_IN_DURATION,
      SLIDE_IN_DELAY, 0, Math.PI / 6);
    this.animator.startJob(slideJob);
    this.hasAnimationStarted = true;
  }

  /**
   * Pre-caches the most important images needed for the initial render of this app and updates a
   * progress indicator.
   */
  preCacheEagerImages(): Promise {
    let imagePromises = EAGER_IMAGE_DATA.map((imageDatum) =>
        new Promise((resolve, reject) =>
            loadImage(imageDatum, this.updateProgressIndicator.bind(this), resolve)));
    return Promise.all(imagePromises);
  }

  updateProgressIndicator() {
    let totalSizeToLoad: number = 0;
    let currentSizeLoaded: number = 0;

    EAGER_IMAGE_DATA.forEach(imageDatum => {
      totalSizeToLoad += imageDatum.size;
      currentSizeLoaded += imageDatum.size * (imageDatum.progress || 0);
    });

    let totalProgressPercent = parseInt(currentSizeLoaded / totalSizeToLoad * 100);
    this.loadingProgressElement.innerHTML = `(${totalProgressPercent}%)`;
  }

  preCacheDeferredImages() {
     DEFERRED_IMAGE_DATA.map(datum => loadImage(datum));
  }
}

function loadImage(imageDatum, onProgress: Function = () => {}, onLoadEnd: Function = () => {}) {
  function onImageLoad(_) {
    imageDatum.progress = 1;
    onProgress();
    onLoadEnd();
  }

  function onImageProgress(event) {
    if (event.lengthComputable) {
      imageDatum.progress = event.loaded / event.total;
      onProgress();
    }
  }

  function onImageError(_) {
    console.error(`An error occurred loading image: ${imageDatum.path}`);
    onLoadEnd();
  }

  console.debug(`Loading image: ${imageDatum.path}`);

  loadWithProgress(imageDatum.path, onImageLoad, onImageProgress, onImageError);
}

function loadWithProgress(src: string, onLoad: Function, onProgress: Function, onError: Function) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener('load', onLoad);
  xhr.addEventListener('progress', onProgress);
  xhr.addEventListener('error', onError);
  xhr.addEventListener('abort', onError);

  xhr.open('GET', src, true);
  xhr.responseType = 'blob';
  xhr.send(null);
}
