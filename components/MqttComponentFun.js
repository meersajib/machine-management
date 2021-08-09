import React, {useState,useEffect, Fragment} from 'react'
import styles from './MqttComponent.module.css';

const MqttComponentFun = (props) => {

  
  return (
    console.log('props.machineList',props.machineList),
    <Fragment>
        {props?.machineList?.length ? (
          <React.Fragment>
          <div className={styles.grid_container}>
            {props?.machineList?.map((machine, index) => (
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
            {props.loadMore ? 
              <button onClick={props.fetchData.bind(this)}>Load More...</button> : null
          }
            </React.Fragment>
        ) : null}
      </Fragment>
  )
}

export default MqttComponentFun
