import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { message } from 'antd';
import { useRouter } from 'next/router';
import { Image } from 'antd';


// layout for page

import Auth from 'layouts/Auth.js';

// import service file
import AuthService from 'services/auth.service';

const Login = () => {
	const router = useRouter();

  const { register,handleSubmit,formState: { errors }} = useForm();

  const onSubmit = async (payload) => {
    const key = 'login';
    message.loading({ content: 'Loading...', key });

    try {
      const response = await AuthService.validate(payload);
      const data = response?.data;

      if (response?.success && data.token) {
        data.username = payload?.username;
        AuthService.login(data);

        router.push('/');

        message.success({ content: 'Successfully login!', key, duration: 2 });
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        'Something went working! please try again.';
      message.error({ content: msg, key, duration: 2 });
    }
  };

	useEffect(() => {
		router.prefetch('/')
	})

  return (
    <>
      <div className='container mx-auto px-4 h-full'>
        <div className='flex content-center items-center justify-center h-full'>
          <div className='w-full lg:w-4/12 px-4 text-center'>
            <Image
              preview={false}
              width={100}
              src="logo.png"
            />
            <h4 className='text-white active:bg-blueGray-600 text-sm font-bold uppercase mt-3 mb-3' style={{fontSize: '16px'}}>Welcome to HTEC Machine Management Dashboard</h4>
            <div className='relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0'>
              <div className='rounded-t mb-0 px-6 py-6'>
                <div className='text-center mb-3'>
                  <h6 className='text-blueGray-500 text-sm font-bold'>Login</h6>
                </div>
                <hr className='mt-6 border-b-1 border-blueGray-300' />
              </div>
              <div className='flex-auto px-4 lg:px-10 py-10 pt-0'>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'>
                      User Name
                    </label>
                    <input
                      type='text'
                      {...register(`username`, { required: true })}
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='User Name'
                    />
                  </div>

                  <div className='relative w-full mb-3'>
                    <label
                      className='block uppercase text-blueGray-600 text-xs font-bold mb-2'
                      htmlFor='grid-password'>
                      Password
                    </label>
                    <input
                      type='password'
                      {...register(`password`, { required: true })}
                      className='border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150'
                      placeholder='Password'
                    />
                  </div>
                  {/* <div>
                    <label className='inline-flex items-center cursor-pointer'>
                      <input
                        id='customCheckLogin'
                        type='checkbox'
                        className='form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150'
                      />
                      <span className='ml-2 text-sm font-semibold text-blueGray-600'>
                        Remember me
                      </span>
                    </label>
                  </div> */}

                  <div className='text-center mt-6'>
                    <button
                      className='text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150'
                      style={{
                        backgroundColor: '#000000'
                      }}
                      type='submit'>
                      Sign In
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Login.layout = Auth;

export default Login;
