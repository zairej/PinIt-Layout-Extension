import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinLayout from '../components/PinLayout';
import * as ImageActions from '../actions/images';
import style from './App.css';
import ImageLayout from '../components/ImageLayout';
import { toggleVisibility } from '../actions/visibility';


@connect()
export default class App extends Component {

  constructor(props) {
    super(props);
    this.handleExitClick = this.handleExitClick.bind(this);
  }

  handleSave() {
    alert('If only we had enough time! So close.');
  }

  handleExitClick() {
    this.props.dispatch(toggleVisibility(false));
  }

  render() {
    return (
      <div className={style.container}>
        <div className={style.imagesPanel}>
          <div className={style.logoHeader}>
            <img src={chrome.extension.getURL('img/P_ChoosePins.png')}
            className={style.headerImage}/>
          </div>
          <div className={style.scrollPanel}>
            <ImageLayout columnWidth={236} columns={1} gutter={8} />
          </div>
        </div>
        <div className={style.pinPanel}>
        <button className={style.btnExit} onClick={this.handleExitClick}>X</button>
          <PinLayout />
          <div className={style.pinPanelFooter}>
            <button className={style.btnSave} onClick={this.handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
