import React from 'react';
import FieldsetAccordion from './FieldsetAccordion';
import FormControlGroup from '../FormControl/FormControlGroup';
import FormControl from '../FormControl/FormControl';
import { connect } from 'react-redux';
import { updateSettings, updateCarouselStyle, addInstanceOption, removeInstanceOption } from '../../actions';

class ImageFieldset extends React.Component {
  constructor(props) {
    super(props);
    this.currentField = null;
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    this.currentField = name;
    this.props.updateSettings({ [name]: value });
  }

  updateStyles(currentField) {
    switch(currentField) {
      case 'imageSize':
        this.awaitImageLoading();
        this.props.imageSize === 'contain'
          ? this.props.removeInstanceOption('imageSize')
          : this.props.addInstanceOption({ imageSize: this.props.imageSize});
        break;
      case 'endCapColor':
        this.updateEndCaps();
        break;
      case 'slideOverlay':
      case 'slideOverlayColor':
      case 'slideOverlayOpacity':
        this.updateSlideOverlay();
        break;
      case 'transitionStyle':
        this.updateTransitionStyle();
        this.props.transitionStyle === 'horizontal'
          ? this.props.removeInstanceOption('transition')
          : this.props.addInstanceOption({ transition: this.props.transitionStyle});
        break;
      default:
    }
    this.currentField = null;
  }

  awaitImageLoading() {
    const viewportAspectRatioQuotient = (this.props.x / this.props.y).toFixed(2);
    const slideWrappers = [...this.props.carouselRef.querySelectorAll('.carousel__slide-wrapper')];
    slideWrappers.forEach((val) => {
      const img = val.querySelector('.carousel__slide');
      const poll = setInterval(() => {
        if (img.naturalWidth) {
          clearInterval(poll);
          this.updateImageSize(val, img, viewportAspectRatioQuotient);
        }
      }, 10);
    });
  }

  updateImageSize(wrapper, img, viewportAspectRatio) {
    const imageAspectRatio = (img.naturalWidth / img.naturalHeight).toFixed(2);
    wrapper.className = 'carousel__slide-wrapper';
    wrapper.style.width = null;
    wrapper.style.height = null;

    if (this.props.imageSize === 'contain') {
      if (imageAspectRatio > viewportAspectRatio) {
        wrapper.classList.add('carousel__slide-wrapper--landscape');
        const wrapperHeight = (viewportAspectRatio / imageAspectRatio) * 100;
        wrapper.style.height = `${wrapperHeight}%`;
      } else if (imageAspectRatio < viewportAspectRatio) {
        wrapper.classList.add('carousel__slide-wrapper--portrait');
        const wrapperWidth = (imageAspectRatio / viewportAspectRatio) * 100;
        wrapper.style.width = `${wrapperWidth}%`;
      } else {
        wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
        img.classList.add('carousel__slide--landscape-contain', 'carousel__slide--portrait-contain');
      }
    } else if (imageAspectRatio > viewportAspectRatio) {
      wrapper.classList.add('carousel__slide-wrapper--portrait');
      const wrapperWidth = (imageAspectRatio / viewportAspectRatio) * 100;
      wrapper.style.width = `${wrapperWidth}%`;
    } else if (imageAspectRatio < viewportAspectRatio) {
      wrapper.classList.add('carousel__slide-wrapper--landscape');
      const wrapperHeight = (viewportAspectRatio / imageAspectRatio) * 100;
      wrapper.style.height = `${wrapperHeight}%`;
    } else {
      wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
      img.classList.add('carousel__slide--landscape-contain', 'carousel__slide--portrait-contain');
    }
  }

  updateEndCaps() {
    this.props.updateCarouselStyle('slideContainer', 'backgroundColor', this.props.endCapColor );
  }

  updateSlideOverlay() {
    if (this.props.slideOverlay) {
      this.props.updateCarouselStyle('slideOverlay', 'display', 'block');
      this.props.updateCarouselStyle('slideOverlay', 'backgroundColor', this.props.slideOverlayColor );
      this.props.updateCarouselStyle('slideOverlay', 'opacity', `${this.props.slideOverlayOpacity / 100}`);
    } else {
      this.props.updateCarouselStyle('slideOverlay', 'display', 'none');
    }
  }

