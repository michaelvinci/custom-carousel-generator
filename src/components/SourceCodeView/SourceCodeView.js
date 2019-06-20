import React from 'react';


class SourceCodeView extends React.Component {
  state = { carouselSrc: null }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ carouselSrc: window.CarouselSrc.toString().split('\n').filter(val => !val.includes('FILTER_LINES')).join('\n') })
    })
  }

  render() {
    return (
      <div className={this.props.visibility}>Source Code Content
        <pre>
          <code>
          {this.state.carouselSrc}
          </code>
        </pre>
      </div>
    );
  }
}

export default SourceCodeView;
