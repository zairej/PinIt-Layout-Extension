import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { newText } from '../actions/text';
@connect((state) => ({ state }))
class TextLayout extends Component {
  constructor(props) {
    super(props);
    this.state = { value: 'Enter Text' };
    this.images = Array.prototype.slice.call(props.images);
    this.PIN_WIDTH = 236;
    this.PIN_HEIGHT = this.images.reduce((prev, curr) => prev + curr.height, 0);

    this.handleChange = this.handleChange.bind(this);
    this.handleEnterClick = this.handleEnterClick.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleEnterClick() {
    //this.props.dispatch(newText(this.state.value));
    const ctx = document.getElementsByTagName('canvas')[0].getContext('2d');
    ctx.fillRect(0,0,100,100);
    ctx.font = '20px Georgia';
    ctx.fillText(this.state.value, 12, 45);
  }

  render() {
    console.log(this.props.state.text);
    return 
      <div> Text:
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleEnterClick}>Enter</button>
      </div>
    );
  }

}

TextLayout.propTypes = {
  //the list of images to render
  images: PropTypes.object,
};

export default TextLayout;
