import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageActions from '../actions/images';
import * as CanvasActions from '../actions/canvas';
import style from './ToggleableImage.css';
import classNames from 'classnames';

@connect(
 state => ({
   images: state.images
 }),
 dispatch => ({
   imageActions: bindActionCreators(ImageActions, dispatch),
   canvasActions: bindActionCreators(CanvasActions, dispatch),
 })
)
class ToggleableImage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    // this.handleIsSelectedChange = this.handleIsSelectedChange.bind(this);
    // this.unsubscribe = this.context.store.subscribe(this.handleIsSelectedChange);
  }

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

  // handleIsSelectedChange() {
  //   // const state = this.context.store.getState();
  //   console.log('handleIsSelectedChange', arguments, state);
  // }

  handleClick(image) {
    const { imageActions, canvasActions } = this.props;
    imageActions.toggleImageSelection(image.id);
    // TODO: This all need to be consolidated into the reducer
    if (!image.isSelected) {
      canvasActions.addImage(image);
    } else {
      canvasActions.removeImage(image.id);
    }
  }

  render() {
    const { image } = this.props;
    return (
      <div className={classNames(style.ToggleableImage, { [style.checked]: image.isSelected })}>
        <div className={style.checkbox}>✔</div>
        <img
          width={236}
          src={image.url}
          alt={image.url}
          onClick={() => this.handleClick(image)}
        />
      </div>
    );
  }
}
ToggleableImage.propTypes = {
  image: PropTypes.object.isRequired,
  imageActions: PropTypes.object,
  canvasActions: PropTypes.object,
};

ToggleableImage.contextTypes = {
  store: PropTypes.object
};

export default ToggleableImage;
