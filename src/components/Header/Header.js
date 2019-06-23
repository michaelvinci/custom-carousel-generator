import React from 'react';

class Header extends React.Component {
  renderTabs() {
    const tabs = [
      {id: 'settingsTab', text: 'Settings', controls: 'settingsView' },
      {id: 'sourceCodeTab', text: 'Source Code', controls: 'sourceCodeView'}
    ]
    return tabs.map((tab) => {
      return (
        <li
          key={tab.id}
          className={this.props.activeTab === tab.id ? 'tab-nav__item tab-nav__item--active' : 'tab-nav__item'}
        >
          <button
            id={tab.id}
            onClick={this.props.onTabChange.bind(this, tab.id)}
            role="tab"
            aria-selected={this.props.activeTab === tab.id}
            aria-controls={tab.controls}
            className={this.props.activeTab === tab.id ? 'tab-nav__btn tab-nav__btn--active' : 'tab-nav__btn'}>{tab.text}
          </button>
        </li>
      );
    })
  }

  render() {
    return (
      <header className="banner">
        <h1 className="banner__heading">Custom Carousel Generator</h1>
        <nav className="tab-nav">
          <ul role="tablist" className="tab-nav__list">
            {this.renderTabs()}
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
