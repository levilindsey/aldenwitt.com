/**
 * Creates a DOM element with the given tag name, appends it to the given parent element, and
 * gives it the given id and classes.
 *
 * @param {string} tagName The tag name to give the new element.
 * @param {HTMLElement} [parent] The parent element to append the new element to.
 * @param {string} [id] The id to give the new element.
 * @param {Array.<string>} [classes] The classes to give the new element.
 * @returns {HTMLElement} The new element.
 */
export function createElement(tagName: string, parent: HTMLElement, id: string, classes: string[]):
    HTMLElement {
  let element = document.createElement(tagName);
  if (parent) {
    parent.appendChild(element);
  }
  if (id) {
    element.id = id;
  }
  if (classes) {
    classes.forEach((className) => addClass(element, className));
  }
  return element;
}

/**
 * Adds the given class to the given element.
 *
 * @param {HTMLElement} element The element to add the class to.
 * @param {String} className The class to add.
 */
export function addClass(element: HTMLElement, className: string) {
  element.setAttribute('class', element.className + ' ' + className);
}

/**
 * Gets the coordinates of the element relative to the top-left corner of the overall document.
 *
 * @param {HTMLElement} element The element to get the coordinates of.
 * @returns {{x: number, y: number}} The coordinates of the element relative to the top-left
 * corner of the page.
 */
export function getDocumentOffset(element: HTMLElement): {x: number, y: number} {
  let x = 0, y = 0;
  while (element) {
    x += element.offsetLeft;
    y += element.offsetTop;
    element = element.offsetParent as HTMLElement;
  }
  x -= document.documentElement.scrollLeft;
  y -= document.documentElement.scrollTop;
  return {x: x, y: y};
}

/**
 * Gets the dimensions of the viewport.
 *
 * @returns {{w: number, h: number}} The dimensions of the viewport.
 */
export function getViewportSize(): {w: number, h: number} {
  let w, h;
  if (typeof window.innerWidth !== 'undefined') {
    // Good browsers
    w = window.innerWidth;
    h = window.innerHeight;
  } else if (typeof document.documentElement !== 'undefined' &&
      typeof document.documentElement.clientWidth !== 'undefined' &&
      document.documentElement.clientWidth !== 0) {
    // IE6 in standards compliant mode
    w = document.documentElement.clientWidth;
    h = document.documentElement.clientHeight;
  } else {
    // Older versions of IE
    w = document.getElementsByTagName('body')[0].clientWidth;
    h = document.getElementsByTagName('body')[0].clientHeight;
  }
  return {w: w, h: h};
}

/**
 * Calculates the width that the DOM would give to a div with the given text. The given tag
 * name, parent, id, and classes allow the width to be affected by various CSS rules.
 *
 * @param {string} text The text to determine the width of.
 * @param {string} tagName The tag name this text would supposedly have.
 * @param {HTMLElement} [parent] The parent this text would supposedly be a child of; defaults
 * to the document body.
 * @param {string} [id] The id this text would supposedly have.
 * @param {Array.<string>} [classes] The classes this text would supposedly have.
 * @returns {number} The width of the text under these conditions.
 */
export function getTextWidth(text: string, tagName: string, parent: HTMLElement, id: string,
                      classes: string[]) {
  let tmpElement, width;
  parent = parent || document.getElementsByTagName('body')[0];
  tmpElement = createElement(tagName, null, id, classes);
  tmpElement.style.position = 'absolute';
  tmpElement.style.visibility = 'hidden';
  tmpElement.style.whiteSpace = 'nowrap';
  parent.appendChild(tmpElement);
  tmpElement.innerHTML = text;
  width = tmpElement.clientWidth;
  parent.removeChild(tmpElement);
  return width;
}

/**
 * Encodes and concatenates the given URL parameters into a single query string.
 *
 * @param {Object} rawParams An object whose properties represent the URL query string
 * parameters.
 * @returns {string} The query string.
 */
