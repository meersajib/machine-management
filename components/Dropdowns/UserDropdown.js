import React from "react";
import { createPopper } from "@popperjs/core";
import {deleteCookie} from 'utils/cookie';
import AuthService from "services/auth.service";

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };

  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

	const logout=()=>{
	  AuthService.logout();
		
		location.href = '/login';
	}
  return (
    <>
      <a
        className="text-blueGray-700 block font-bold bg-white px-4 py-2 rounded"
        ref={btnDropdownRef}
        onClick={(e) => {
					e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
				Shafik
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <button
          className={
            "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={(e) =>logout()}
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default UserDropdown;
