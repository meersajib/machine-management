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
    this.client.options.username = process.env.NEXT_PUBLIC_USERNAME;
    this.client.options.password = process.env.NEXT_PUBLIC_USERNAME;
    this.client.on('connect', () => {
      console.log('connected');
      this.client.subscribe('machine/+');
    });
    this.client.on('message', (topic, message) => {
      this.handleJsonMessage(topic, message.toString());
      // console.log(`topic ${topic} message ${message}`);
    });
  }

  handleJsonMessage = (topic, message) => {
    console.log('topic', topic)
    console.log('message',message)
    const machine_no = topic.split('/')[1];
    let new_data = this.state.data;
    new_data[machine_no] = message;
    this.setState({ data: new_data });
    this.props.machineList
      .filter((num) => num.machine_no == machine_no)
      .map((machine_item) => {
        machine_item.status = message;
      });
    this.setState({ machines: this.props.machineList });
  };

  componentWillUnmount() {
    if (this.client) {
      this.client.end();
    }
  }
  render() {
    return (
      <Fragment>
        {this.state.machines?.length ? (
          <React.Fragment>
          <div className={styles.grid_container}>
            {this.state.machines?.map((machine, index) => (
              <div key={index} className={styles.machine_container}>
                <div
                  className={`${styles.status_circle} ${
                    machine?.status == `on`
                      ? styles.on_circle
                      : machine?.status == `off`
                      ? styles.off_circle
                      : styles.no_signal
                  }`}>
                  {machine?.status}
                </div>
                <p>{machine?.machine_no}</p>
                <p>{machine?.name}</p>
              </div>
            ))}
            </div>
            {console.log('tttttttttt',this.props)}
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
