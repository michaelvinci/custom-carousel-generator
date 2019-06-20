class Carousel {
  constructor(id, imageArray, {
    autoplay, aspectRatio, imageSize, transition, indicatorBar
  } = {}) {
    this.dom = {};
    this.imageArray = imageArray;

    this.settings = {
      autoplay: autoplay || null,
      aspectRatio: aspectRatio || '4:3',
      imageSize: imageSize || 'contain',
      transition: transition || 'horizontal',
      indicatorBar: indicatorBar || 'interior'
    };

    this.state = {
      id,
      quantity: 0,
      slidesArr: [],
      isSliding: false,
      direction: '',
      currentImage: {},
      currentMarker: null,
    };

    this.viewport = {};

    this.touchCtrls = {
      slideOffset: {
        top: null,
        bottom: null,
        left: null,
        right: null
      },
      viewmasterFactor: null,
      startX: null,
      startY: null,
      distX: null,
      distY: null,
      startD: null,
      duration: null,
      slides: [],
      scheduledAnimationFrame: false
    };

    this.rafManager = this.rafManager.bind(this);

    this.init(this.imageArray);
  }

  init() {
    // inject carousel html into dom
    this.createCarouselElements();

    // cache carousel elements from dom
    this.dom.carousel = document.querySelector(`#${this.state.id}.carousel`);
    this.dom.leftControl = this.dom.carousel.querySelector('.carousel__controls--left');
    this.dom.rightControl = this.dom.carousel.querySelector('.carousel__controls--right');
    if (this.settings.indicatorBar !== 'off') {
      this.dom.indicatorBar = this.settings.indicatorBar === 'interior'
        ? this.dom.carousel.querySelector('.carousel__indicator-bar--interior')
        : this.dom.carousel.querySelector('.carousel__indicator-bar--exterior');
    }

    this.dom.viewport = this.dom.carousel.querySelector('.carousel__viewport');
    this.dom.viewportWrapper = this.dom.carousel.querySelector('.carousel__viewport-wrapper');

    // bind controller events
    this.dom.leftControl.addEventListener('mousedown', this.backward.bind(this));
    this.dom.rightControl.addEventListener('mousedown', this.forward.bind(this));
    this.dom.carousel.addEventListener('keydown', this.keyDownControls.bind(this));

    // bind touch events
    this.dom.viewportWrapper.addEventListener('touchstart', this.rafManager, false);
    this.dom.viewportWrapper.addEventListener('touchend', this.rafManager, false);

    if (this.imageArray) this.buildCarousel();
  }

  rafManager(e) {
    e.preventDefault();
    switch (e.type) {
      case 'touchmove':
        if (this.touchCtrls.scheduledAnimationFrame) return;
        this.touchCtrls.scheduledAnimationFrame = true;
        requestAnimationFrame(() => {
          this.touchMoveRenders(e);
        });
        break;
      case 'touchend':
        requestAnimationFrame(() => {
          this.touchEndRenders(e);
        });
        break;
      default:
        requestAnimationFrame(() => {
          this.touchStartRenders(e);
        });
    }
  }

  createCarouselElements() {
    const carouselElements = `
      <div class="carousel__viewport-wrapper">
        <button type="button" class="carousel__controls carousel__controls--left">
          <div class="carousel__focus-ring"></div>
          <div class="carousel__controls-background carousel__controls-background--arrow"></div>
          <svg class="carousel__icon-left" viewBox="0 0 62.826 169.29">
            <g transform="translate(370.32 -123.05)">
              <path
                d="m-312.54 287.28c-52.709-78.69-52.709-78.69-52.709-78.69m52.709-80.481c-52.747 80.11-52.747 80.11-52.747 80.11"
                style="fill:none;stroke-linecap:round;stroke-width:10"
              />
            </g>
          </svg>
        </button>
        <button type="button" class="carousel__controls carousel__controls--right">
          <div class="carousel__focus-ring"></div>
          <div class="carousel__controls-background carousel__controls-background--arrow"></div>
          <svg class="carousel__icon-right" viewBox="0 0 62.826 169.29">
            <g transform="translate(370.32 -123.05)">
              <path
                d="m-365.28 287.28c52.709-78.69 52.709-78.69 52.709-78.69m-52.709-80.481c52.747 80.11 52.747 80.11 52.747 80.11"
                style="fill:none;stroke-linecap:round;stroke-width:10"
              />
            </g>
          </svg>
        </button>
        ${this.settings.indicatorBar === 'interior' ? `
          <div class="carousel__indicator-bar carousel__indicator-bar--interior">
            <div class="carousel__controls-background carousel__controls-background--indicator"></div>
          </div>
        ` : ''}

        <div class="carousel__viewport"></div>
      </div>
        ${this.settings.indicatorBar === 'exterior' ? '<div class="carousel__indicator-bar carousel__indicator-bar--exterior"></div>' : ''}
    `;
    document.getElementById(this.state.id).innerHTML = carouselElements;
  }

  buildCarousel() {
    // update quantity
    this.state.quantity = this.imageArray.length;

    // clear and build slides
    while (this.dom.viewport.firstChild) {
      this.dom.viewport.removeChild(this.dom.viewport.firstChild);
    }
    this.buildSlides();

    // push img nodelist into slidesArr as objects with id and pos
    this.state.slidesArr = [];
    for (let i = 0; i < this.state.quantity; i++) {
      this.state.slidesArr.push({ id: i, pos: i });
    }

    // remove controls for single image display
    if (this.state.quantity === 1) {
      this.dom.leftControl.classList.add('hidden');
      this.dom.rightControl.classList.add('hidden');
      if (this.dom.indicatorBar) this.dom.indicatorBar.classList.add('hidden');
      return;
    }
    this.dom.leftControl.classList.remove('hidden');
    this.dom.rightControl.classList.remove('hidden');

    if (this.dom.indicatorBar) {
      this.dom.indicatorBar.classList.remove('hidden');

      // clear and build indicatorBar
      if (this.dom.indicatorBar.contains(document.querySelector('.carousel__indicator-wrapper'))) {
        this.dom.indicatorBar.removeChild(document.querySelector('.carousel__indicator-wrapper'));
      }
      this.buildindicatorBar();
    }

    // render default positioning
    this.initialRender();
  }

  buildSlides() {
    let imageReel = '';
    this.imageArray.forEach((el) => {
      const attribution = el.auth ? `<span class="carousel__image-attribution">Photo by <a href="${el.profile}?utm_source=deluxe_image_carousel&utm_medium=referral">${el.auth}</a> on <a href="https://unsplash.com/?utm_source=deluxe_image_carousel&utm_medium=referral">Unsplash</a></span>` : ''; // FILTER_LINES
      const slideString = `
      <div class="carousel__slide-container">
        ${attribution} ${'' /* FILTER_LINES */}
        <div class="carousel__slide-wrapper">
          <img class="carousel__slide" src="${el.url}" alt="${el.alt}">
          <div class="carousel__slide-overlay"></div>
        </div>
      </div>
      `;
      imageReel += slideString;
    });
    this.dom.viewport.insertAdjacentHTML(
      'beforeend',
      imageReel,
    );

    this.dom.slideContainers = [...this.dom.carousel.querySelectorAll('.carousel__slide-container')];

    this.dom.slides = this.dom.slideContainers.map(val => ({
      wrapper: val.querySelector('.carousel__slide-wrapper'),
      img: val.querySelector('.carousel__slide')
    }));

    this.dom.slides.forEach((val) => {
      const poll = setInterval(() => {
        if (val.img.naturalWidth) {
          clearInterval(poll);
          this.addOrientationStyles(val);
        }
      }, 10);
    });
  }

  addOrientationStyles(slide) {
    const imgAspectRatioQuotient = (slide.img.naturalWidth / slide.img.naturalHeight).toFixed(2);
    const viewAspectRatioQuotient = (() => {
      const [x, y] = this.settings.aspectRatio.split(':').map(el => parseInt(el, 10));
      return (x / y).toFixed(2);
    })();

    if (this.settings.imageSize === 'contain') {
      if (imgAspectRatioQuotient > viewAspectRatioQuotient) {
        slide.wrapper.classList.add('carousel__slide-wrapper--landscape');
        const wrapperHeight = (viewAspectRatioQuotient / imgAspectRatioQuotient) * 100;
        slide.wrapper.style.height = `${wrapperHeight}%`;
      } else if (imgAspectRatioQuotient < viewAspectRatioQuotient) {
        slide.wrapper.classList.add('carousel__slide-wrapper--portrait');
        const wrapperWidth = (imgAspectRatioQuotient / viewAspectRatioQuotient) * 100;
        slide.wrapper.style.width = `${wrapperWidth}%`
      } else {
        slide.wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
      }
    } else if (imgAspectRatioQuotient > viewAspectRatioQuotient) {
      slide.wrapper.classList.add('carousel__slide-wrapper--portrait');
      const wrapperWidth = (imgAspectRatioQuotient / viewAspectRatioQuotient) * 100;
      slide.wrapper.style.width = `${wrapperWidth}%`
    } else if (imgAspectRatioQuotient < viewAspectRatioQuotient) {
      slide.wrapper.classList.add('carousel__slide-wrapper--landscape');

      const wrapperHeight = (viewAspectRatioQuotient / imgAspectRatioQuotient) * 100;
      slide.wrapper.style.height = `${wrapperHeight}%`;
    } else {
      slide.wrapper.classList.add('carousel__slide-wrapper--landscape', 'carousel__slide-wrapper--portrait');
    }
  }

  buildindicatorBar() {
    const indicatorMarker = '<div class="carousel__indicator-marker"></div>';
    let indicatorString = '';
    for (let i = 0; i < this.state.quantity; i++) {
      indicatorString += indicatorMarker;
    }
    const indicatorWrapper = `
      <div class="carousel__indicator-wrapper">
        ${indicatorString}
      </div>`;
    this.dom.indicatorBar.insertAdjacentHTML(
      'beforeend',
      indicatorWrapper,
    );
    document.querySelector('.carousel__indicator-wrapper').addEventListener('click', this.jumpToMarker.bind(this));
    this.dom.indicatorMarkers = [...document.querySelectorAll('.carousel__indicator-marker')];
  }

  updateindicatorBar() {
    if (this.state.currentMarker) {
      this.state.currentMarker.classList.remove('carousel__indicator-marker--active');
    }
    this.state.currentMarker = this.dom.indicatorMarkers[this.state.slidesArr[1].id];
    this.state.currentMarker.classList.add('carousel__indicator-marker--active');
  }

  initialRender() {
    this.state.slidesArr.forEach((el) => {
      el.pos === this.state.quantity - 1 ? el.pos = 0 : el.pos += 1;
    });
    this.sortImageArray();
    this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
    this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
    if (this.state.quantity > 2) {
      for (let i = 2; i < this.state.quantity; i++) {
        this.dom.slideContainers[this.state.slidesArr[i].id].classList.add('hide');
        this.dom.slideContainers[this.state.slidesArr[i].id].classList.add('queue');
      }
    }
    if (this.dom.indicatorBar) this.updateindicatorBar();

    if (this.settings.autoplay) {
      this.initializeAutoplay();
    }
  }

  initializeAutoplay() {
    let autoplay = setInterval(() => {
      this.forward();
    }, this.settings.autoplay);

    this.dom.viewportWrapper.addEventListener('mouseenter', () => {
      clearInterval(autoplay);
    });
    this.dom.viewportWrapper.addEventListener('mouseleave', () => {
      autoplay = setInterval(() => {
        this.forward();
      }, this.settings.autoplay);
    });
    this.dom.viewportWrapper.addEventListener('touchstart', () => {
      clearInterval(autoplay);
    });
    this.dom.viewportWrapper.addEventListener('touchend', () => {
      autoplay = setInterval(() => {
        this.forward();
      }, this.settings.autoplay);
    });
  }

  jumpToMarker(e) {
    let jumpAmount;
    let jumpInterval;
    let jumpTicker = 1;
    if (e.target.classList.contains('carousel__indicator-marker')) {
      this.dom.slideContainers.forEach(el => el.classList.add('carousel__slide-container--jumper'));

      jumpAmount = this.dom.indicatorMarkers.indexOf(e.target) - this.dom.indicatorMarkers.indexOf(this.state.currentMarker);

      if (jumpAmount > 0) {
        this.forward(e);
        jumpInterval = setInterval(function () {
          if (jumpTicker === jumpAmount) {
            clearInterval(jumpInterval);
            this.dom.slideContainers.forEach(el => el.classList.remove('carousel__slide-container--jumper'));
            return;
          }
          this.forward(e);
          jumpTicker++;
        }.bind(this), 75);
      } else {
        jumpAmount = jumpAmount * -1;
        this.backward(e);
        jumpInterval = setInterval(function () {
          if (jumpTicker === jumpAmount) {
            clearInterval(jumpInterval);
            this.dom.slideContainers.forEach(el => el.classList.remove('carousel__slide-container--jumper'));
            return;
          }
          this.backward(e);
          jumpTicker++;
        }.bind(this), 75);
      }
    }
  }

  touchStartRenders(e) {
    this.viewport = this.dom.viewportWrapper.getBoundingClientRect();

    if (this.settings.transition === 'viewmaster' || this.settings.transition === 'horizontal') {
      this.touchCtrls.slideOffset.left = this.viewport.left - this.viewport.width;
      this.touchCtrls.slideOffset.right = this.viewport.left + this.viewport.width;
    }
    if (this.settings.transition === 'vertical') {
      this.touchCtrls.slideOffset.top = this.viewport.top - this.viewport.height;
      this.touchCtrls.slideOffset.bottom = this.viewport.top + this.viewport.height;
    }
    if (this.settings.transition === 'viewmaster') {
      this.touchCtrls.viewmasterFactor = (this.viewport.height / 2) / this.viewport.width;
    }
    this.touchCtrls.slides = [
      this.dom.slideContainers[this.state.slidesArr[0].id],
      this.dom.slideContainers[this.state.slidesArr[1].id],
      this.dom.slideContainers[this.state.slidesArr[2].id]
    ];
    const d = new Date();
    this.touchCtrls.startD = d.getTime();
    const touchobj = e.touches[0];
    this.touchCtrls.startX = parseInt(touchobj.clientX, 10);
    this.touchCtrls.startY = parseInt(touchobj.clientY, 10);
    if (this.settings.transition !== 'dissolve') {
      this.touchCtrls.slides.forEach((val) => {
        val.classList.add('carousel__slide-container--no-trans');
        val.classList.remove('hide');
      });
    }

    this.dom.viewportWrapper.addEventListener('touchmove', this.rafManager, false);
  }

  touchMoveRenders(e) {
    let viewportWidth; let viewportHeight;
    const touch = this.touchCtrls;
    const touchobj = e.touches[0];
    if (document.elementFromPoint(touchobj.clientX, touchobj.clientY) !== e.target) {
      touch.scheduledAnimationFrame = false;
      requestAnimationFrame(() => {
        this.touchEndRenders(e);
      });
      return;
    }
    if (this.viewport.width) {
      viewportWidth = parseFloat(this.viewport.width.toFixed(1));
    }
    if (this.viewport.height) {
      viewportHeight = parseFloat(this.viewport.height.toFixed(1));
    }
    if (this.settings.transition !== 'vertical') {
      touch.distX = parseInt(touchobj.clientX, 10) - touch.startX;
    }
    switch (this.settings.transition) {
      case 'viewmaster':
        if (touch.distX > 0) {
          touch.slides[1].style.transform = `translate(${touch.distX}px, ${touch.distX * touch.viewmasterFactor}px)`;
        } else {
          touch.slides[1].style.transform = `translate(${touch.distX}px, ${touch.distX * -touch.viewmasterFactor}px)`;
        }
        if (touch.slideOffset.left + touch.distX >= touch.slideOffset.left) {
          touch.slides[0].style.transform = `translate(${touch.distX - viewportWidth}px, ${(viewportHeight * 0.5) - (touch.distX * touch.viewmasterFactor)}px)`;
        } else {
          touch.slides[0].style.transform = null;
        }
        if (touch.slideOffset.right + touch.distX <= touch.slideOffset.right) {
          touch.slides[2].style.transform = `translate(${viewportWidth + touch.distX}px, ${(viewportHeight * 0.5) + (touch.distX * touch.viewmasterFactor)}px)`;
        } else {
          touch.slides[2].style.transform = null;
        }
        break;
      case 'vertical':
        touch.distY = parseInt(touchobj.clientY, 10) - touch.startY;
        touch.slides[1].style.transform = `translate(0, ${touch.distY}px)`;
        if (touch.slideOffset.top + touch.distY >= touch.slideOffset.top) {
          touch.slides[0].style.transform = `translate(0, ${touch.distY - viewportHeight}px)`;
        } else {
          touch.slides[0].style.transform = null;
        }
        if (touch.slideOffset.bottom + touch.distY <= touch.slideOffset.bottom) {
          touch.slides[2].style.transform = `translate(0, ${viewportHeight + touch.distY}px)`;
        } else {
          touch.slides[2].style.transform = null;
        }
        break;
      case 'dissolve':
        break;
      default:
        touch.slides[1].style.transform = `translate(${touch.distX}px, 0)`;
        if (touch.slideOffset.left + touch.distX >= touch.slideOffset.left) {
          touch.slides[0].style.transform = `translate(${touch.distX - viewportWidth}px, 0)`;
        } else {
          touch.slides[0].style.transform = null;
        }
        if (touch.slideOffset.right + touch.distX <= touch.slideOffset.right) {
          touch.slides[2].style.transform = `translate(${viewportWidth + touch.distX}px, 0)`;
        } else {
          touch.slides[2].style.transform = null;
        }
    }
    touch.scheduledAnimationFrame = false;
  }

  touchEndRenders(e) {
    this.dom.viewportWrapper.removeEventListener('touchmove', this.rafManager, false);

    const dist = this.settings.transition === 'vertical'
      ? this.touchCtrls.distY
      : this.touchCtrls.distX;
    const threshold = this.settings.transition === 'vertical'
      ? this.viewport.height * 0.4
      : this.viewport.width * 0.4;

    this.touchCtrls.slides.forEach((val) => {
      val.classList.remove('carousel__slide-container--no-trans');
      val.style.transform = null;
    });
    const d = new Date();
    this.touchCtrls.duration = d.getTime() - this.touchCtrls.startD;
    if (this.touchCtrls.duration < 200 && Math.abs(dist) > 70) {
      if (this.settings.transition !== 'dissolve') {
        this.touchCtrls.slides.forEach((val) => {
          val.classList.add('carousel__slide-container--flick-trans');
        });
      }
      if (dist > 0) this.backward(e);
      if (dist < 0) this.forward(e);
    } else if (Math.abs(dist) > threshold) {
      if (dist > 0) this.backward(e);
      if (dist < 0) this.forward(e);
    }

    // reset all touchCtrls
    this.touchCtrls.distX = null;
    this.touchCtrls.distY = null;
    [...Object.keys(this.touchCtrls.slideOffset)].forEach((val) => {
      this.touchCtrls.slideOffset[val] = null;
    });
  }

  backwardRender() {
    if (this.state.quantity === 2) {
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.add('prev');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('queue');

      setTimeout(function () {
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('prev');
      }.bind(this), 1);
    } else {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');

      this.dom.slideContainers[this.state.slidesArr[0].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('prev');
      this.dom.slideContainers[this.state.slidesArr[2].id].classList.add('queue');
    }
  }

  forwardRender() {
    if (this.state.quantity === 2) {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('prev');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.add('queue');

      setTimeout(function () {
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
        this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('queue');
      }.bind(this), 1);
    } else {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('hide');
      this.dom.slideContainers[this.state.slidesArr[1].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[this.state.quantity - 1].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[this.state.quantity - 1].id].classList.add('queue');
      this.dom.slideContainers[this.state.slidesArr[this.state.quantity - 1].id].classList.remove('prev');
    }
  }

  backward(e) {
    if (e) {
      if (!e.target.classList.contains('carousel__indicator-marker')) {
        if (e.type === 'mousedown' && e.buttons !== 1) return;
        e.preventDefault();
        if (this.state.isSliding) return;
        this.state.isSliding = true;
        this.state.direction = 'backward';
      }
    }

    // adding handler to current slide will disable controls during animation
    this.state.currentImage = this.dom.slideContainers[this.state.slidesArr[1].id];
    this.boundSliderTransitionend = this.sliderTransitionend.bind(this);
    this.state.currentImage.addEventListener('transitionend', this.boundSliderTransitionend);

    // update, sort, and render new positions
    this.state.slidesArr.forEach((el) => {
      el.pos === this.state.quantity - 1 ? el.pos = 0 : el.pos += 1;
    });
    this.sortImageArray();
    this.backwardRender();
  }

  forward(e) {
    if (e) {
      if (!e.target.classList.contains('carousel__indicator-marker')) {
        if (e.type === 'mousedown' && e.buttons !== 1) return;
        e.preventDefault();
        if (this.state.isSliding) { return; }
        this.state.isSliding = true;
        this.state.direction = 'forward';
      }
    }

    // adding handler to current slide will disable controls during animation
    this.state.currentImage = this.dom.slideContainers[this.state.slidesArr[1].id];
    this.boundSliderTransitionend = this.sliderTransitionend.bind(this);
    this.state.currentImage.addEventListener('transitionend', this.boundSliderTransitionend);

    // update, sort, and render new positions
    this.state.slidesArr.forEach((el) => {
      el.pos === 0 ? el.pos = this.state.quantity - 1 : el.pos -= 1;
    });
    this.sortImageArray();
    this.forwardRender();
  }

  sliderTransitionend() {
    this.state.isSliding = false;
    if (this.state.quantity === 2 && this.state.direction === 'backward') {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.remove('queue');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('prev');
    }
    if (this.state.quantity === 2 && this.state.direction === 'forward') {
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('hide');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.remove('prev');
      this.dom.slideContainers[this.state.slidesArr[0].id].classList.add('queue');
    }
    this.touchCtrls.slides.forEach(val => val.classList.remove('carousel__slide-container--flick-trans'));
    if (this.dom.indicatorBar) this.updateindicatorBar();
    this.state.currentImage.removeEventListener('transitionend', this.boundSliderTransitionend);
  }

  keyDownControls(e) {
    if (!e.target.classList.contains('carousel__controls')) return;
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
      e.preventDefault();
      if (e.target.classList.contains('carousel__controls--left')) {
        this.backward(e);
      } else {
        this.forward(e);
      }
    }
    if (e.key === 'ArrowLeft' || e.key === 'Left') {
      this.dom.leftControl.focus();
      this.backward(e);
    }
    if (e.key === 'ArrowRight' || e.key === 'Right') {
      this.dom.rightControl.focus();
      this.forward(e);
    }
  }

  sortImageArray() {
    function compare(a, b) {
      if (a.pos < b.pos) return -1;
      if (a.pos > b.pos) return 1;
      return 0;
    }
    this.state.slidesArr.sort(compare);
  }
}

export default Carousel;

window.CarouselSrc = Carousel;