export function encodeQueryString(rawParams: Object): string {
  let parameter, encodedParams;
  encodedParams = [];
  for (parameter in rawParams) {
    if (rawParams.hasOwnProperty(parameter)) {
      encodedParams.push(encodeURIComponent(parameter) + '=' +
          encodeURIComponent(rawParams[parameter]));
    }
  }
  return '?' + encodedParams.join('&');
}

/**
 * Retrieves the value corresponding to the given name from the given query string.
 *
 * (borrowed from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript)
 *
 * @param {string} queryString The query string containing the parameter.
 * @param {string} name The (non-encoded) name of the parameter value to retrieve.
 * @returns {string} The query string parameter value, or null if the parameter was not found.
 */
export function getQueryStringParameterValue(queryString: string, name: string): string {
  let regex, results;
  name = encodeURIComponent(name);
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  regex = new RegExp('[\\?&]' + name + '=([^&#]*)', 'i');
  results = regex.exec(queryString);
  return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Sets the CSS transition style of the given element.
 *
 * @param {HTMLElement} element The element.
 * @param {string} value The transition string.
 */
export function setTransition(element: HTMLElement, value: string) {
  element.style.transition = value;
  element.style.WebkitTransition = value;
  element.style.MozTransition = value;
  element.style.msTransition = value;
  element.style.OTransition = value;
}

/**
 * Sets the CSS transition duration style of the given element.
 *
 * @param {HTMLElement} element The element.
 * @param {number} value The duration. In seconds.
 */
export function setTransitionDurationSeconds(element: HTMLElement, value: number) {
  element.style.transitionDuration = value + 's';
  element.style.WebkitTransitionDuration = value + 's';
  element.style.MozTransitionDuration = value + 's';
  element.style.msTransitionDuration = value + 's';
  element.style.OTransitionDuration = value + 's';
}

/**
 * Sets the CSS transition delay style of the given element.
 *
 * @param {HTMLElement} element The element.
 * @param {number} value The delay. In seconds.
 */
export function setTransitionDelaySeconds(element: HTMLElement, value: number) {
  element.style.transitionDelay = value + 's';
  element.style.WebkitTransitionDelay = value + 's';
  element.style.MozTransitionDelay = value + 's';
  element.style.msTransitionDelay = value + 's';
  element.style.OTransitionDelay = value + 's';
}

/**
 * Sets the CSS transition-timing-function style of the given element with the given cubic-
 * bezier points.
 *
 * @param {HTMLElement} element The element.
 * @param {{p1x: number, p1y: number, p2x: number, p2y: number}} bezierPts The cubic-bezier
 * points to use for this timing function.
 */
export function setTransitionCubicBezierTimingFunction(element: HTMLElement,
    bezierPts: {p1x: number, p1y: number, p2x: number, p2y: number}) {
  let value = 'cubic-bezier(' + bezierPts.p1x + ',' + bezierPts.p1y + ',' + bezierPts.p2x + ',' +
      bezierPts.p2y + ')';
  element.style.transitionTimingFunction = value;
  element.style.WebkitTransitionTimingFunction = value;
  element.style.MozTransitionTimingFunction = value;
  element.style.msTransitionTimingFunction = value;
  element.style.OTransitionTimingFunction = value;
}

// A collection of different types of easing functions.
export let easingFunctions = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => t * (2 - t),
  easeInOutQuad: t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: t => t * t * t,
  easeOutCubic: t => 1 + --t * t * t,
  easeInOutCubic: t => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => 1 - --t * t * t * t,
  easeInOutQuart: t => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => 1 + --t * t * t * t * t,
  easeInOutQuint: t => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t
};

