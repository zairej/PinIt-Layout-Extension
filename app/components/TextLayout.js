import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { updateString, updateFont, updateColor, updateX, updateY, updateSize } from '../actions/text';


const FONT_FAMILY = ['Arial', 'Arial Black', 'Courier New', 'Cursive', 'Georgia Gothic',
                     'Sans-serif', 'Serif', 'Tahoma', 'Times New Roman', 'Verdana', 'Papyrus'];
const STYLE = { backgroundColor: 'white', border: '1 px solid', color: 'black', height: '20px',
                paddingTop: '4px', paddingBottom: '4px', paddingRight: '6px', paddingLeft: '6px',
                marginBottom: '10px', fontSize: '14px', lineHeight: '20px', borderRadius: '0px',
                verticalAlign: 'middle', boxSizing: 'content-box', display: 'inline-block' };
const TEXT_PADDING = 5;

@connect((state) => ({ state }))
class TextLayout extends Component {
  constructor(props) {
    super(props);
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
          style={{ ...STYLE, width: '260px' }}
        />

        <br />Font Family:
        <select id="FONT" onChange={this.handleChange} style={{ ...STYLE, width: '120px' }}>
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
          style={{ ...STYLE, width: '38px' }}
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
          style={{ ...STYLE, width: '38px' }}
        />

        <br />X POS
        <input
          id="X"
          type="number"
          min="0"
          max={this.PIN_WIDTH - TEXT_PADDING}
          step="5"
          value={this.props.state.text.x}
          onChange={this.handleChange}
          style={{ ...STYLE, width: '36px' }}
        />

        Y POS:
        <input
          id="Y"
          type="number"
          min="0"
          max={this.PIN_HEIGHT}
          step="5"
          value={this.props.state.text.y}
          onChange={this.handleChange}
          style={{ ...STYLE, width: '36px' }}
        />
      </div>
    );
  }

}

TextLayout.propTypes = {
  images: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired,
  dispatch: PropTypes.object.isRequired
};

export default TextLayout;
