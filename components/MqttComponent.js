import React, { Component } from 'react';
import mqtt from 'mqtt';

class MqttComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    this.client = mqtt.connect('mqtt://172.104.163.254:8083');
    this.client.options.username = 'shafik';
    this.client.options.password = 'shafik';
    this.client.on('connect', () => {
      console.log('connected');
      this.client.subscribe('machine/+');
    });
    this.client.on('message', (topic, message) => {
      this.handleJsonMessage(topic, message.toString());
    });
  }

  handleJsonMessage = (topic, message) => {
    const machine_no = topic.split('/')[1];
    let new_data = this.state.data;
    new_data[machine_no] = message;
    this.setState({ data: new_data });
  };

  componentWillUnmount() {
    if (this.client) {
      this.client.end();
    }
  }

  render() {
    console.log('state data: ', this.state.data);
    return (
      <div>
        <h1>Data: </h1>
        {Object.keys(this.state.data).map((key, index) => (
          <p key={index}>
            machine: {key}, Data: {this.state.data[key]}!
          </p>
        ))}
      </div>
    );
  }
}

export default MqttComponent;
