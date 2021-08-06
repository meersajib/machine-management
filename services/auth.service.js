import axios from 'axios';
import { parseCookies } from 'nookies';
import { deleteCookie, saveCookie } from 'utils/cookie';
export default class AuthService {
  static async validate(data) {
    const response = await axios.post(
      `http://172.104.163.254:8000/api/v1/users/token/`,
      data,
    );
    console.log('response in service', response);
    return response?.data;
  }

  static login(data) {
    saveCookie('mctoken', data?.token, 1);
    saveCookie('mcuser', data?.username, 1);
    saveCookie('mcgroups', data?.groups, 1);
  }
  static logout(context = null) {
    deleteCookie('mctoken', context);
    deleteCookie('mcuser', context);
    deleteCookie('mcgroups', context);
  }

  static isAuthorized(context, route = '/') {
    let authorized = true;
    const { resolvedUrl } = context;
    const cookies = parseCookies(context);

    // console.log('cookie', cookies);
    const pathname = route || resolvedUrl;
    console.log('pathname in auth js======', pathname);

    const authrizedPaths = [
      '/',
      '/pageone',
      '/pagetwo',
      '/pagethree',
      '/pagefour',
    ];

    if (!cookies?.mctoken || !cookies?.mcuser || !cookies?.mcgroups) {
      authorized = false;
    }
    if (authrizedPaths.includes(pathname) && !authorized) {
      authorized = false;
    }
    console.log('authorized: ' + authorized);
    if (!authorized) {
      AuthService.logout(context);
    }
    return authorized;
  }
}
