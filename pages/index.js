/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, Fragment } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie,deleteAllCookie } from 'utils/cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import mqtt from 'mqtt';
import styles from 'components/MqttComponent.module.css';


// layout for page

import Admin from 'layouts/Admin.js';
import MqttComponentFun from 'components/MqttComponentFun';

export default function Index() {
	const token = getCookie('mctoken');
	const [machineList, setMachineList] = useState([]);
	const [spinner, setSpinner] = useState(true);
	const [loadMore, setLodMore] = useState(false);
	const [page, setPage] = useState(1);


	const router = useRouter();
	useEffect(() => {
		const authorized = AuthService.isAuthorized('/');
		if (!authorized) {
			deleteAllCookie();
			router.push('/login');
		}
		// console.log('authorized', authorized);
	})

	const fetchData = async () => {
		setPage(page + 1)
		// console.log('clickeddddddd')
		// console.log('page',page)
		try {
			const response = await MachineService.getMachineList(token,page);
			setMachineList((machineList) => [...machineList,...response?.data]);
			setSpinner(false);
			// console.log('responseeeeeee', response)
			if (response.meta_data.next != null) {
				setLodMore(true)
			} else {
				setLoadMore(false)
			}
		} catch (error) {
			const msg =
				error?.response?.data?.message ||
				'Something went working! please try again.';
			console.log('error message ', msg);
		}
	}

	useEffect(async () => {
		fetchData()
	}, []);
  // console.log('machineList',machineList)

	// =========================================
	  const [data, setData] = useState({})
	const [machines, setMachines] = useState([])
	const [renderMe,setRenderMe] = useState(false)
  


  useEffect(() => {
    let client = mqtt.connect('mqtt://172.104.163.254:8083');
    // console.log('cliennnnnnnnnnnnt',client)
    client.options.username = 'shafik';
    client.options.password = 'shafik';
    client.on('connect', () => {
      console.log('connected');
      client.subscribe('machine/+');
    });
    client.on('message', (topic, message) => {
    let time = new Date().toLocaleString(undefined, {
    day:    'numeric',
    month:  'numeric',
    year:   'numeric',
    hour:   '2-digit',
    minute: '2-digit',
});
      handleJsonMessage(topic, message.toString(),time);
      console.log(`topic ${topic} message ${message} time ${time}`);
    });
    
      
    // closeClient(client)
    // setRenderMe(!renderMe)
  }, [machineList])
  
  const closeClient = (client) => {
    if (client) {
      client.end()
    }
  }
  
    const handleJsonMessage = (topic, message,time) => {
    const machine_no = topic.split('/')[1];
    machineList
      .filter((num) => num.machine_no == machine_no)
      .map((machine_item) => {
        machine_item.status = message;
        machine_item.update_time = time;
			});
			setRenderMe(!renderMe)
	};
	

	// =========================================
	console.log('machineList',machineList)
	return (
		<div className='h-screen'>
			{machineList?.length ? (
				// <MqttComponentFun machineList={machineList} page={page} setPage={setPage} fetchData={fetchData} loadMore={loadMore} />
				 <Fragment>
          <div className={styles.grid_container}>
            {machineList?.map((machine, index) => (
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
            {loadMore ? 
              <button onClick={fetchData.bind(this)}>Load More...</button> : null
          }
      </Fragment>
			) : (
				// <div>
				<Spin spinning={spinner} size={'default'} className={`bg-white m-`} />
				// </div>
			)}
		</div>
	);
}

Index.layout = Admin;
