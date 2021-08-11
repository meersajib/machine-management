/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie,deleteAllCookie } from 'utils/cookie';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { Empty } from 'antd';

// layout for page

import Admin from 'layouts/Admin.js';
import MqttSerialPort from 'components/MqttSerialPort';
import { useStatus } from 'Context/StatusContext';

export default function Index() {
  const router = useRouter();
  const token = getCookie('mctoken');
  const url = `api/v1/machines`;
  const [noData, setNoData] = useState(false)
  const [status, setStatus] = useState(false);

  const {setConnected,connected} = useStatus()
  const [machineList, setMachineList] = useState([]);
  const [spinner, setSpinner] = useState(true);

	useEffect(() => {
		const authorized = AuthService.isAuthorized('/parameter-data');
		if(!authorized) {
			deleteAllCookie();
			router.push('/login');
    }
    // console.log('authorized', authorized);
	})

  useEffect(async () => {
    try {
      const response = await MachineService.getMachineList(token,url);
      setMachineList(response?.data);
      setSpinner(false);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Something went working! please try again.';
      console.log('error message ', msg);
      deleteAllCookie();
			router.push('/login');

    }
  }, []);
  

  useEffect(() => {
    if (status) {
    setConnected(true);
  } else {
    setConnected(false)
  }
},[])


  return (
    <div className='h-screen'>
        {!noData ?  <MqttSerialPort setStatus={setStatus} machineList={machineList} /> : <Empty /> }
    </div>
  );
}

Index.layout = Admin;
