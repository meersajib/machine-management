import React, { Component } from 'react';
import mqtt from 'mqtt'
import ParameterDataTable from './Cards/ParameterDataTable';


class MqttSerailPort extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }



  componentDidMount() {
    this.client = mqtt.connect('mqtt://172.104.163.254:8083');
    this.client.options.username = 'shafik';
    this.client.options.password = 'shafik';
    this.client.on("connect", () => {
      console.log("connected");
      this.client.subscribe("htec/+");
    });
    this.client.on('message', (topic, message) => {
      this.handleJsonMessage(topic, message.toString());
    })
  }

  handleJsonMessage = (topic, message) => {
    const machine_no = topic.split("/")[1];
    let new_data =this.state.data;
    new_data[machine_no] = message;
    this.setState({data: new_data});
  }

 

  componentWillUnmount() {
    if (this.client) {
      this.client.end()
    }
  }


  render() {

    return (
      <React.Fragment>        
          <ParameterDataTable data={this.state.data} />
        </React.Fragment>
    );
  }
}

export default MqttSerailPort;
