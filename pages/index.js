/* eslint-disable react/jsx-no-target-blank */
import React from 'react';
import AuthService from 'services/auth.service';
// layout for page

import Admin from 'layouts/Admin.js';

export default function Index() {
  return (
    <div className='h-screen'>
      <div className='grid grid-flow-col grid-cols-6 grid-rows-3 gap-4 place-items-center'>
        <div className='grid place-items-center'>
          <div
            style={{ background: 'green' }}
            className='w-12 bg-green-700 text-white h-12 rounded-full  border grid place-items-center'>
            On
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
        </div>
        <div className='grid place-items-center'>
          <div className='bg-red-700 w-12 h-12 rounded-full text-white  border grid place-items-center'>
            Off
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
        </div>
        <div className='grid place-items-center'>
          <div
            style={{ background: 'green' }}
            className='w-12 bg-green-700 text-white h-12 rounded-full  border grid place-items-center'>
            On
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
        </div>
        <div className='grid place-items-center'>
          <div className='bg-red-700 w-12 h-12 rounded-full text-white  border grid place-items-center'>
            Off
          </div>
          <p>M2</p>
        </div>
        <div className='grid place-items-center'>
          <div
            style={{ background: 'green' }}
            className='w-12 bg-green-700 text-white h-12 rounded-full  border grid place-items-center'>
            On
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
        </div>
        <div className='grid place-items-center'>
          <div className='bg-red-700 w-12 h-12 rounded-full text-white  border grid place-items-center'>
            Off
          </div>
          <button className='700 p-1 px-2 border border-gray-500 mt-1'>
            M2
          </button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  console.log('hello wor');
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
