import { useState } from 'react';

import Sidebar from 'components/Sidebar/Sidebar.js';
import FooterAdmin from 'components/Footers/FooterAdmin.js';
import Navbar from 'components/Navbars/AuthNavbar';

export default function Admin({ children }) {
  const [navbarOpen, setNavbarOpen] = useState(false);

  return (
    <>
      <Sidebar navbarOpen={navbarOpen} />
      <div
        className={`relative bg-blueGray-100 ${
          !navbarOpen ? `md:ml-64` : `md:ml-0`
        }`}
        style={{ transition: `all .3s` }}>
        <Navbar setNavbarOpen={setNavbarOpen} navbarOpen={navbarOpen} fixed />
        <div className='md:container px-4 md:px-10 mx-auto w-full p-5'>
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
