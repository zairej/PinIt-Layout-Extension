import React, { Component, PropTypes } from 'react';
import { updateCarouselOffset } from '../actions/carousel';
import { connect } from 'react-redux';
import style from './NUXCarousel.css';
import { toggleVisibilityNUX } from '../actions/visibilitynux';

const numSlides = 3;
const imageUrls = [
    {
        type: 'img',
        src: "https://s-media-cache-ak0.pinimg.com/564x/96/9d/cd/969dcd69995edcf2922290ada4f4cc4c.jpg" 
    }, 
    {
        type: 'img',
        src: chrome.extension.getURL('img/pin-small@2x.png') 
    },
    {
        type: 'video',
        src: chrome.extension.getURL('img/mov.mp4')
    }];

@connect((state) => ({ state }))
class NUXCarousel extends Component {
    constructor(){
        super();
        this.state = {offset: 0};
        this.handleNextSlide = this.handleNextSlide.bind(this);
        this.handlePreviousSlide = this.handlePreviousSlide.bind(this);
        this.renderProgressDots = this.renderProgressDots.bind(this);
        this.renderSlide = this.renderSlide.bind(this);
        this.handleNUXClickFalse = this.handleNUXClickFalse.bind(this);
    }

    handlePreviousSlide() {
        let newOffset = this.state.offset - 1;
        if (newOffset < 0) {
            newOffset = this.numSlides;
        }
        this.setState({offset: newOffset});
    }

    handleNextSlide() {
        let newOffset = this.state.offset + 1;
        if (newOffset > this.numSlides) {
            newOffset = 0;
        }
        this.setState({offset: newOffset});
    }

    handleNUXClickFalse() {
        this.props.dispatch(toggleVisibilityNUX(false));
    }

    renderProgressDots(slide, index) {
        if (this.state.offset === index) {
            return (
                <div className={style.progressDotActive} key={index}></div>
            );
        } else {
            return (
                <div className={style.progressDotInactive} key={index}></div>
            );
        }
    }

    renderSlide(item, index) {
        const slideStyle = this.state.offset === index ? style.active : style.inactive;      
        return (
            <div  key={index}>
                { item.type === 'video' ? (
                    <video controls autoPlay src={item.src} className={slideStyle}/>
                ): (
                    <img src={item.src} className={slideStyle}/>
                )}
            </div>
        );
    }

    render() {
        this.numSlides = imageUrls.length - 1;
        return(
            <div className={style.NUXCarousel}>
                <div className={style.NUXCarousel_items}>
                    <div className={style.NUXCarousel_controls_close}>
                        <input type="image" className={style.btnClose} onClick={this.handleNUXClickFalse} src={chrome.extension.getURL('img/exit.png')}/>
                    </div>
                    <div className={style.slideContent}>
                        {imageUrls.map(this.renderSlide)}
                    </div>
                    <div className={style.NUXCarousel_controls_prev}>
                        <button className={style.btnPrevious} onClick={this.handlePreviousSlide}>previous</button>
                    </div>
                    <div className={style.NUXCarousel_dotsWrapper}>
                        {imageUrls.map(this.renderProgressDots)}
                    </div>
                    <div className={style.NUXCarousel_controls_next}>
                        <button className={style.btnNext} onClick={this.handleNextSlide}>next</button>
                    </div>                    
                </div>
            </div>
        );
    }
}


export default NUXCarousel;







