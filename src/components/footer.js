import React, {Component} from 'react';
/**
 * Footer component of the page.
 * @author Sergiy Koyev
 */
class Footer extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      message : 'Task Has Been Completed By Sergiy Koyev'
    };
  }

  render(){
    const {message} = this.state;
    var style = {
      textAlign: 'center',
      width: '100%'
    };

    return(
      <div className="row"><h4 style={style}>{message}</h4></div>
    );
  }
}

export default Footer;
