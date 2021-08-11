import React, { Component } from 'react';
import mqtt from 'mqtt'
import ParameterDataTable from './Cards/ParameterDataTable';
import { notification } from 'antd';



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
      setTimeout(() => {
        this.openNotificationWithIcon('success')
        this.props.setStatus(true)
      }, 29000);
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
   }, 30000);
  }

 openNotificationWithIcon = type => {
  notification[type]({
    message: 'Connected',
  });
};

  componentWillUnmount() {
    if (this.client) {
      this.client.end()
    }
  }


  render() {

    return (
      <React.Fragment>        
        {Object.entries(this.state.data)?.length ? <ParameterDataTable data={this.state.data} /> : 
          <div>
            <img style={{
              margin: '0 auto'
            }} src='spinner.png' />
        </div> }
      </React.Fragment>
    );
  }
}

export default MqttSerailPort;
