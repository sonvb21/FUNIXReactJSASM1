import React from 'react';
import Main from './StaffList/MainComponent';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Main />
      </div>
    </BrowserRouter>
    );
  }
}

export default App;
