import { parseCookies, setCookie, destroyCookie } from 'nookies';

const saveCookie = (name, value, day) => {
  setCookie(null, name, value, {
    maxAge: day * 24 * 60 * 60,
    path: '/',
  });
};

const getCookie = (name) => {
  const cookies = parseCookies(name);
  console.log({ cookies });
};

const deleteCookie = (name) => {
  destroyCookie(null, name);
};

export { saveCookie, getCookie, deleteCookie };
