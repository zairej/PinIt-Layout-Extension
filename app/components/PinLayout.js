import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import * as ImageActions from '../actions/images';
// import ReactCanvas, { Surface, Group, Gradient, Image, Text, FontFace } from 'react-canvas';
import style from './PinLayout.css';
import PinLayoutImagePanel from './PinLayoutImagePanel';

const DEFAULT_PIN_IMG_HEIGHT = 300;
// TODO: Export to config file import
const PIN_WIDTH = 236;

@connect(
  state => ({
    canvasImages: state.canvas
  })
)
class PinLayout extends Component {
  static propTypes = {
    canvasImages: PropTypes.array.isRequired
  };

  getGradientStyle() {
    return {
      top: 0,
      left: 0,
      width: PIN_WIDTH,
      height: DEFAULT_PIN_IMG_HEIGHT
    };
  }

  getGradientColors() {
    return [
      { color: 'transparent', position: 0 },
      { color: '#000', position: 1 }
    ];
  }

  render() {
    const { canvasImages } = this.props;
    return (
      <section className={style.pin}>
        <div className={style.images}>
          {canvasImages.map(image =>
            <PinLayoutImagePanel
              key={`${image.id}_resizable`}
              image={image}
            />
          )}
        </div>
        {/*<div className={style.canvas} style={{display:'none'}}>
          <Surface top={0} left={0} width={PIN_WIDTH} height={DEFAULT_PIN_IMG_HEIGHT}>
            <Gradient
              style={this.getGradientStyle()}
              colorStops={this.getGradientColors()}
            />
          </Surface>
        </div>*/}
        <div className={style.pinMetaWrapper}>
          <textarea
            type="text"
            rows="2"
            className={style.pinDescription}
            placeholder="Describe your Pin"
          />
        </div>
      </section>
    );
  }
}

PinLayout.contextTypes = {
  store: PropTypes.object
};

export default PinLayout;
