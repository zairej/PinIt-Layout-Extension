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
import NUXCarousel from '../components/NUXCarousel';

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
      this.setState({ images: Array.from(document.querySelectorAll('canvas')) });
    }
  }

  handleBackClick() {
    this.props.dispatch(previousStep(2));
    this.props.dispatch(updateString(''));
  }

  handleExitClick() {
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
            <div className={style.headerButtons}>
                <button className={style.btnNUX} id="btnNUX" onClick={this.handleNUXClickTrue}>?</button>
                <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
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
      document.getElementById("btnNUX").style.display = "none";
      return (
        <NUXCarousel />
      );
    } else {
      document.getElementById("btnNUX").style.display = "inline";
    }
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
          <div className={style.headerButtons}>
              <button className={style.btnNUX} id="btnNUX" onClick={this.handleNUXClickTrue}>?</button>
              <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
          </div>
        </div>
        <div className={style.scrollPanel}>
          <TextLayout images={this.state.images} />
        </div>
      </div>
    );
  }

  renderFinalizePin() {
    return (
      <div className={style.pinPanel}>
        <div className={style.headerButtons}>
          <button className={style.btnNUX} id="btnNUX" onClick={this.handleNUXClickTrue}>?</button>
          <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
        </div>
        <FinalizePinLayout images={this.state.images} text={this.props.state.text} />
        <div className={style.pinPanelFooterBack}>
          <button className={style.btnNext} onClick={this.handleBackClick}>Back</button>
        </div>
      </div>
    );
  }

  renderNoImagesPage() {
    return (
      <div>
        <button className={style.btnNUX} id="btnNUX" onClick={this.handleNUXClickTrue}>?</button>
        <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
        <div style={{ fontSize:50, color: 'white'}}
        className="noImages"> NO IMAGES </div>
      </div>
    );
  }

  renderContent() {
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

        default:
          return null;
      }
    } else {
      return this.renderNoImagesPage();
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
