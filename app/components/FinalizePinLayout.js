import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import style from './FinalizePinLayout.css';


@connect((state) => ({ state }))
class FinalizePinLayout extends Component {
  constructor(props) {
    super(props);
    this.PIN_WIDTH = 236;
    this.PIN_HEIGHT = props.images.reduce((prev, curr) => prev + curr.height, 0);
  }

  componentDidMount() {
    this.drawCanvas(this.props);
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

  splitText(context, text, padding) {
    const maxWidth = 236 - (padding * 2);
    const lines = [];
    const words = text.split(' ');

    while (words.length) {
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

        this.splitText(context, state.text.string, 10).forEach(function (line) {
          context.fillText(line, 10, state.text.y + yChange);
          yChange += state.text.size + 7;
        });
      };

      image.src = docImage.getAttribute('data-url');
    });
  }

  handleSave(){
    var c = document.querySelectorAll('canvas')
    var canvas = c[0];
    function receiveMessage(event){
      if(event.source!== popup){
        return;
      }
      if(event.data == 'pinterestReady'){
        var payload = {
          type: 'pinImageData',
          dataUri: canvas.toDataURL('images/jpeg')
        }
        popup.postMessage(payload, '*');
        window.removeEventListener('message', receiveMessage, false);
      }
    }
    window.addEventListener('message', receiveMessage, false);

    var host = 'www.pinterest.com';
    var title = document.title;
    var pinUrl = window.location.href;
    var url = 'http://' + host + '/pin/create/extension/?pinFave=true&url=' + encodeURIComponent(pinUrl);
    var popupOptions = 'status=no,resizable=yes,scrollbars=yes,personalbar=no,directories=no,location=no,toolbar=no,menubar=no,width=750,height=320,left=0,top=0';
    var popup = window.open(url, 'pin' + (new Date()).getTime(), popupOptions);
   
  }

  render() {
    return (
      <div>
        <canvas ref="CanvasImages" height={this.PIN_HEIGHT} width={this.PIN_WIDTH}>
        </canvas>
        <div className={style.pinPanelFooter}>
              <button className={style.btnSave} onClick={this.handleSave}>Save</button>
        </div>
      </div>
    );
  }

}

FinalizePinLayout.propTypes = {
  images: PropTypes.array.isRequired,
  state: PropTypes.object.isRequired
};

export default FinalizePinLayout;
