/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import AuthService from 'services/auth.service';
import MachineService from 'services/machine.service';
import { getCookie } from 'utils/cookie';

// layout for page

import Admin from 'layouts/Admin.js';

export default function Index() {
  return (
    <div className='h-screen'>
      <div className='grid grid-flow-col grid-cols-6 grid-rows-3 gap-4 place-items-center'>
        <div className='grid place-items-center'>
          <div
            style={{ background: 'green' }}
            className='w-16 text-xs bg-green-700 text-white h-16 rounded-full  border grid place-items-center'>
            On
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
          <p className='mt-1'>Machine Name</p>
        </div>
        <div className='grid place-items-center'>
          <div className='bg-red-700 w-16 text-xs h-16 rounded-full text-white  border grid place-items-center'>
            Off
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
          <p className='mt-1'>Machine Name</p>
        </div>
        <div className='grid place-items-center'>
          <div
            style={{ background: 'green' }}
            className='w-16 text-xs bg-green-700 text-white h-16 rounded-full  border grid place-items-center'>
            On
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
          <p className='mt-1'>Machine Name</p>
        </div>
        <div className='grid place-items-center'>
          <div className='bg-red-700 w-16 text-xs h-16 rounded-full text-white  border grid place-items-center'>
            Off
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
          <p className='mt-1'>Machine Name</p>
        </div>
        <div className='grid place-items-center'>
          <div
            style={{ background: 'black' }}
            className='w-16 text-xs bg-green-700 text-white h-16 rounded-full  border grid place-items-center'>
            No Signal
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
          <p className='mt-1'>Machine Name</p>
        </div>
        <div className='grid place-items-center'>
          <div className='bg-red-700 w-16 text-xs h-16 rounded-full text-white  border grid place-items-center'>
            Off
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
          <p className='mt-1'>Machine Name</p>
        </div>
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
  const query = context?.query;
  console.log('query', query);
  const token = getCookie('mctoken', context);
  console.log('tokeeeeeeeen', token);
  try {
    const response = await MachineService.getMachineList(query, token);
    const machineList = response?.data;
    console.log('machineList', response);
  } catch (error) {
    const msg =
      error?.response?.data?.message ||
      'Something went working! please try again.';
    console.log('error message ', msg);
  }
  return {
    props: {},
  };
}

Index.layout = Admin;
