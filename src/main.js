/**
 * This script defines the top-level logic that bootstraps the application.
 */

window.addEventListener('load', _initApp, false);

/**
 * Initializes the app. This is the event handler for the completion of the DOM loading.
 *
 * @private
 */
function _initApp() {
  console.debug('onDocumentLoad');

  window.removeEventListener('load', _initApp);

  var mainArea = document.getElementById('main-area');

  // TODO
}
