import React, { Component } from 'react';
import mqtt from 'mqtt'
import { Table, Tag, Space } from 'antd';



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
    console.log('topic',topic)
    console.log('message',message)
    const machine_no = topic.split("/")[1];
    let new_data =this.state.data;
    new_data[machine_no] = message;
    this.setState({data: new_data});
  }

    columns = [
  {
    title: 'Topic Name',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Data',
    dataIndex: 'age',
    key: 'age',
    },
  ]
 
  tableData = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
  },
  ];
  t
 

  componentWillUnmount() {
    if (this.client) {
      this.client.end()
    }
  }


  render() {
    console.log("state data: ", this.state.data);
    return (
      <div>
        <Table columns={this.columns} dataSource={this.state.data} />
        
          <h1>Data: </h1>
          {Object.keys(this.state.data).map((key, index) => (
              <p key={index}>machine: {key}, Data: {this.state.data[key]}!</p>
          ))}
        </div>
    );
  }
}

export default MqttSerailPort;
