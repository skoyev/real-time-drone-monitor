import React, {Component} from 'react';
import { Button, Input, Form, Label, FormGroup  } from 'reactstrap';

/**
 * Control panel component of the page. It contains start/stop drone buttons.
 * @author Sergiy Koyev
 */
class ControlPanel extends Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      value : ''
    };

    this.startDrone = this.startDrone.bind(this);
    this.stopDrone = this.stopDrone.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  startDrone(){
    const data = {'droneNum':this.state.value};
    this.sendData('POST', data, 'startDrones');
  }

  stopDrone(){
    this.sendData('POST', {}, 'stopDrones');
  }

  sendData(methodType, data, endpoint){
    fetch(`http://localhost:8000/api/${endpoint}`, {
            method: methodType,
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res;
        }).catch(err => {
          console.log(err);
        });
  }

  render(){
    const {message} = this.state;
    return(
      <div className="row">
        <Form inline>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label for="droneNum" className="mr-sm-2">Enter # Of Drone Simulators:</Label>
            <Input type="number" name="droneNum" id="droneNum" value={this.state.value}
                   placeholder="# simulators" onChange={e => this.setState({ value: e.target.value })}/>
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Button color="primary" onClick={this.startDrone}> Start Drone Simulator </Button>
          </FormGroup>

          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Button color="primary" onClick={this.stopDrone}> Stop Drone Simulator </Button>
          </FormGroup>

        </Form>
      </div>
    );
  }
}

export default ControlPanel;
