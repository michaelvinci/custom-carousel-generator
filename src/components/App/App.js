import React from 'react';
import { connect } from 'react-redux';
import Header from '../Header/Header';
import SettingsView from '../SettingsView/SettingsView';
import SourceCodeView from '../SourceCodeView/SourceCodeView';

import { updateCarouselStyle, updateNamespace } from '../../actions';

class App extends React.Component {

  state= { activeTab: 'settingsTab' }

  onTabChange = (id) => {
    this.setState({ activeTab: id})
  }

  clickTest = (e) => {
    this.props.updateCarouselStyle('arrowPath', 'stroke', 'green');
  }

  updateInputValue = (e) => {
    const namespace = e.target.value ? e.target.value : 'my-carousel';
    this.props.updateNamespace(namespace);
  }

  componentDidMount() {
    // this.props.cacheCssRules('my-carousel');
  }

  render() {

    return (
      <>
        <Header activeTab={this.state.activeTab} onTabChange={this.onTabChange} />
        <main>
          <SettingsView visibility={this.state.activeTab === "settingsTab" ? '' : 'removed'}/>
          <SourceCodeView visibility={this.state.activeTab === "settingsTab" ? 'removed' : ''}/>
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => {

  return {

  }
}

export default connect(mapStateToProps, { updateCarouselStyle, updateNamespace })(App);