// A collection of the inverses of different types of easing functions.
export let inverseEasingFunctions = {
  linear: t => t,
  easeInQuad: t => Math.sqrt(t),
  easeOutQuad: t => 1 - Math.sqrt(1 - t),
  easeInOutQuad: t => t < 0.5 ? Math.sqrt(t * 0.5) : 1 - 0.70710678 * Math.sqrt(1 - t)
};

export type EasingFunction = (t: number) => number;

/**
 * Calculates the x and y coordinates represented by the given Bezier curve at the given
 * percentage.
 *
 * @param {number} percent Expressed as a number between 0 and 1.
 * @param {Array.<{x:number,y:number}>} controlPoints
 * @returns {{x:number,y:number}}
 */
export function getXYFromPercentWithBezier(percent: number, controlPoints: {x:number,y:number}[]):
    {x:number,y:number} {
  let x, y, oneMinusPercent, tmp1, tmp2, tmp3, tmp4;

  oneMinusPercent = 1 - percent;
  tmp1 = oneMinusPercent * oneMinusPercent * oneMinusPercent;
  tmp2 = 3 * percent * oneMinusPercent * oneMinusPercent;
  tmp3 = 3 * percent * percent * oneMinusPercent;
  tmp4 = percent * percent * percent;

  x = controlPoints[0].x * tmp1 +
      controlPoints[1].x * tmp2 +
      controlPoints[2].x * tmp3 +
      controlPoints[3].x * tmp4;
  y = controlPoints[0].y * tmp1 +
      controlPoints[1].y * tmp2 +
      controlPoints[2].y * tmp3 +
      controlPoints[3].y * tmp4;

  return {x: x, y: y};
}

/**
 * Applies the given transform to the given element as a CSS style in a cross-browser compatible
 * manner.
 */
export function setTransform(element: HTMLElement, transform: string) {
  element.style.webkitTransform = transform;
  element.style.MozTransform = transform;
  element.style.msTransform = transform;
  element.style.OTransform = transform;
  element.style.transform = transform;
}

/**
 * Creates a string for the CSS transform property from the given translations, rotation, and scale.
 *
 * @param {number} translationX In pixels.
 * @param {number} translationY In pixels.
 * @param {number} [rotation=0] In radians.
 * @param {number} [scale=1]
 */
export function createTransformString(translationX: number, translationY: number,
                                      rotation: number = 0, scale: number = 1): string {
  return `translate(${translationX}px, ${translationY}px) rotate(${rotation}rad) scale(${scale})`;
}

/**
 * Extracts the translateX value from a CSS transform string.
 *
 * - This only works if the translate value is specified explicitly within the string (e.g., this
 *   will not work if translateX is specified instead).
 * - This returns the magnitude of the value regardless of the unit.
 */
export function getTranslateXFromTransform(element: HTMLElement): number {
  return _getPartFromTransform(element, /translate\(([^),]+), ?[^)]+\)/);
}

/**
 * Extracts the translateY value from a CSS transform string.
 *
 * - This only works if the translate value is specified explicitly within the string (e.g., this
 *   will not work if translateY is specified instead).
 * - This returns the magnitude of the value regardless of the unit.
 */
export function getTranslateYFromTransform(element: HTMLElement): number {
  return _getPartFromTransform(element, /translate\([^),]+, ?([^)]+)\)/);
}

/**
 * Extracts the rotate value from a CSS transform string.
 *
 * - This only works if the rotate value is specified explicitly within the string.
 * - This returns the magnitude of the value regardless of the unit.
 */
export function getRotateFromTransform(element: HTMLElement): number {
  return _getPartFromTransform(element, /rotate\(([^)]+)\)/);
}

/**
 * Extracts the scale value from a CSS transform string.
 *
 * - This only works if the scale value is specified explicitly within the string.
 * - This returns the magnitude of the value regardless of the unit.
 */
export function getScaleFromTransform(element: HTMLElement): number {
  return _getPartFromTransform(element, /scale\(([^)]+)\)/);
}

