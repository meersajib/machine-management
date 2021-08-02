/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";
import AuthService from 'services/auth.service'
// layout for page

import Admin from "layouts/Admin.js";

export default function Hello() {
  return (
    <>
			<div className="flex flex-wrap">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardLineChart />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardBarChart />
        </div>
      </div>
      <div className="flex flex-wrap mt-4">
        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
          <CardPageVisits />
        </div>
        <div className="w-full xl:w-4/12 px-4">
          <CardSocialTraffic />
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
	console.log('hello wor');
  const isAuthenticated = AuthService.isAuthorized(context)
  if(!isAuthenticated){
  	return {
  		redirect:{ destination:'/login',permanent: false }
  	}
  }

	return { 
		props:{}
	}
}

Hello.layout= Admin;