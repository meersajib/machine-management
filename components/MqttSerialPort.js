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
    this.client = mqtt.connect(process.env.NEXT_PUBLIC_MQT);
    this.client.options.username = process.env.NEXT_PUBLIC_USERNAME;
    this.client.options.password = process.env.NEXT_PUBLIC_USERNAME;
    this.client.on("connect", () => {
      console.log("connected");
      this.client.subscribe("htec/+");
    });
    this.client.on('message', (topic, message) => {
      this.handleJsonMessage(topic, message.toString());
      console.log(`message ${message.toString()} topic ${topic}`)
    })
  }

  handleJsonMessage = (topic, message) => {
   setTimeout(() => {
    const machine_no = topic.split("/")[1];
    let new_data =this.state.data;
    new_data[machine_no] = message;
    this.setState({data: new_data});
   }, 3000);
  }

 

  componentWillUnmount() {
    if (this.client) {
      this.client.end()
    }
  }


  render() {

    return (
      <React.Fragment>        
        {Object.entries(this.state.data)?.length ? <ParameterDataTable data={this.state.data} /> : <div className='text-center'>
        <img src='spinner.png' />
        </div>}
      </React.Fragment>
    );
  }
}

export default MqttSerailPort;
