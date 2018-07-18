import React, {Component} from 'react';
import socketIOClient from 'socket.io-client';
import ReactTable from "react-table";
import 'react-table/react-table.css';

/**
 * Dashboard component of the page. It contains data grid with data from drone back-end.
 * @author Sergiy Koyev
 */
class Dashboard extends Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      response : [],
      endpoint : 'http://127.0.0.1:8000'
    };
  }

  componentDidMount(){
    const {endpoint} = this.state;
    const socket     = socketIOClient(endpoint);
    socket.on("DroneData", data => this.setState({response:data}));
  }

  render(){
    const {response} = this.state;
    var spanStyle = {
      fontWeight: 'bold',
      color: '#ff0000'
    };

    return(
      <div className="row">
        <ReactTable
                  data={response}
                  columns={[
                    {
                      Header: "Drone Status Dashboard",
                      columns: [
                        {
                          Header: "Drone #",
                          style:{"textAlign":"center"},
                          accessor: "id"
                        },
                        {
                          Header: "Location",
                          id: "location",
                          style:{"textAlign":"center"},
                          accessor: d => d.location
                        },
                        {
                          Header: "Status",
                          id: "changed",
                          style:{"textAlign":"center"},
                          accessor: d => d.changed === "false" ? <span style={spanStyle}>Location Data Has not been changed since last status check !!!</span> : ''
                        }
                      ]
                    }
                  ]}
                  defaultPageSize={10}
                  className="-striped -highlight col-md-12"
                />
          </div>
    );
  }
}

export default Dashboard;
