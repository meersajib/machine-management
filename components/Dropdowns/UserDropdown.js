/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState, useEffect } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { deleteAllCookie, getCookie } from 'utils/cookie';
import{message} from 'antd';
import { useRouter } from 'next/router';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function UserDropdown() {
  const router = useRouter();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const userName = getCookie('mcuser');
    setUsername(userName);
  }, []);

  const logout = (e) => {
		const key = 'logout';
    message.loading({ content: 'Signing out...', key });
		e.preventDefault();
    deleteAllCookie();
    router.push(`/login`);
		message.success({ content: 'Successfully logout!', key, duration: 2 });
  };

  return (
    <Menu as='div' className='relative inline-block text-left'>
      {({ open }) => (
        <>
          <div>
            <Menu.Button className='inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'>
              {username}
              <ChevronDownIcon
                className='-mr-1 ml-2 h-5 w-5'
                aria-hidden='true'
              />
            </Menu.Button>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'>
            <Menu.Items
              static
              className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <div className='py-1'>
                <form method='POST' action='#'>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={(e) => logout(e)}
                        className={classNames(
                          active
                            ? 'bg-gray-100 text-gray-900'
                            : 'text-gray-700',
                          'block w-full text-left px-4 py-2 text-sm',
                        )}>
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </form>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}
