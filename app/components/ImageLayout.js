/*
 * Encorperated from:
 * https://github.com/zackargyle/react-image-layout
 * Under MIT License
 */
import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ImageActions from '../actions/images';
import ToggleableImage from './ToggleableImage';
import ReactDOM from 'react-dom';

/*
 * The classic "masonry" style Pinterest grid
 * @prop {number} columns - the number of columns in the grid
 * @prop {number} columnWidth - the fixed width of the columns
 * @prop {number} gutter  - the number of columns in the grid
 * @prop {Array}  images   - the list of images to render
 */
@connect(
 state => ({
   images: state.images,
 }),
 dispatch => ({
   actions: bindActionCreators(ImageActions, dispatch)
 })
)
class ImageLayout extends Component {

  constructor(props) {
    super(props);
    // This column count may not ever be used for display
    this.state = { columnHeights: Array.from({ length: props.columns }, () => 0) };
    this.handleResize = this.handleResize.bind(this);
  }

  /*
   * Check if state has been updated, if this returns false
   * componentWillUpdate does not get used
   */
  shouldComponentUpdate(nextProps, nextState) {
    const newImages = nextProps.images !== this.props.images;
    const newColumns = this.getColumnCount(nextProps) !== this.state.columnHeights.length;
    return newImages || newColumns;
  }

  /*
   * Reset column count and height on update
   */
  componentWillUpdate(props) {
    this.updateColumnCount(props);
  }

  updateColumnCount(props) {
    const columnCount = this.getColumnCount(props);
    this.setState({ columnHeights: Array.from({ length: columnCount }, () => 0) });
  }

  /**
   * Look at the root node and/or its parent, and determine
   * how many columns we can fit.
   * @returns {number} the number of columns to use
   */
  getColumnCount(props) {
    const rootNode = ReactDOM.findDOMNode(this.refs.root);
    const grandWidth = rootNode.parentNode.parentNode.offsetWidth;
    const columnCount = Math.floor((grandWidth) / (props.columnWidth + props.gutter));
    return columnCount;
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
  }

  handleResize(evt) {
    this.updateColumnCount(this.props);
  }

  /*
   * Get the shortest column in the list of columns heights
   */
  getShortestColumn() {
    const minValue = Math.min(...this.state.columnHeights);
    return this.state.columnHeights.indexOf(minValue);
  }

  /*
   * Determine the top and left positions of the grid image. Update the
   * cached column height.
   * @param {Object} image - the grid image
   * @param {Object} image.height - the grid image's image height
   * @param {Object} image.width - the grid image's image width
   */
  getItemStyle(image) {
    const { columnWidth, gutter } = this.props;
    const shortestColumnIndex = this.getShortestColumn();
    const left = (columnWidth + gutter) * shortestColumnIndex;
    const top = this.state.columnHeights[shortestColumnIndex];
    const normalizedHeight = (columnWidth / image.width) * image.height;
    this.state.columnHeights[shortestColumnIndex] += normalizedHeight + gutter;
    return {
      left: `${left}px`,
      top: `${top}px`,
      position: 'absolute'
    };
  }

  render() {
    const { images } = this.props;
    return (
      <div className="ImageLayout" style={{ position: 'relative' }} ref="root">
      {images.map(image => (
        <div style={this.getItemStyle(image)}>
          <ToggleableImage
            key={image.id}
            image={image}
          />
        </div>
      ))}
      </div>
    );
  }
}

ImageLayout.propTypes = {
  // The number of columns in the grid
  columns: PropTypes.number,
  // The fixed width of the columns in the grid
  columnWidth: PropTypes.number,
  // The size of the gutter between images
  gutter: PropTypes.number,
  // The list of images to render
  images: PropTypes.array.isRequired,
  actions: PropTypes.object
};

ImageLayout.defaultProps = {
  columns: 4,
  columnWidth: 100,
  gutter: 0,
  images: [],
};

export default ImageLayout;
