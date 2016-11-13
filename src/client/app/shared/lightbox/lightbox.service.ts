import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Subscription} from 'rxjs/Subscription';

/**
 * This class provides the LightboxService that enables rendering a lightbox that covers the whole
 * page.
 */
@Injectable()
export class LightboxService {
  public isLightboxShown: boolean = false;

  private displayChangeStream = new Subject();
  private _url: string;

  get url() : string {
    return this._url;
  }

  showLightbox(url: string) {
    this.isLightboxShown = true;
    this._url = url;
    this.displayChangeStream.next(this.isLightboxShown);
  }

  hideLightbox() {
    this.isLightboxShown = false;
    this.displayChangeStream.next(this.isLightboxShown);
  }

  registerDisplayChangeListener(callback: DisplayChangeHandler): Subscription {
    return this.displayChangeStream.subscribe(callback);
  }
}

type DisplayChangeHandler = (isLightBoxShown: boolean) => void;
