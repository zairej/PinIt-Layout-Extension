import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import PinLayout from '../components/PinLayout';
import style from './App.css';
import ImageLayout from '../components/ImageLayout';
import { toggleVisibility } from '../actions/visibility';
import { removeAllCanvasImages } from '../actions/canvas';
import { nextStep, previousStep } from '../actions/step';
import FinalizePinLayout from '../components/FinalizePinLayout';
import NUXCarousel from '../components/NUXCarousel';

@connect((state) => ({ state }))
export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = { images: [] };

    this.handleExitClick = this.handleExitClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.handleNUXClick = this.handleNUXClick.bind(this);
    this.renderFinalizePin = this.renderFinalizePin.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderNoImagesPage = this.renderNoImagesPage.bind(this);
    this.renderLayoutImages = this.renderLayoutImages.bind(this);
    this.renderInitializePin = this.renderInitializePin.bind(this);
    this.renderFinalizePin = this.renderFinalizePin.bind(this);
    this.renderCustomizePin = this.renderCustomizePin.bind(this);
  }

  handleNextClick() {
    if (this.props.state.canvas.length === 0) {
      alert('No images selected');
    } else {
      this.props.dispatch(nextStep(1));
      this.setState({ images: document.querySelectorAll('canvas') });
    }
  }

  handleBackClick() {
    this.props.dispatch(previousStep(2));
  }

  handleExitClick() {
    this.props.dispatch(toggleVisibility(false));
    this.props.dispatch(removeAllCanvasImages());
    document.body.style.overflow = 'auto';
    document.body.style.position = 'static';
  }


  handleNUXClick() {
    console.log("clicked");
    this.props.dispatch(nextStep(2));
  }

  renderLayoutImages() {
    return (
      <div className={style.imagesPanel}>
        <div>
          <div className={style.logoHeader}>
            <img
              role="presentation"
              src={chrome.extension.getURL('img/P_ChoosePins.png')}
              className={style.headerImage}
            />
              <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
              <button className={style.btnNUX} onClick={this.handleNUXClick}>?</button>
          </div>
          <div className={style.scrollPanel}>
            <ImageLayout columnWidth={236} gutter={8} />
          </div>
        </div>
      </div>
    );
  }

  renderInitializePin() {
    return (
      <div className={style.pinPanel}>
        <PinLayout />
        <div className={style.pinPanelFooter}>
          <button className={style.btnNext} onClick={this.handleNextClick}>Next</button>
        </div>
      </div>
    );
  }

  renderCustomizePin() {
    return (
      <div className={style.imagesPanel}>
        <div className={style.logoHeader}>
          <img
            role="presentation"
            src={chrome.extension.getURL('img/P_ChoosePins.png')}
            className={style.headerImage}
          />
        </div>
        <div className={style.scrollPanel}>
          Text Customizaton Stuff
        </div>
      </div>
    );
  }

  renderFinalizePin() {
    return (
      <div className={style.pinPanel}>
        <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
        <FinalizePinLayout images={this.state.images} />
        <button className={style.btnNUX} onClick={this.handleNUXClick}>?</button>
        <div className={style.pinPanelFooterBack}>
          <button className={style.btnNext} onClick={this.handleBackClick}>Back</button>
        </div>
      </div>
    );
  }

  renderNoImagesPage() {
    return (
      <div>
        <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
        <button className={style.btnNUX} onClick={this.handleNUXClick}>?</button>
        <div style={{ fontSize:50, color: 'white'}}
        className="noImages"> NO IMAGES </div>
      </div>
    );
  }

  renderContent() {
    console.log(this.props.state.step);
    if (this.props.state.imagesOnPage) {
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

        case 3:
          return (
            <NUXCarousel/>
          );

        default:
          return null;
      }
    } else {
      return this.renderNoImagesPage();
    }
  }

  render() {
    console.log(this.props.state);
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
