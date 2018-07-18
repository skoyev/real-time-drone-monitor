import React, {Component} from 'react';

/**
 * Header component of the page.
 * @author Sergiy Koyev
 */
class Header extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      message : 'Techical Task: NodeJS/ReactJS Real-Time Drone Simulator Application'
    };
  }

  render(){
    const {message} = this.state;
    return(
      <div className="row"><h2>{message}</h2></div>
    );
  }
}

export default Header;
