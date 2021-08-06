import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getCookie } from 'utils/cookie';

export default function Sidebar(props) {
  const { navbarOpen } = props;
  const usergroups = getCookie('mcgroups');
  const groups = usergroups?.split(',');

  const [collapseShow, setCollapseShow] = React.useState('hidden');
  const router = useRouter();

  return (
    <>
      <nav
        className='md:left-64 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-blueGray-600 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6'
        style={{
          transition: `all .3s`,
          left: navbarOpen ? `-16rem` : `0`,
          // width: navbarOpen ? `0` : `16rem`,
        }}>
        <div className='md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto'>
          <Link href='/'>
            <a className='md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-2 px-0'>
              Machine Management
            </a>
          </Link>

          <div
            className={
              'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ' +
              collapseShow
            }>
            {/* Collapse header */}
            <div className='md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200'>
              <div className='flex flex-wrap'>
                <div className='w-6/12'>
                  <Link href='/'>
                    <a className='md:block text-left md:pb-2 text-white mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0'>
                      Machine Management
                    </a>
                  </Link>
                </div>
                <div className='w-6/12 flex justify-end'>
                  <button
                    type='button'
                    className='cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent'
                    onClick={() => setCollapseShow('hidden')}>
                    <i className='fas fa-times'></i>
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <hr className='my-2 md:min-w-full' />

            <ul className='md:flex-col md:min-w-full flex flex-col list-none'>
              <li className='items-center'>
                <Link href='/'>
                  <a
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname === '/'
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-white hover:text-blueGray-500')
                    }>
                    <i
                      className={
                        'fas fa-tv mr-2 text-sm ' +
                        (router.pathname === '/'
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }></i>{' '}
                    Dashboard
                  </a>
                </Link>
              </li>

              <li className='items-center'>
                <Link href='/machine-data'>
                  <a
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/machine-data') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-white hover:text-blueGray-500')
                    }>
                    <i
                      className={
                        'fas fa-tools mr-2 text-sm ' +
                        (router.pathname.indexOf('/machine-data') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }></i>{' '}
                    Machine Data
                  </a>
                </Link>
              </li>

              <li className='items-center'>
                <Link href='analytics'>
                  <a
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/analytics') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-white hover:text-blueGray-500')
                    }>
                    <i
                      className={
                        'fas fa-table mr-2 text-sm ' +
                        (router.pathname.indexOf('/analytics') !== -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }></i>{' '}
                    Analytics
                  </a>
                </Link>
              </li>

              <li className='items-center'>
                <Link href='offline-online-devices'>
                  <a
                    className={
                      'text-xs uppercase py-3 font-bold block ' +
                      (router.pathname.indexOf('/offline-online-devices') !== -1
                        ? 'text-lightBlue-500 hover:text-lightBlue-600'
                        : 'text-white hover:text-blueGray-500')
                    }>
                    <i
                      className={
                        'fas fa-map-marked mr-2 text-sm ' +
                        (router.pathname.indexOf('/offline-online-devices') !==
                        -1
                          ? 'opacity-75'
                          : 'text-blueGray-300')
                      }></i>{' '}
                    offline online devices
                  </a>
                </Link>
              </li>

              {groups?.includes('Maintainer') ? (
                <li className='items-center'>
                  <Link href='#'>
                    <a
                      className={
                        'text-xs uppercase py-3 font-bold block ' +
                        (router.pathname.indexOf('/admin/maps') !== -1
                          ? 'text-lightBlue-500 hover:text-lightBlue-600'
                          : 'text-white hover:text-blueGray-500')
                      }>
                      <i
                        className={
                          'fas fa-map-marked mr-2 text-sm ' +
                          (router.pathname.indexOf('/admin/maps') !== -1
                            ? 'opacity-75'
                            : 'text-blueGray-300')
                        }></i>{' '}
                      Parameter Data
                    </a>
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
