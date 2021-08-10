/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect, Fragment } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie,deleteAllCookie } from 'utils/cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { Empty } from 'antd';
import { useStateValue } from 'Context/StateProvider';
import { actionTypes } from 'Context/reducer';




// layout for page

import Admin from 'layouts/Admin.js';
import MqttComponent from 'components/MqttComponent';

export default function Index() {
	const token = getCookie('mctoken');
	const [machineList, setMachineList] = useState([]);
	const [spinner, setSpinner] = useState(true);
	const [noData, setNoData] = useState(false)
	const [state,dispatch] = useStateValue()

	


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

		} catch (error) {
			const msg =
				error?.response?.data?.message ||
				'Something went working! please try again.';
			console.log('error message ', msg);
			setNoData(true)
		}
	}

	useEffect(async () => {
		fetchData()
	}, []);


	return (
		<div className='h-screen'>
			{!noData ? <Fragment style={{alignItems: 'center'}}>
				{machineList?.length ? (
				<MqttComponent dispatch={dispatch} actionTypes={actionTypes} machineList={machineList} />
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
			</Fragment> : <Empty /> }
		</div>
	);
}

Index.layout = Admin;
