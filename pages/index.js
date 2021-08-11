/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, Fragment } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie,deleteAllCookie } from 'utils/cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { Empty } from 'antd';





// layout for page

import Admin from 'layouts/Admin.js';
import MqttComponent from 'components/MqttComponent';
import { useStatus } from 'Context/StatusContext';

export default function Index() {
	const token = getCookie('mctoken');
	const [machineList, setMachineList] = useState([]);
	const [spinner, setSpinner] = useState(true);
	const [noData, setNoData] = useState(false)
	const [status,setStatus] = useState(false)

	


	const router = useRouter();
  const {setConnected} = useStatus()
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

		} catch (error) {
			const msg =
				error?.response?.data?.message ||
				'Something went working! please try again.';
			console.log('error message ', msg);

			setNoData(true)
			if (msg == `Signature has expired.`) {
			deleteAllCookie();
			router.push('/login');
			}
		}
	}

	useEffect(async () => {
		fetchData()
	}, []);
 

	if (status) {
		setConnected(true)
	} else {
		setConnected(false)
	}

	return (
		<div className='h-screen'>
			{!noData ? <div style={{alignItems: 'center'}}>
				{machineList?.length ? (
				<MqttComponent setStatus={setStatus} machineList={machineList} />
			) : (
					<div style={{
						display: 'grid',
						gridTemplate: '1fr',
						alignItems: 'center',
						justifyContent: 'center'
				}}>
				<img style={{margin: '0 auto'}} src='spinner.png' />
				 </div>
			)}
			</div> : <Empty /> }
		</div>
	);
}

Index.layout = Admin;
