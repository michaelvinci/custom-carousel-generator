import React from 'react';
import CodeBlock from './CodeBlock';
import { connect } from 'react-redux';


class SourceCodeView extends React.Component {
  state = { carouselSrc: '', customSrc: '', staticSrc: '' }

  updateInstanceCode() {
    if (Object.keys(this.props.instanceOptions).length > 0) {
      const stringEntries = Object.entries(this.props.instanceOptions).map(val => `${val[0]}: '${val[1]}'`).join(', ');
      return `new Carousel(\n\t${this.props.carouselNamespace},\n\t[yourImageArrayHere],\n\t{ ${stringEntries} }\n)`;
    }
    return `new Carousel(${this.props.carouselNamespace}, [yourImageArrayHere])`;
  }

  formatRules(selector) {
    const filteredRules = this.props.cssCode.filter((val) => {
      let rules;
      if (val.selectorText) {
        rules =  val.selectorText.startsWith(selector) && !val.selectorText.includes('image-attribution');
      }
      if (val.cssRules) {
        rules =  val.cssRules[0].selectorText.startsWith(selector) && !val.cssRules[0].selectorText.includes('image-attribution');
      }
      return rules;
    });

    const formattedRules = filteredRules.map((val) => {
      if (val.media) {
        const splitRule = val.cssText.split('\n');
        splitRule[1] = `\t${splitRule[1].trim().replace(/{ /g, '{\n\t\t').replace(/; (?!})/g, ';\n\t\t').replace(/ }/g, '\n\t}')}`;
        return `${splitRule.slice(0, -1).join('\n')}\n${splitRule[splitRule.length - 1]}`;
      }
      return val.cssText.replace(/{ /g, '{\n\t').replace(/; (?!})/g, ';\n\t').replace(/ }/g, '\n}');
    }).join('\n\n');

    return formattedRules;
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ carouselSrc: window.CarouselSrc.toString().split('\n').filter(val => !val.includes('FILTER_LINES')).join('\n') });
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cssCode !== this.props.cssCode) {
      this.setState({ staticSrc: this.formatRules('.carousel') });
    }

    if (prevProps.cssCode !== this.props.cssCode || prevProps.customRules !== this.props.customRules) {
      this.setState({ customSrc: this.formatRules(`#${this.props.carouselNamespace}`)});
    }
  }

  render() {
    const htmlCode = `<div id="${this.props.carouselNamespace}" class="carousel"></div>`;
    return (
      <div id="sourceCodeView" role="tabpanel" aria-labelledby="sourceCodeTab" className={`source-code__view ${this.props.visibility}`}>
        <CodeBlock heading="HTML" code={htmlCode} />
        <CodeBlock heading="JS Carousel Instance" code={this.updateInstanceCode()} />
        <CodeBlock heading="Carousel Class" code={this.state.carouselSrc} />
        <CodeBlock heading="Custom CSS" code={this.state.customSrc} />
        <CodeBlock heading="Static CSS" code={this.state.staticSrc} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    carouselNamespace: state.settings.carouselNamespace,
    instanceOptions: state.instanceOptions,
    customRules: state.customRules
  }
}

export default connect(mapStateToProps)(SourceCodeView);
