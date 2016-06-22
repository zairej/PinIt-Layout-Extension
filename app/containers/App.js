import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PinLayout from '../components/PinLayout';
import * as ImageActions from '../actions/images';
import style from './App.css';
import ImageLayout from '../components/ImageLayout';


@connect(
  state => ({
    images: state.images
  }),
  dispatch => ({
    actions: bindActionCreators(ImageActions, dispatch)
  })
)
export default class App extends Component {

  static propTypes = {
    images: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  handleSave() {
    alert('If only we had enough time! So close.');
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
          <PinLayout />
          <div className={style.pinPanelFooter}>
            <button className={style.btnSave} onClick={this.handleSave}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

App.contextTypes = {
  store: PropTypes.object
};