function _getPartFromTransform(element: HTMLElement, regexp: RegExp): number {
  let style = element.style;
  let transform = style.transform || style.webkitTransform || style.mozTransform;
  let result = transform ? transform.match(regexp) : null;
  return result ? parseFloat(result[1]) : 0;
}

/**
 * Returns a copy of the given array with its contents re-arranged in a random order.
 *
 * The original array is left in its original order.
 */
export function shuffle(array: Array): Array {
  let i, j, count, temp;

  for (i = 0, count = array.length; i < count; i += 1) {
    j = parseInt(Math.random() * count);
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }

  return array;
}

/**
 * Performs a shallow copy of the given object.
 *
 * This only copies enumerable properties.
 */
export function shallowCopy(object: Object): Object {
  if (typeof object === 'object') {
    let cloneObject = {};

    Object.keys(object)
        .forEach(key => cloneObject[key] = object[key]);

    return cloneObject;
  } else {
    return object;
  }
}

/**
 * Performs a deep copy of the given object.
 *
 * This only copies enumerable properties.
 */
export function deepCopy(object: Object): Object {
  if (typeof object === 'object') {
    // Hack: Not a robust copy policy
    let cloneObject;
    if (object instanceof Array) {
      cloneObject = [];
    } else {
      cloneObject = {};
    }

    Object.keys(object)
        .forEach(key => cloneObject[key] = deepCopy(object[key]));

    return cloneObject;
  } else {
    return object;
  }
}

/**
 * Converts the given HSL color values to HSV color values.
 *
 * Given and returned values will be in the range of [0, 1].
 */
export function hslToHsv(hsl: {h:number,s:number,l:number}): {h:number,s:number,v:number} {
  let temp = hsl.s * (hsl.l < 0.5 ? hsl.l : 1 - hsl.l);
  return {
    h: hsl.h,
    s: 2 * temp / (hsl.l + temp),
    v: hsl.l + temp
  };
}

/**
 * Converts the given HSV color values to HSL color values.
 *
 * Given and returned values will be in the range of [0, 1].
 */
export function hsvToHsl(hsv: {h:number,s:number,v:number}): {h:number,s:number,l:number} {
  let temp = (2 - hsv.s) * hsv.v;
  return {
    h: hsv.h,
    s: hsv.s * hsv.v / (temp < 1 ? temp : 2.00000001 - temp),
    l: temp * 0.5
  };
}

/**
 * Converts the given HSL color values to RGB color values.
 *
 * Given and returned values will be in the range of [0, 1].
 *
 * Originally adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 */
export function hslToRgb(hsl: {h:number,s:number,l:number}): {r:number,g:number,b:number} {
  let r;
  let g;
  let b;

  if (hsl.s == 0) {
    // Achromatic.
    r = hsl.l;
    g = hsl.l;
    b = hsl.l;
  } else {
    let q = hsl.l < 0.5
        ? hsl.l * (1 + hsl.s)
        : hsl.l + hsl.s - hsl.l * hsl.s;
    let p = 2 * hsl.l - q;

    r = _hue2Rgb(p, q, hsl.h + 1 / 3);
    g = _hue2Rgb(p, q, hsl.h);
    b = _hue2Rgb(p, q, hsl.h - 1 / 3);
  }

  return {
    r: r,
    g: g,
    b: b
  };
}

export function _hue2Rgb(p, q, t) {
  if (t < 0) {
    t += 1;
  } else if (t > 1) {
    t -= 1;
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  } else if (t < 1 / 2) {
    return q;
  } else if (t < 2 / 3) {
    return p + (q - p) * (2 / 3 - t) * 6;
  } else {
    return p;
  }
}

/**
 * Converts the given RGB color values to HSL color values.
 *
 * Given and returned values will be in the range of [0, 1].
 *
 * Originally adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 */
