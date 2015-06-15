// App.js

// Styles
import '../css/App.scss';

// Lib Dependencies
import React from 'react';

// Components
import Nav from './Nav'
import Content from './Content'

class App extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="App row small-collapse">
        <Nav />
        <Content />
      </div>
    );
  }
}


export default App;
