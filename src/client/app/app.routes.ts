import {ROUTE_CONFIG} from './shared/index';
import {BioComponent} from './bio/index';
import {HomeComponent} from './home/index';
import {ContactComponent} from './contact/contact.component';
import {NewsComponent} from './news/news.component';

export const ROUTER_PROVIDERS = [
  {provide: ROUTE_CONFIG, useValue: [
    {
      name: 'home',
      path: 'home',
      label: 'Home',
      verticalNavTextImage: 'assets/images/home-nav-arrow.png',
      horizontalNavTextImage: 'assets/images/home-nav-no-arrow.png',
      verticalNavIndicatorImage: 'assets/images/star-home.png',
      horizontalNavIndicatorImage: 'assets/images/underline.png',
      component: HomeComponent,
      isDefault: true
    },
    {
      name: 'news',
      path: 'news',
      label: 'Latest news',
      verticalNavTextImage: 'assets/images/news-nav-arrow.png',
      horizontalNavTextImage: 'assets/images/news-nav-no-arrow.png',
      verticalNavIndicatorImage: 'assets/images/star-news.png',
      horizontalNavIndicatorImage: 'assets/images/underline.png',
      component: NewsComponent
    },
    {
      name: 'bio',
      path: 'bio',
      label: 'Bio',
      verticalNavTextImage: 'assets/images/bio-nav-arrow.png',
      horizontalNavTextImage: 'assets/images/bio-nav-no-arrow.png',
      verticalNavIndicatorImage: 'assets/images/star-bio.png',
      horizontalNavIndicatorImage: 'assets/images/underline.png',
      component: BioComponent
    },
    {
      name: 'contact',
      path: 'contact',
      label: 'Contact',
      verticalNavTextImage: 'assets/images/contact-nav-arrow.png',
      horizontalNavTextImage: 'assets/images/contact-nav-no-arrow.png',
      verticalNavIndicatorImage: 'assets/images/star-contact.png',
      horizontalNavIndicatorImage: 'assets/images/underline.png',
      component: ContactComponent
    },
  ]}
];
