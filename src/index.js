import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Header from './components/header'
import Footer from './components/footer'
import Dashboard from './components/dashboard'
import ControlPanel from './components/control-panel'

import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props, context) {
    super(props, context);
  }

  render(){
    return(
      <div className="container">
        <Header/>
        <ControlPanel/>
        <Dashboard/>
        <Footer/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
