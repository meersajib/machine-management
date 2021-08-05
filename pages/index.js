/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie } from 'utils/cookie';
import mqtt from 'mqtt';

// layout for page

import Admin from 'layouts/Admin.js';
import MqttComponent from 'components/MqttComponent';

export default function Index(props) {
  const token = getCookie('mctoken');
  const [machineList, setMachineList] = useState(props?.machines);

  let machines = [];

  useEffect(async () => {
    try {
      const response = await MachineService.getMachineList(token);
      setMachineList(response?.data);
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Something went working! please try again.';
      console.log('error message ', msg);
    }
  }, []);

  return (
    <div className='h-screen'>
      <MqttComponent machineList={machineList} />
    </div>
  );
}

export async function getServerSideProps(context) {
  const isAuthenticated = AuthService.isAuthorized(context);
  if (!isAuthenticated) {
    return {
      redirect: { destination: '/login', permanent: false },
    };
  }

  return {
    props: {},
  };
}

Index.layout = Admin;
