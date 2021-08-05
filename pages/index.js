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
  const [machineList, setMachineList] = useState(props?.machines);
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

  const token = getCookie('mctoken', context);

  let machines = [];
  try {
    const response = await MachineService.getMachineList(token);
    machines = response?.data;
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      'Something went working! please try again.';
    console.log('error message ', msg);
  }

  return {
    props: {
      machines,
    },
  };
}

Index.layout = Admin;
