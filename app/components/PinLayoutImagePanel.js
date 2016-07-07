import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import ResizableBox from './ResizableBox';
import AvatarEditor from './AvatarEditor';
import throttle from 'lodash.throttle';
import style from './PinLayoutImagePanel.css';

// TODO: Export to config file import
const PIN_WIDTH = 236;
const MIN_PIN_HEIGHT = 100;
const MAX_PIN_HEIGHT = 1680 / 2;
const MIN_ZOOM = 0.2;
const MAX_ZOOM = 2;
const DEFAULT_ZOOM = 1;

class PinLayoutImagePanel extends Component {
  constructor(props) {
    super(props);
    this.handleResizableBoxResize = throttle(this.handleResizableBoxResize.bind(this), 50);
    this.handleZoomUpdate = this.handleZoomUpdate.bind(this);
    this.state = {
      height: (props.image.height * PIN_WIDTH)/props.image.width,
      //Uses proportions to find the new height
      width: PIN_WIDTH,
      zoom: DEFAULT_ZOOM,
    };
  }

  handleResizableBoxResize(evt, { size }) {
    console.log(size.height);
    this.setState({ height: size.height });
  }

  handleZoomUpdate(evt) {
    const newstate = this.state;
    newstate.zoom = +ReactDom.findDOMNode(this.refs.zoom).value;
    this.setState({ newstate });
  }

  render() {
    const { image } = this.props;
    const { height, zoom, width } = this.state;
    return (
      <div className={style.PinLayoutImagePanel}>
        <input
          className={style.zoom}
          type="range"
          name="zoom"
          ref="zoom"
          min={MIN_ZOOM}
          max={MAX_ZOOM}
          step="0.1"
          defaultValue={DEFAULT_ZOOM}
          onChange={this.handleZoomUpdate.bind(this)}
        />
        <img className={style.slidersmall} src={chrome.extension.getURL('img/slider_small.png')}/>
        <img className={style.sliderlarge} src={chrome.extension.getURL('img/slider_large.png')}/>

        <ResizableBox
          width={PIN_WIDTH}
          height={height}
          minConstraints={[PIN_WIDTH, MIN_PIN_HEIGHT]}
          maxConstraints={[PIN_WIDTH, MAX_PIN_HEIGHT]}
          onResize={this.handleResizableBoxResize}
        >
        <img className={style.toggleresize} src={chrome.extension.getURL('img/resize_toggle.png')}/>

          <AvatarEditor
            image={image.url}
            scale={zoom}
            border={0}
            width={PIN_WIDTH}
            height={height}
          />
        </ResizableBox>
      </div>
    );
  }
}

export default PinLayoutImagePanel;