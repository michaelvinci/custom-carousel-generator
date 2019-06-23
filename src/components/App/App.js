import React from 'react';
import Header from '../Header/Header';
import SettingsView from '../SettingsView/SettingsView';
import SourceCodeView from '../SourceCodeView/SourceCodeView';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state= { activeTab: 'settingsTab' }
    this.cssRules = [];
  }

  onTabChange = (id) => {
    this.setState({ activeTab: id})
  }

  cacheCssRules() {
    const [stylesheet] = [...document.styleSheets].filter(val => val.title === 'carousel');
    this.cssRules = [...stylesheet.cssRules || stylesheet.rules];
  }

  componentDidMount() {
    this.cacheCssRules()
  }

  render() {
    return (
      <>
        <Header activeTab={this.state.activeTab} onTabChange={this.onTabChange} />
        <main>
          <SettingsView visibility={this.state.activeTab === "settingsTab" ? '' : 'removed'}/>
          <SourceCodeView visibility={this.state.activeTab === "settingsTab" ? 'removed' : ''} cssCode={this.cssRules} />
        </main>
      </>
    );
  }
}

export default App;
