import React from 'react';
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import SettingsView from '../SettingsView/SettingsView';
import SourceCodeView from '../SourceCodeView/SourceCodeView';

class App extends React.Component {

  state= { activeTab: 'settingsTab' }

  onTabChange = (id) => {
    this.setState({ activeTab: id})
  }

  render() {
    return (
      <div className="App">
        <Header activeTab={this.state.activeTab} onTabChange={this.onTabChange} />
        <Main>
          {this.state.activeTab === 'settingsTab' ? <SettingsView /> : <SourceCodeView />}
        </Main>
      </div>
    );
  }
}

export default App;
