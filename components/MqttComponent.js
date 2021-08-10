import React, { Component, Fragment } from 'react';
import mqtt from 'mqtt';
import styles from './MqttComponent.module.css';
import { notification } from 'antd';



class MqttComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      macnines: [],
      spinner: false,
      connectionStatus: false
    };
  }



  componentDidMount() {
    this.client = mqtt.connect(process.env.NEXT_PUBLIC_MQT);
    this.client.options.username = process.env.NEXT_PUBLIC_USERNAME;
    this.client.options.password = process.env.NEXT_PUBLIC_USERNAME;
    this.client.on('connect', () => {
      console.log('connected');
      setTimeout(() => {
        this.openNotificationWithIcon('success')
      }, 29000);
      this.client.subscribe('machine/+');
    });
    this.client.on('message', (topic, message) => {
      let time = new Date().toLocaleString(undefined, {
    day:    'numeric',
    month:  'numeric',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
});
      this.handleJsonMessage(topic, message.toString(),time);
      // console.log(`topic ${topic} message ${message} time ${time}`);
    });
   
  }

  handleJsonMessage = (topic, message,time) => {
    setTimeout(() => {
    const machine_no = topic.split('/')[1];
    // const update_time = 1;
    let new_data = this.state.data;
    new_data[machine_no] = message;
    this.setState({ data: new_data });
    console.log('dataaaaaaaa',this.state.data)
      this.props.machineList
      .filter((num) => num.machine_no == machine_no)
      .map((machine_item) => {
        machine_item.status = message;
        machine_item.update_time = time;
      });
      this.setState({ machines: this.props.machineList });
    }, 30000);
     this.props.dispatch({
      type: this.props.actionTypes.SET_CONNECTION_STATUS,
      connectionStatus: true,
    })

  };

openNotificationWithIcon = type => {
  notification[type]({
    message: 'Connected',
  });
};

  componentWillUnmount() {
    if (this.client) {
      this.client.end();
    }
  }
  render() {
    return (
      <Fragment>
          <div className={styles.grid_container}>
            {this.props?.machineList?.map((machine, index) => (
              <div key={index} className={styles.machine_container}>
                <div
                  className={`${styles.status_circle} ${
                    machine?.status == `on`
                      ? styles.on_circle
                      : machine?.status == `off`
                      ? styles.off_circle
                      : styles.no_signal
                  }`}>
                  {machine?.status ? machine?.status : `No Signal`}
                </div>
                <p>M/C No: {machine?.machine_no}</p>
                {machine?.update_time ? <p>Updated At : {machine?.update_time}</p> : null}
                <p>Name: {machine?.name}</p>
              </div>
            ))}
            </div>
      </Fragment>
    );
  }
}

export default MqttComponent;
