/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie } from 'utils/cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
// layout for page

import Admin from 'layouts/Admin.js';
import MqttSerialPort from 'components/MqttSerialPort';

export default function Index() {
  const router = useRouter();
  const token = getCookie('mctoken');

  const [machineList, setMachineList] = useState([]);
  const [spinner, setSpinner] = useState(true);

	const router = useRouter();
	useEffect(() => {
		const authorized = AuthService.isAuthorized('/paremeter-data');
		if(!authorized) {
			deleteAllCookie();
			router.push('/login');
		}
		console.log('authorized', authorized);
	})

  useEffect(async () => {
    try {
      const response = await MachineService.getMachineList(token);
      setMachineList(response?.data);
      setSpinner(false);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Something went working! please try again.';
      console.log('error message ', msg);
    }
  }, []);

  return (
    <div className='h-screen'>
      {machineList?.length ? (
        <MqttSerialPort machineList={machineList} />
      ) : (
        <Spin spinning={spinner} size={'default'} className={`bg-white m-`} />
      )}
    </div>
  );
}

Index.layout = Admin;
