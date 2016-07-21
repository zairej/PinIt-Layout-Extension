import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PinLayout from '../components/PinLayout';
import style from './App.css';
import ImageLayout from '../components/ImageLayout';
import { toggleVisibility } from '../actions/visibility';
import { toggleVisibilityNUX } from '../actions/visibilitynux';
import { removeAllCanvasImages } from '../actions/canvas';
import { nextStep, previousStep } from '../actions/step';
import FinalizePinLayout from '../components/FinalizePinLayout';
import TextLayout from '../components/TextLayout';
import { updateString } from '../actions/text';
import { setFilter } from '../actions/filter';
import ReactDOM from 'react-dom';
import NUXCarousel from '../components/NUXCarousel';
import classNames from 'classnames';

const PINPANELWIDTH = 350;
const MARGIN = 30;

@connect((state) => ({ state }))
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { images: [] };

    this.handleExitClick = this.handleExitClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNUXClickTrue = this.handleNUXClickTrue.bind(this);
    this.renderFinalizePin = this.renderFinalizePin.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderLayoutImages = this.renderLayoutImages.bind(this);
    this.renderInitializePin = this.renderInitializePin.bind(this);
    this.renderFinalizePin = this.renderFinalizePin.bind(this);
    this.renderCustomizePin = this.renderCustomizePin.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.setGrey = this.setGrey.bind(this);
    this.setSepia = this.setSepia.bind(this);
    this.setNone = this.setNone.bind(this);
  }

  handleNextClick() {
    if (this.props.state.canvas.length === 0) {
      alert('No images selected');
    } else {
      this.props.dispatch(nextStep(1));
      this.setState({ images: Array.from(document.querySelectorAll('canvas')) });
    }
  }

  handleBackClick() {
    this.props.dispatch(previousStep(2));
    this.props.dispatch(updateString(''));
    this.props.dispatch(setFilter('none'));
  }

  handleExitClick() {
    this.props.dispatch(setFilter('none'));
    this.props.dispatch(toggleVisibility(false));
    this.props.dispatch(removeAllCanvasImages());
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
    if (this.props.state.isVisibleNUX) {
      this.props.dispatch(toggleVisibilityNUX(false));
    }
  }

  handleNUXClickTrue() {
    this.props.dispatch(toggleVisibilityNUX(true));
  }

  handleSave() {
    const canvas = ReactDOM.findDOMNode(this.canvas);
    function receiveMessage(event) {
      if (event.source !== popup) {
        return;
      }
      if (event.data === 'pinterestReady') {
        const payload = {
          type: 'pinImageData',
          dataUri: canvas.toDataURL('images/jpeg')
        };
        popup.postMessage(payload, '*');
        window.removeEventListener('message', receiveMessage, false);
      }
    }
    window.addEventListener('message', receiveMessage, false);
    const url = 'http://www.pinterest.com/pin/create/extension/?pinFave=true&url=' + encodeURIComponent(window.location.href);
    const popupOptions = 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=750,height=320,left=0,top=0';
    const popup = window.open(url, 'pin' + (new Date()).getTime(), popupOptions);
  }

  getButtonStyle() {
    return classNames({
      [style.btnNUX]: !this.props.state.isVisibleNUX,
      [style.open]: this.props.state.isVisibleNUX,
    });
  }

  renderLayoutImages() {
    return (
      <div
        className={style.ImagesPanel}
        style={{ width: window.innerWidth - PINPANELWIDTH, marginLeft: MARGIN, marginRight: MARGIN }}>
        <div>
          <div className={style.logoHeader}>
            <img
              role="presentation"
              src={chrome.extension.getURL('img/ChooseHeader.png')}
              className={style.headerImage}
            />
            <div className={style.headerButtons}>
              <input type="image" className={style.btnExit} onClick={this.handleExitClick} src={chrome.extension.getURL('img/exit.png')}/>
            </div>
            <div className={style.footerButtons}>
              <input type="image" className={this.getButtonStyle()} onClick={this.handleNUXClickTrue} src={chrome.extension.getURL('img/Question_non_hover.png')}/>
            </div>
          </div>
          <div className={style.scrollPanel}>
            <ImageLayout columnWidth={236} gutter={8} />
          </div>
        </div>
        {this.renderNUX()}
      </div>
    );
  }

  renderNUX() {
    if (this.props.state.isVisibleNUX) {
      return (
        <NUXCarousel />
      );
    }
  }


  renderInitializePin() {
    return (
      <div>
        <div className={style.pinPanel}>
          <div className={style.pinPreview}>
            <p>Preview</p>
          </div>
          <PinLayout />
        </div>
        <div className={style.pinPanelFooter}>
          <button className={style.btnNext} onClick={this.handleNextClick}>Next</button>
        </div>
      </div>
    );
  }

  setGrey() {
    if (this.props.state.filter === 'grey') {
      return this.setNone();
    }
    this.props.dispatch(setFilter('grey'));
  }
  setSepia() {
    if (this.props.state.filter === 'sepia') {
      return this.setNone();
    }
    this.props.dispatch(setFilter('sepia'));
  }
  setNone() {
    this.props.dispatch(setFilter('none'));
  }

  renderCustomizePin() {
    return (
      <div className={style.imagesPanel}>
        <div className={style.logoHeader}>
          <img
            role="presentation"
            src={chrome.extension.getURL('img/CustomizeHeader.png')}
            className={style.headerImage}
          />
          <div className={style.headerButtons}>
              <input type="image" className={style.btnExit} onClick={this.handleExitClick} src={chrome.extension.getURL('img/exit.png')}/>
          </div>
            <div className={style.footerButtons}>
              <input type="image" className={this.getButtonStyle()} onClick={this.handleNUXClickTrue} src={chrome.extension.getURL('img/Question_non_hover.png')}/>
            </div>
        </div>
        <div className={style.scrollPanel}>
          <TextLayout images={this.state.images} />
        </div>
        {this.renderNUX()}
        <button className={style.filterButtongrey} onClick={this.setGrey}>GreyScale</button>
        <button className={style.filterButtonsepia} onClick={this.setSepia}>Sepia</button>
      </div>
    );
  }

  renderFinalizePin() {
    return (
    <div>
      <div className={style.pinPanel}>
        <div className={style.pinPreview}>
          <p>Preview</p>
        </div>
        <div className={style.headerButtons}>
          <input type="image" className={style.btnExit} onClick={this.handleExitClick} src={chrome.extension.getURL('img/exit.png')}/>
        </div>
        <div className={style.footerButtons}>
          <input type="image" className={this.getButtonStyle()} onClick={this.handleNUXClickTrue} src={chrome.extension.getURL('img/Question_non_hover.png')}/>
        </div>
        <FinalizePinLayout rex={canvas => this.canvas = canvas} images={this.state.images} text={this.props.state.text} />
      </div>
        <div className={style.pinPanelFooterBack}>
          <button className={style.btnBack} onClick={this.handleBackClick}>Back</button>
        </div>
        <div className={style.pinPanelFooterSave}>
          <button className={style.btnSave} onClick={this.handleSave}>Save</button>
        </div>
    </div>
    );
  }

  renderContent() {
    const { step } = this.props.state;
    switch (step) {
      case 1:
        return (
          <div className={style.container}>
            {this.renderLayoutImages()}
            {this.renderInitializePin()}
          </div>
        );
      case 2:
        return (
          <div className={style.container}>
            {this.renderCustomizePin()}
            {this.renderFinalizePin()}
          </div>
        );

      default:
        return null;
    }
  }

  render() {
    return (
      <div className="ReactPinitExtension">
        {this.renderContent()}
      </div>
    );
  }
}

App.propTypes = {
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired
};
