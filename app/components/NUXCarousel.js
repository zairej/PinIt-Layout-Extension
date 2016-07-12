import React, { Component, PropTypes } from 'react';
import { updateCarouselOffset } from '../actions/carousel';
import { connect } from 'react-redux';
import style from './NUXCarousel.css';

const numSlides = 3;
const imageUrls = ["https://s-media-cache-ak0.pinimg.com/236x/54/34/af/5434afd59e96dd2213eae12cddf8fee6.jpg", 
    "https://s-media-cache-ak0.pinimg.com/236x/7e/90/ee/7e90ee633207bbd19407465dcb3709f1.jpg", 
    "https://s-media-cache-ak0.pinimg.com/236x/11/ae/19/11ae19cbd78cfc8aa787abfe48b3a615.jpg"];
class NUXCarousel extends Component{
    constructor(){
        super();
        this.state = {offset: 0};
        this.handleNextSlide = this.handleNextSlide.bind(this);
        this.handlePreviousSlide = this.handlePreviousSlide.bind(this);
        this.renderProgressDots = this.renderProgressDots.bind(this);
        this.renderSlide = this.renderSlide.bind(this);

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


    // setOffset (offset) {
    //     this.props.dispatch(updateCarouselOffset(offset));
    // }

    renderProgressDots(slide, index) {
        // const suffix = (index === this.props.offset) ? 'active' : 'inactive';
        // const className = `NUXCarousel_progressDot--${suffix}`;
        // return (<div className={className} key={index}></div>);

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
        //debugger;
        //2 or 3 ===? VVV
        if (this.state.offset === index) {
            return (
                <div>
                    <img src={item} className={style.active} key={index}/>
                </div>
            );
        } else {
            return (
                <div>
                    <img src={item} className={style.inactive} key={index}/>
                </div>
            );
        }

    }

    render() {
        //PUT ICON HERE FOR SKIPPING SLIDES
        // const arrowImg = P.staticFileUrls.get(
        //     'webapp/style/app/common/images/partner_homepage/carousel_arrow_icon.svg'
        // );

        // const { imageUrls } = this.state;

        //added this line to fix console log slide number VV
        this.numSlides = imageUrls.length - 1;
        return(
            <div className={style.NUXCarousel}>
                <div className={style.NUXCarousel_items}>
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


// NUXCarousel.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   offset: PropTypes.number,

//   })).isRequired,
// };

// NUXCarousel.defaultProps = { offset: 0 };
// NUXCarousel.defaultProps = { dispatch: 0 };

// function mapStatetoProps(state) {
//     return { offset: state.NUXCarousel.offset };
// }

// export default connect(mapStatetoProps)(NUXCarousel);

export default NUXCarousel;







