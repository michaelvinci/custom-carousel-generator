import React from 'react';
import Fieldset from './Fieldset';
import FormControl from '../FormControl/FormControl';
import Carousel from '../../Carousel';
import { connect } from 'react-redux';
import { fetchImages, storeRef } from '../../actions';

class PreviewFieldset extends React.Component {
  constructor(props) {
    super(props);
    this.state = { query: '', quantity: 5 }
    this.carousel = React.createRef();

    this.props.fetchImages(this.randomizeQuery(), this.state.quantity);
  }

  handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value
    switch (name) {
      case 'unsplashQuery':
        this.setState({ query: value })
        break;
      case 'unsplashQuantity':
        this.setState({ quantity: value });
        break;
      default:
    }
  }

  formSubmit = (e) => {
    e.preventDefault();
    this.props.fetchImages(this.state.query, this.state.quantity);
    this.setState({ query: '' })
  }

  randomizeQuery() {
    const queryArr = ['puppies', 'kittens', 'parrots', 'ocean', 'mountains', 'tropical', 'sailboat', 'dragonfly', 'coral', 'tiger', 'wolf' ];
    const randomize = Math.floor(Math.random() * queryArr.length);
    return queryArr[randomize];
  }

  carouselInstantiator(prevProps) {
    if (prevProps.imageSources !== this.props.imageSources
      || this.props.instanceOptions.autoplay !== prevProps.instanceOptions.autoplay
      || this.props.instanceOptions.transition !== prevProps.instanceOptions.transition) {
        new Carousel(this.props.namespace, this.props.imageSources, this.props.instanceOptions);
        this.props.storeRef(this.carousel.current);
      }
  }

  componentDidUpdate(prevProps) {
      this.carouselInstantiator(prevProps)
  }

  render() {
    return (
      <Fieldset heading="Preview" styles="preview">
        <div className="preview__wrapper">
          <h3 className="preview__sub-heading">Test your customized Carousel with the Unsplash API</h3>
          <div className="preview__search-form">
            <FormControl
              type="text"
              id="unsplashQuery"
              placeholder="Search for new images"
              styles="preview__search-input"
              value={this.state.query}
              handleChange={this.handleChange}
            />
            <div>
              <FormControl
                type="select"
                id="unsplashQuantity"
                label="Quantity"
                options={[ '1', '2', '3', '4', '5', '6', '7', '8', '9', '10' ]}
                value={this.state.quantity}
                handleChange={this.handleChange}
              />
              <button onClick={this.formSubmit} className="preview__submit-btn">Submit</button>
            </div>
          </div>
          <div id={this.props.namespace} className="carousel" ref={this.carousel}></div>
        </div>
      </Fieldset>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    imageSources: state.imageSources,
    namespace: state.settings.carouselNamespace,
    instanceOptions: state.instanceOptions
  };
}

export default connect(mapStateToProps, { fetchImages, storeRef })(PreviewFieldset);
