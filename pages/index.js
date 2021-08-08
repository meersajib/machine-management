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
  const [loadMore, setLodMore] = useState(false)
  const [current,setCurrent] = useState(1)

  
  
  

  const fetchData = async () => {
    setCurrent(current + 1)
    console.log('clickedddddddddddd')
 try {
      const response = await MachineService.getMachineList(token,current);
      setMachineList((machineList) => [...machineList,...response?.data]);
   setSpinner(false);
   console.log('responseeeeeee',response)
      if (response.meta_data.next != null) {
        setLodMore(true)
      } else {
        setLoadMore(false)
          }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Something went working! please try again.';
      console.log('error message ', msg);
    }
  }
  
  useEffect(async () => {
   fetchData()
  }, []);
  return (
    <div className='h-screen'>
      {machineList?.length ? (
        <MqttComponent machineList={machineList} fetchData={fetchData} loadMore={loadMore} />
      ) : (
        // <div>
        <Spin spinning={spinner} size={'default'}  className={`bg-white m-`} />
        // </div>
      )}
    </div>
  );
}

Index.layout = Admin;
