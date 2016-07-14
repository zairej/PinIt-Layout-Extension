import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { newText } from '../actions/text';
=======
import { updateString, updateFont, updateColor, updateX, updateY, updateSize } from '../actions/text';


const FONT_FAMILY = ['Arial', 'Arial Black', 'Courier New', 'Cursive', 'Georgia Gothic', 'Sans-serif',
                     'Serif', 'Tahoma', 'Times New Roman', 'Verdana', 'Papyrus'];
const STYLE = { width: '20%', backgroundColor: 'white', border: '1 px solid', color: 'black' };

>>>>>>> 0e6b0578014d8a0ab065b819fd89aea868ca77bb
@connect((state) => ({ state }))
class TextLayout extends Component {
  constructor(props) {
    super(props);
<<<<<<< HEAD
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
=======
    this.state = { text: '' };
    this.PIN_WIDTH = 236;
    this.PIN_HEIGHT = props.images.reduce((prev, curr) => prev + curr.height, 0);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    switch (event.target.id) {
      case 'STRING':
        return this.props.dispatch(updateString(event.target.value));
      case 'FONT':
        return this.props.dispatch(updateFont(event.target.value));
      case 'COLOR':
        return this.props.dispatch(updateColor(event.target.value));
      case 'FONTSIZE':
        return this.props.dispatch(updateSize(Math.abs(Math.floor(event.target.value))));
      case 'X':
        return this.props.dispatch(updateX(event.target.value));
      case 'Y':
        return this.props.dispatch(updateY(Math.abs(Math.floor(event.target.value))));
      default:
        return null;
    }
  }

  render() {
    return (
      <div id="TextCustomizers"> Text:
        <input
          id="STRING"
          type="text"
          value={this.props.state.text.string}
          onChange={this.handleChange}
        />

        <br />Font Family:
        <select id="FONT" onChange={this.handleChange} style={{ ...STYLE, width: '15%' }}>
          {FONT_FAMILY.map((font, index) => (
            <option value={font} key={index}>{font}</option>
            ))}
        </select>

        <br />Color:
        <input
          id="COLOR"
          type="color"
          value={this.props.state.text.color}
          onChange={this.handleChange}
          style={{ ...STYLE, width: '5%' }}
        />

        <br />Font Size:
        <input
          id="FONTSIZE"
          type="number"
          min="0"
          max="30"
          step="1"
          value={this.props.state.text.size}
          onChange={this.handleChange}
          style={{ ...STYLE, width: '6%' }}
        />

        <br />X POS
        <input
          id="X"
          type="text"
          value={this.props.state.text.x}
          onChange={this.handleChange}
          style={{ ...STYLE, width: '8%' }}
        />

        Y POS:
        <input
          id="Y"
          type="number"
          min="0"
          max={this.PIN_HEIGHT}
          step="1"
          value={this.props.state.text.y}
          onChange={this.handleChange}
          style={{ ...STYLE, width: '8%' }}
        />
>>>>>>> 0e6b0578014d8a0ab065b819fd89aea868ca77bb
      </div>
    );
  }

}

TextLayout.propTypes = {
<<<<<<< HEAD
  //the list of images to render
  images: PropTypes.object,
=======
  images: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired
>>>>>>> 0e6b0578014d8a0ab065b819fd89aea868ca77bb
};

export default TextLayout;
