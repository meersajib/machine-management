import React, { Component, Fragment } from 'react';
import mqtt from 'mqtt';
import styles from './MqttComponent.module.css';


class MqttComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      macnines: [],
      spinner: false,
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
      let time = new Date().toLocaleString(undefined, {
    day:    'numeric',
    month:  'numeric',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
});
      this.handleJsonMessage(topic, message.toString(),time);
      console.log(`topic ${topic} message ${message} time ${time}`);
    });
   
  }

  handleJsonMessage = (topic, message,time) => {
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
    // this.setState({ machines: this.props.machineList });
    // this.setState({ machines: [...this.state.machines, ...[1,2,3] ] })   
  };

  componentWillUnmount() {
    if (this.client) {
      this.client.end();
    }
  }
  render() {
    return (
      <Fragment>
        {this.props?.machineList?.length ? (
          <React.Fragment>
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
                <p>No: {machine?.machine_no}</p>
                {machine?.update_time ? <p>Updated : {machine?.update_time}</p> : null}
                <p>Name: {machine?.name}</p>
              </div>
            ))}
            </div>
            {this.props.loadMore ? 
              <button onClick={this.props.fetchData.bind(this)}>Load More...</button> : null
          }
            </React.Fragment>
        ) : null}
      </Fragment>
    );
  }
}

export default MqttComponent;