export function rgbToHsl(rgb: {r:number,g:number,b:number}): {h:number,s:number,l:number} {
  let max = Math.max(rgb.r, rgb.g, rgb.b);
  let min = Math.min(rgb.r, rgb.g, rgb.b);
  let h;
  let s;
  let l = (max + min) / 2;

  if (max == min) {
    // Achromatic.
    h = 0;
    s = 0;
  } else {
    let d = max - min;
    s = l > 0.5
        ? d / (2 - max - min)
        : d / (max + min);

    switch (max) {
      case rgb.r:
        h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0);
        break;
      case rgb.g:
        h = (rgb.b - rgb.r) / d + 2;
        break;
      case rgb.b:
        h = (rgb.r - rgb.g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h,
    s: s,
    l: l
  };
}

/**
 * Creates a valid color string to assign to a CSS property from the given h/s/l color values.
 *
 * Given values should be in the range of [0,1].
 *
 * @param {{h:number,s:number,l:number}} hsl
 * @returns {string}
 */
export function createHslColorString(hsl: {h:number,s:number,l:number}): string {
  return `hsl(${hsl.h * 360},${hsl.s * 100}%,${hsl.l * 100}%)`;
}

let utilStyleSheet;

/**
 * Adds the given style rule to a style sheet for the current document.
 *
 * @param {string} styleRule
 */
export function addRuleToStyleSheet(styleRule: string) {
  // Create the custom style sheet if it doesn't already exist
  if (!utilStyleSheet) {
    utilStyleSheet = document.createElement('style');
    document.getElementsByTagName('head')[0].appendChild(utilStyleSheet);
  }

  // Add the given rule to the custom style sheet
  if (utilStyleSheet.styleSheet) {
    utilStyleSheet.styleSheet.cssText = styleRule;
  } else {
    utilStyleSheet.appendChild(document.createTextNode(styleRule));
  }
}

export function checkForSafari(): boolean {
  return /Safari/i.test(window.navigator.userAgent) && !/Chrome/i.test(window.navigator.userAgent);
}

export function checkForIos(): boolean {
  return /iPhone|iPod|iPad/i.test(window.navigator.userAgent);
}

/**
 * Taken from Underscore.js (http://underscorejs.org/).
 *
 * Returns a function, that, as long as it continues to be invoked, will not be triggered. The
 * function will be called after it stops being called for N milliseconds. If immediate is passed,
 * trigger the function on the leading edge, instead of the trailing.
 */
export function debounce(fn: Function, delay: number, immediate?: boolean = false): Function {
  let timeout;

  return () => {
    let context = this;
    let args = arguments;
    let callNow = immediate && !timeout;

    let later = () => {
      timeout = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}

export function error(message: string | string[], error: Error, shouldThrowAnError: boolean = true,
               shouldInformTheUser: boolean = false) {
  let stackTrace;

  // Create an array from the message.
  let messages: string[];
  if (!(message instanceof Array)) {
    messages = message ? [message as string] : [];
  }

  // Get info from the error object.
  if (error instanceof Error) {
    stackTrace = error.stack;
    messages.push(error.message);
  } else {
    if (error) {
      console.warn(`A non-error object was thrown: ${typeof error}.`);
    }
    stackTrace = getStackTrace();
  }

  if (messages.length === 0) {
    messages.push('An error occurred');
  }

  messages = _interleave(messages, '\n');

  console.error(...messages, '\n', stackTrace);

  message = messages.join('');

  if (shouldInformTheUser) {
    alert(message as string);
  }
  if (shouldThrowAnError) {
    throw new Error(message as string);
  }
}

function _interleave(array: Array<any> | string, delimiter: any): Array<any> {
  let result = new Array(array.length * 2 - 1);
  if (array.length) {
    result.push(array[0]);
  }
  for (let i = 1, count = array.length; i < count; i++) {
    result.push(delimiter);
    result.push(array[i]);
  }
  return result;
}

/**
 * Loads the given src for the given image.
 */
export function loadImageSrc(image: HTMLImageElement, src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    console.debug(`Loading image: ${src}`);

    image.addEventListener('load', _ => resolve(image));
    image.addEventListener('error', reject);
    image.addEventListener('abort', reject);

    image.src = src;
  });
}

/**
 * Pre-caches the given images.
 */
export function preCacheImages(paths: string[]): Promise {
  return Promise.all(paths.map((path: string) => {
    let element = new Image();
    return loadImageSrc(element, path).then();
  }));
}

/**
 * Loads text from the given URL.
 */
export function loadText(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', _ => resolve(xhr.response));
    xhr.addEventListener('error', reject);
    xhr.addEventListener('abort', reject);

    console.debug(`Loading text: ${url}`);

    xhr.open('GET', url);
    xhr.send();
  });
}

