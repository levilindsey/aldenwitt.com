import {Component, Inject, ElementRef} from '@angular/core';
import {HTTP_PROVIDERS} from '@angular/http';
import {
  ROUTE_CONFIG, RouteConfig, RouterService, RouterOutletComponent, NavListComponent
} from '../shared/index';
import {AnimatorService} from '../shared/animation/animator.service';
import {PageSlideInJob} from '../shared/sliding-page/index';

// In milliseconds.
const SLIDE_IN_DURATION = 1200;
const SLIDE_IN_DELAY = 300;

const imageData = [
  // TODO: Keep these up-to-date!
  {
    path: 'assets/images/alden-witt-title.png',
    size: 59
  },
  {
    path: 'assets/images/bio-header.png',
    size: 3
  },
  {
    path: 'assets/images/bio-nav-arrow.png',
    size: 2
  },
  {
    path: 'assets/images/bio-nav-no-arrow.png',
    size: 2
  },
  {
    path: 'assets/images/boat.png',
    size: 4
  },
  {
    path: 'assets/images/contact-header.png',
    size: 4
  },
  {
    path: 'assets/images/contact-nav-arrow.png',
    size: 3
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
    path: 'assets/images/groceries.png',
    size: 12
  },
  {
    path: 'assets/images/home-nav-arrow.png',
    size: 3
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
    path: 'assets/images/notebook.png',
    size: 762
  },
  {
    path: 'assets/images/sexy-songwriter.png',
    size: 291
  },
  {
    path: 'assets/images/songwriter.png',
    size: 18
  },
  {
    path: 'assets/images/spaceship.png',
    size: 7
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
    path: 'assets/images/underline.png',
    size: 8
  },
  {
    path: 'assets/images/wood.jpg',
    size: 1595
  },
];

/**
 * This class represents the main application component. Within the @Routes annotation is the configuration of the
 * applications routes, configuring the paths for the lazy loaded components (HomeComponent, BioComponent).
 */
@Component({
  moduleId: module.id,
  selector: 'alden-app',
  viewProviders: [AnimatorService, RouterService, HTTP_PROVIDERS],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [RouterOutletComponent, NavListComponent]
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

    this.preCacheImages().then(() => {
      setTimeout(() => {
        this.areAssetsLoaded = true;
        // Hide the loading message.
        this.loadingElement.style.display = 'none';
        router.initialize(routeConfig);
        setTimeout(() => this.slideIn(), 0);
      }, 1000);
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
   * Pre-caches all images used in this app and updates a progress indicator.
   */
  preCacheImages(): Promise {
    let imagePromises = imageData.map((imageDatum) =>
        new Promise((resolve, reject) =>
            loadImage(imageDatum, this.updateProgressIndicator.bind(this), resolve)));
    return Promise.all(imagePromises);
  }

  updateProgressIndicator() {
    let totalSizeToLoad: number = 0;
    let currentSizeLoaded: number = 0;

    imageData.forEach(imageDatum => {
      totalSizeToLoad += imageDatum.size;
      currentSizeLoaded += imageDatum.size * imageDatum.progress;
    });

    let totalProgressPercent = parseInt(currentSizeLoaded / totalSizeToLoad * 100);
    this.loadingProgressElement.innerHTML = `(${totalProgressPercent}%)`;
  }
}

function loadImage(imageDatum, onProgress: Function, onLoadEnd: Function) {
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
