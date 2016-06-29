import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import Root from '../../app/containers/Root';
import createStore from '../../app/store/configureStore';
import { replaceImages } from '../../app/actions/images';
import { toggleVisibility } from '../../app/actions/visibility';
import uuid from 'uuid';

// TODO: Export to config file import
const PIN_WIDTH = 236;
const MIN_PIN_HEIGHT = 200;
const alertMessage = 'Oops! That button doesn\'t work on Pinterest. Try using' +
                      ' the red Save button at the top of any Pin.';

let handleExtensionClick = () => {};

class InjectApp extends Component {
  constructor(props) {
    super(props);

    this.store = createStore({ images: [], isVisible: false });
    this.store.subscribe(this.forceUpdate.bind(this));

    handleExtensionClick = () => this.buttonOnClick();
  }

  populateImagesIntoStore = () => {
    const images = [];
    document.querySelectorAll('img').forEach((img) => {
      if (img.width >= PIN_WIDTH && /* min width */
        img.height >= MIN_PIN_HEIGHT && /* min height */
        img.src.substring(0, 5) !== 'data:' /* not B64 */) {
        images.push({
          id: uuid.v1(),
          url: img.src,
          width: img.width,
          height: img.height,
          isSelected: false,
        });
      }
    });
    this.store.dispatch(replaceImages(images));
  }
  validSite() {
    return (window.location.href.indexOf('pinterest.com') === -1);
  }

  buttonOnClick = () => {
    if (!this.validSite()) {
      alert(alertMessage);
    } else {
      this.validSite = true;
      const isVisible = !this.store.getState().isVisible;
      this.store.dispatch(toggleVisibility(isVisible));
      if (this.store.getState().images.length === 0) {
        this.populateImagesIntoStore();
      }
      if (isVisible === true) {
        document.body.style.overflow = 'hidden';
        document.body.style.position = 'fixed';
      } else {
        document.body.style.overflow = 'auto';
        document.body.style.position = 'static';
      }
    }
  };

  render() {
    return (
      <Dock
        position="bottom"
        dimMode="transparent"
        defaultSize={1}
        isVisible={this.store.getState().isVisible}
        dockStyle={{ background: 'rgba(0,0,0,0.8)' }}
      >
        <Root store={this.store} />,
      </Dock>
    );
  }
}

window.addEventListener('load', () => {
  const injectDOM = document.createElement('div');
  injectDOM.className = 'pinterest-layout-ext';
  injectDOM.style.textAlign = 'center';
  document.body.appendChild(injectDOM);
  render(<InjectApp />, injectDOM);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.toggle) {
      handleExtensionClick();
    }
  });
