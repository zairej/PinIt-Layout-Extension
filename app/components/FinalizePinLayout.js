import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './FinalizePinLayout.css';

@connect((state) => ({ state }))
class FinalizePinLayout extends Component {
  constructor(props) {
    super(props);
    this.PIN_WIDTH = 236;
    this.PIN_HEIGHT = props.images.reduce((prev, curr) => prev + curr.height, 0);
    this.TEXT_PADDING = 5;
  }

  componentDidMount() {
    this.drawCanvas(this.props);
    this.props.rex(this.refs.CanvasImages);
  }

  componentDidUpdate() {
    this.drawCanvas(this.props);
  }

  getTextStyle() {
    return {
      top: 50,
      left: 0,
      width: this.PIN_WIDTH,
      height: 20,
      lineHeight: 10,
      fontSize: 20,
      color: '#ff0000'
    };
  }

  splitText(context, text, padding, startX) {
    const maxWidth = this.PIN_WIDTH - (padding) - startX;
    const lines = [];
    const words = text.split(' ');

    while (words.length && lines.length !== words.length) {
      let tmp = words[0];
      let line = words.shift();
      while (words.length && context.measureText(line).width < maxWidth) {
        tmp = words[0];
        line = line + ' ' + words.shift();
      }
      if (context.measureText(line).width > maxWidth) {
        line = line.substring(0, line.lastIndexOf(' '));
        words.unshift(tmp);
      }
      lines.push(line);
    }
    return lines;
  }

  drawCanvas({ images, state }) {
    let yPos = 0;
    const refs = this.refs;

    images.forEach((docImage) => {
      const canvas = refs.CanvasImages;
      const context = canvas.getContext('2d');
      const image = new Image();

      image.onload = () => {
        context.drawImage(image, 0, yPos);
        context.fillStyle = state.text.color;
        context.font = state.text.size + 'px ' + state.text.font;
        let yChange = 0;
        yPos += image.height;

        this.splitText(context, state.text.string + ' ', this.TEXT_PADDING, state.text.x).forEach((line) => {
          context.fillText(line, Math.max(this.TEXT_PADDING, state.text.x), state.text.y + yChange);
          yChange += state.text.size + 7;
        });
      };

      image.src = docImage.getAttribute('data-url');
    });
  }

  render() {
    return (
      <div className={style.divCanvas}>
        <canvas className={style.canvasImages} ref="CanvasImages" height={this.PIN_HEIGHT} width={this.PIN_WIDTH}>
        </canvas>
      </div>
    );
  }

}

FinalizePinLayout.propTypes = {
  images: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  rex: PropTypes.function
};

export default FinalizePinLayout;
