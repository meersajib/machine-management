import React, { useState } from 'react';
import UserDropdown from 'components/Dropdowns/UserDropDown';

export default function Navbar(props) {
  const { setNavbarOpen, navbarOpen } = props;

  return (
    <>
      <nav className='bg-blueGray-700 top-0 sticky z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg'>
        <div className='w-full px-4 mx-auto flex flex-wrap items-center justify-between'>
          <div>
            <button
              className='cursor-pointer text-xl leading-none px-1 rounded bg-transparent block outline-none focus:outline-none'
              type='button'
              onClick={() => setNavbarOpen(!navbarOpen)}>
              <i className='text-white fas fa-bars'></i>
            </button>
          </div>

          <div>
            <UserDropdown />
          </div>
        </div>
      </nav>
    </>
  );
}