  updateTransitionStyle() {
    switch (this.props.transitionStyle) {
      case 'viewmaster':
        this.props.updateCarouselStyle('slideContainer', 'transition', 'transform 0.3s ease-in');
        this.props.updateCarouselStyle('slidePrev', 'transform', 'translate(-100%, 50%)');
        this.props.updateCarouselStyle('slidePrev', 'opacity', '');
        this.props.updateCarouselStyle('slideQueue', 'transform', 'translate(100%, 50%)');
        this.props.updateCarouselStyle('slideQueue', 'opacity', '');
        break;
      case 'vertical':
        this.props.updateCarouselStyle('slideContainer', 'transition', 'transform 0.3s ease-in');
        this.props.updateCarouselStyle('slidePrev', 'transform', 'translate(0, -100%)');
        this.props.updateCarouselStyle('slidePrev', 'opacity', '');
        this.props.updateCarouselStyle('slideQueue', 'transform', 'translate(0, 100%)');
        this.props.updateCarouselStyle('slideQueue', 'opacity', '');
        break;
      case 'dissolve':
        this.props.updateCarouselStyle('slideContainer', 'transition', 'opacity 0.4s ease-in-out');
        this.props.updateCarouselStyle('slidePrev', 'transform', 'translate(0, 0)');
        this.props.updateCarouselStyle('slidePrev', 'opacity', '0');
        this.props.updateCarouselStyle('slideQueue', 'transform', 'translate(0, 0)');
        this.props.updateCarouselStyle('slideQueue', 'opacity', '0');
        break;
      default:
        this.props.updateCarouselStyle('slideContainer', 'transition', 'transform 0.3s ease-in');
        this.props.updateCarouselStyle('slidePrev', 'transform', 'translate(-100%, 0)');
        this.props.updateCarouselStyle('slidePrev', 'opacity', '');
        this.props.updateCarouselStyle('slideQueue', 'transform', 'translate(100%, 0)');
        this.props.updateCarouselStyle('slideQueue', 'opacity', '');
    }
  }

  shouldComponentUpdate(nextProps) {
    if (this.props.carouselRef !== nextProps.carouselRef) {
     return false;
    }
    return true;
  }

  componentDidUpdate(prevProps) {
    if (this.currentField) this.updateStyles(this.currentField);
    if (this.props.aspectRatio !== prevProps.aspectRatio) this.updateStyles('imageSize');
  }

  render() {
    return (
      <FieldsetAccordion heading="Image" id="image-settings">
        <div className="fieldset__group">
          <FormControlGroup>
            <FormControl
              type="select"
              id="imageSize"
              label="Size"
              options={['contain', 'cover']}
              value={this.props.imageSize}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup>
            <FormControl
              type="color"
              label="End-caps"
              id="endCapColor"
              value={this.props.endCapColor}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
        </div>
        <hr className="fieldset__divider"/>
        <div className="fieldset__group">
          <FormControlGroup>
            <FormControl
              type="checkbox"
              label="Overlay"
              id="slideOverlay"
              value={this.props.slideOverlay}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
          <FormControlGroup isDisabled={!this.props.slideOverlay}>
            <FormControl
              type="color"
              id="slideOverlayColor"
              value={this.props.slideOverlayColor}
              handleChange={this.handleChange}
              isDisabled={!this.props.slideOverlay}
            />
          </FormControlGroup>
          <FormControlGroup isDisabled={!this.props.slideOverlay}>
            <FormControl
              isDisabled={!this.props.slideOverlay}
              type="number"
              label="Opacity"
              styles="number-field--md"
              id="slideOverlayOpacity"
              value={this.props.slideOverlayOpacity}
              handleChange={this.handleChange}
              min="1" max="100" step="1"
            />
          </FormControlGroup>
        </div>
        <hr className="fieldset__divider"/>
        <div className="fieldset__group">
          <FormControlGroup>
            <FormControl
              type="select"
              id="transitionStyle"
              label="Slide Animation"
              options={['horizontal', 'viewmaster', 'vertical', 'dissolve']}
              value={this.props.transitionStyle}
              handleChange={this.handleChange}
            />
          </FormControlGroup>
        </div>
      </FieldsetAccordion>
    );
  }
}

const mapStateToProps = (state) => {
  const [x, y] = state.settings.aspectRatio.split(':').map(val => parseInt(val, 10));
  return {
    imageSize: state.settings.imageSize,
    endCapColor: state.settings.endCapColor,
    slideOverlay: state.settings.slideOverlay,
    slideOverlayColor: state.settings.slideOverlayColor,
    slideOverlayOpacity: state.settings.slideOverlayOpacity,
    transitionStyle: state.settings.transitionStyle,
    aspectRatio: state.settings.aspectRatio,
    x, y,
    carouselRef: state.carouselRef
  }
}

export default connect(
  mapStateToProps,
  { updateSettings, updateCarouselStyle, addInstanceOption, removeInstanceOption }
)(ImageFieldset);
