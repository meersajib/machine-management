import { parseCookies, setCookie, destroyCookie } from 'nookies';

const saveCookie = (name, value, day) => {
  setCookie(null, name, value, {
    maxAge: day * 24 * 60 * 60,
    path: '/',
  });
};

const getCookie = (name, context = null) => {
  const cookies = parseCookies(context, name);
  return cookies[name];
};

const deleteCookie = (name, context = null) => {
  destroyCookie(context, name);
};

const deleteAllCookie = () => {
  destroyCookie(null, 'mctoken');
  destroyCookie(null, 'mcuser');
  destroyCookie(null, 'mcgroups');
};

export { saveCookie, getCookie, deleteCookie,deleteAllCookie };
