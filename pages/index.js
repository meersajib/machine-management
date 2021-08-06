/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie } from 'utils/cookie';
import { Spin } from 'antd';
// layout for page

import Admin from 'layouts/Admin.js';
import MqttComponent from 'components/MqttComponent';

export default function Index() {
  const token = getCookie('mctoken');
  const [machineList, setMachineList] = useState([]);
  const [spinner, setSpinner] = useState(true);

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
        <MqttComponent machineList={machineList} />
      ) : (
        // <div>
        <Spin spinning={spinner} size={'default'} className={`bg-white m-`} />
        // </div>
      )}
    </div>
  );
}

Index.layout = Admin;
