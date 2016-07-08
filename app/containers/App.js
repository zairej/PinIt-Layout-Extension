import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinLayout from '../components/PinLayout';
import * as ImageActions from '../actions/images';
import style from './App.css';
import ImageLayout from '../components/ImageLayout';
import { toggleVisibility } from '../actions/visibility';
import { removeAllCanvasImages } from '../actions/canvas';
import { nextStep, previousStep } from '../actions/step';


@connect((state) => ({ state }))
export default class App extends Component {

  constructor(props) {
    super(props);

    this.handleExitClick = this.handleExitClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
    this.handleBackClick = this.handleBackClick.bind(this);
    this.renderFinalizePin = this.renderFinalizePin.bind(this);
    this.renderContent = this.renderContent.bind(this);
    this.renderNoImagesPage = this.renderNoImagesPage.bind(this);
  }

  handleNextClick() {
    if (this.props.state.canvas.length === 0) {
      alert('No images selected');
    } else {
      this.props.dispatch(nextStep(1));
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
  renderPickImages() {
    return (
      <div className={style.container}>
        <div className={style.imagesPanel}>
          <div className={style.logoHeader}>
            <img src={chrome.extension.getURL('img/P_ChoosePins.png')}
              className={style.headerImage}/>
              <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
          </div>
          <div className={style.scrollPanel}>
            <ImageLayout columnWidth={236} columns={1} gutter={8} />
          </div>
        </div>
        <div className={style.pinPanel}>
          <PinLayout />
          <div className={style.pinPanelFooter}>
            <button className={style.btnNext} onClick={this.handleNextClick}>Next</button>
          </div>
        </div>
      </div>
    );
  }

  renderFinalizePin() {
    return (
      <div>
        <div style={{ fontSize:30, color: 'white' }}> AAAA </div>
        <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
        <div className={style.pinPanelFooter}>
            <button className={style.btnBack} onClick={this.handleBackClick}>Back</button>
        </div>
      </div>
    );
  }

  renderNoImagesPage() {
    return (
      <div>
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
          return this.renderPickImages();

        case 2:
          return this.renderFinalizePin();

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
