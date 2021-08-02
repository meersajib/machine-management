import React from "react";

import Sidebar from "components/Sidebar/Sidebar.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";
import Navbar from "components/Navbars/AuthNavbar"

export default function Admin({ children }) {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-blueGray-100">
			<Navbar  fixed/>
        <div className="md:container px-4 md:px-10 mx-auto w-full p-5">
          {children}
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
