/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, Fragment } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie,deleteAllCookie } from 'utils/cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { useDataApi } from 'utils/data.hooks';




// layout for page

import Admin from 'layouts/Admin.js';
import MqttComponent from 'components/MqttComponent';

export default function Index() {
	const token = getCookie('mctoken');
	const [machineList, setMachineList] = useState([]);
	const [spinner, setSpinner] = useState(true);
	


	const router = useRouter();
	useEffect(() => {
		const authorized = AuthService.isAuthorized('/');
		if (!authorized) {
			deleteAllCookie();
			router.push('/login');
		}
		// console.log('authorized', authorized);
	})
	
	const url = `api/v1/machines`;

	const fetchData = async () => {
		// console.log('clickeddddddd')
		// console.log('page',page)
		try {
			const response = await MachineService.getMachineList(token,url);
			setMachineList((machineList) => [...machineList,...response?.data]);
			setSpinner(false);
			// console.log('responseeeeeee', response)
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
				<MqttComponent machineList={machineList} />
			) : (
					<div style={{
						display: 'grid',
						gridTemplate: '1fr',
						alignItems: 'center',
						justifyContent: 'center'
				}}>
				<Spin spinning={spinner} size={'default'} className={`bg-white m-`} />
				 </div>
			)}
		</div>
	);
}

Index.layout = Admin;
