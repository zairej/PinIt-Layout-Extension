import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './FinalizePinLayout.css';
import { Surface, Image, Text } from 'react-canvas';


@connect((state) => ({ state }))
class FinalizePinLayout extends Component {
  constructor(props) {
    super(props);
    this.images = Array.prototype.slice.call(props.images);
    this.PIN_WIDTH = 236;
    this.PIN_HEIGHT = this.images.reduce((prev, curr) => prev + curr.height, 0);
    this.top = 0;

    this.getImageHeight = this.getImageHeight.bind(this);
    this.getImageStyle = this.getImageStyle.bind(this);
    this.getTextStyle = this.getTextStyle.bind(this);
  }
  getImageHeight() {
    return 94;
  }

  getImageStyle(image) {
    this.top += image.height;
    return {
      top: this.top - image.height,
      left: 0,
      width: this.PIN_WIDTH,
      height: image.height
    };
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

  render() {
    return (
      <Surface width={this.PIN_WIDTH} height={this.PIN_HEIGHT} left={0} top={0}>
        {this.images.map(image => (
          <Image
            key={this.images.indexOf(image)}
            style={this.getImageStyle(image)}
            src={image.getAttribute('data-url')}
          />
        ))}

        <Text style={this.getTextStyle()}>
          HERE! Allow user to write in textbox on left and
          customize with fonts and color
        </Text>
      </Surface>
    );
  }

}

FinalizePinLayout.propTypes = {
  //the list of images to render
  images: PropTypes.object,
};

export default FinalizePinLayout;