/**
 * Loads a JSON object from the given URL.
 */
export function loadJson(url: string): Promise<Object> {
  return loadText(url).then((jsonText: string) => JSON.parse(jsonText));
}

/**
 * Gets the current stack trace.
 */
export function getStackTrace(): string {
  return new Error().stack;
}

/**
 * Freezes the given object and recursively freezes all of its properties.
 */
export function deepFreeze(object: Object) {
  if (typeof object === 'object') {
    Object.freeze(object);
    Object.keys(object)
        .forEach((key) => deepFreeze(object[key]));
  }
}

/**
 * Creates a GUID.
 *
 * GUID specification: http://www.ietf.org/rfc/rfc4122.txt
 *
 * Logic adopted from http://stackoverflow.com/a/2117523/489568.
 */
export function createGuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    let r = Math.random() * 16 | 0;
    let v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * -11 % 3 === -2
 * mod(-11, 3) === 1
 */
export function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

export function randomFloatInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomIntInRange(min: number, max: number): number {
  return parseInt(Math.random() * (max - min) + min);
}

/**
 * Triggers the given callback when either the current tab or the browser window loses/gains focus.
 */
export function handlePageFocusChange(focusChangeHandler: Function) {
  // Pause/unpause the app when the tab loses/gains focus.
  document.addEventListener('visibilitychange', () => focusChangeHandler(!document.hidden));
  // Pause/unpause the app when the browser window loses/gains focus.
  window.addEventListener('blur', () => focusChangeHandler(false));
  window.addEventListener('focus', () => focusChangeHandler(true));
}

/**
 * Creates an array with all the consecutive numbers from start (inclusive) to end (exclusive).
 */
export function range(start: number, end: number): number[] {
  let r: number[] = [];
  for (let i = 0, j = start; j < end; i++, j++) {
    r[i] = j;
  }
  return r;
}

export function isInt(value: any): boolean {
  return typeof value === 'number' &&
          isFinite(value) &&
          parseInt(value) === value;
}

export let keyCodes = {
  'a': 65,
  'b': 66,
  'c': 67,
  'd': 68,
  'e': 69,
  'f': 70,
  'g': 71,
  'h': 72,
  'i': 73,
  'j': 74,
  'k': 75,
  'l': 76,
  'm': 77,
  'n': 78,
  'o': 79,
  'p': 80,
  'q': 81,
  'r': 82,
  's': 83,
  't': 84,
  'u': 85,
  'v': 86,
  'w': 87,
  'x': 88,
  'y': 89,
  'z': 90,
  '0': 48,
  '1': 49,
  '2': 50,
  '3': 51,
  '4': 52,
  '5': 53,
  '6': 54,
  '7': 55,
  '8': 56,
  '9': 57,
  'SPACE': 32,
  'ENTER': 13,
  'ESCAPE': 27,
  'LEFT': 37,
  'UP': 38,
  'RIGHT': 39,
  'DOWN': 40
};

export let svgNamespace = 'http://www.w3.org/2000/svg';
export let xlinkNamespace = 'http://www.w3.org/1999/xlink';
