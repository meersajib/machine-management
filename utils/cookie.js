import { parseCookies, setCookie, destroyCookie } from 'nookies';

const saveCookie = (name, value, day) => {
  setCookie(null, name, value, {
    maxAge: day * 24 * 60 * 60,
    path: '/',
  });
};

const getCookie = (name, context = null) => {
  const cookies = parseCookies(context, name);
  // console.log({ cookies });
  return cookies;
};

const deleteCookie = (name, context = null) => {
  console.log('deleteCookie', name);
  destroyCookie(context, name);
};

export { saveCookie, getCookie, deleteCookie };
