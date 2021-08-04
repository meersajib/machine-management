/* eslint-disable react/jsx-no-target-blank */
import React, { useState, useEffect } from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie } from 'utils/cookie';
import mqtt from 'mqtt';

// layout for page

import Admin from 'layouts/Admin.js';

export default function Index(props) {
  const { machines } = props;
  const [mqttData, setMqttData] = useState([]);

  useEffect(() => {
    let client = mqtt.connect('mqtt://172.104.163.254:8083');
    client.options.username = 'shafik';
    client.options.password = 'shafik';
    client.on('connect', () => {
      console.log('connected');
      client.subscribe('machine/+');
    });
    client.on('message', (topic, message) => {
      console.log('message', message.toString());
      handleJsonMessage(topic, message.toString());
    });
  }, [mqttData]);

  const handleJsonMessage = (topic, message) => {
    const machine_no = topic.split('/')[1];
    machines
      .filter((no) => no.machine_no == machine_no)
      .map((item, index) => {
        item.status = message;
      });
    let new_data = mqttData;
    new_data[machine_no] = message;
    setMqttData(new_data);
  };

  console.log('machines', machines);
  console.log('mqttData', mqttData);

  return (
    <div className='h-screen'>
      <div className='grid grid-flow-col grid-cols-6 grid-rows-3 gap-4 place-items-center'>
        {machines?.length
          ? machines?.map((machine, index) => (
              <div key={index} className='grid place-items-center'>
                <div
                  style={{
                    background:
                      machine?.status == `on`
                        ? 'green'
                        : machine?.status == `off`
                        ? `red`
                        : `black`,
                  }}
                  className='w-16 text-xs bg-green-700 text-white h-16 rounded-full  border grid place-items-center'>
                  {machine?.status ? machine?.status : `No Signal`}
                </div>
                <button className='700 p-1 px-2 border border-gray-500 mt-1'>
                  {machine?.machine_no}
                </button>
                <p className='mt-1'>{machine?.name}</p>
              </div>
            ))
          : null}
      </div>
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
