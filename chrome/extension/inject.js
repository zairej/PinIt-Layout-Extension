import React, { Component } from 'react';
import { render } from 'react-dom';
import Dock from 'react-dock';
import Root from '../../app/containers/Root';
import createStore from '../../app/store/configureStore';
import { replaceImages } from '../../app/actions/images';
import { addImage } from '../../app/actions/canvas';
import uuid from 'uuid';

// TODO: Export to config file import
const PIN_WIDTH = 236;
const MIN_PIN_HEIGHT = 200;

let handleExtensionClick = () => {};

class InjectApp extends Component {
  constructor(props) {
    super(props);

    this.store = createStore({ images: [] });
    this.state = { isVisible: false };

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
    if (images.length) {
      const image = images[0];
      image.isSelected = true;
      this.store.dispatch(addImage(image));
    }
    this.store.dispatch(replaceImages(images));
  }

  buttonOnClick = () => {
    this.setState({ isVisible: !this.state.isVisible });
    if (this.store.getState().images.length === 0){
      this.populateImagesIntoStore();

    }
  };

  render() {
    return (
      <Dock
        position="bottom"
        dimMode="transparent"
        defaultSize={1}
        isVisible={this.state.isVisible}
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
    if(request.toggle) {
      handleExtensionClick();
    }
  });
