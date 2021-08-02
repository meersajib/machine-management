import axios from 'axios';
import { parseCookies } from 'nookies';
import { deleteCookie, saveCookie } from 'utils/cookie';
export default class AuthService {

	static async validate(data) {
		const response = await axios.post(`http://172.104.163.254:8000/api/v1/users/token/`, data);
		console.log('response in service', response);
		return response?.data;
	}

	static login(data) {
		saveCookie('mctoken', data?.token, 1);
		saveCookie('mcuser', data?.username, 1);
		const groups = data?.gropus || ['user']
		saveCookie('mcgroups', groups, 1);

	}
	static logout() {
		deleteCookie('mctoken');
		deleteCookie('mcuser');
		deleteCookie('mcgroups');
	}

	static isAuthorized(context, route = '/') {

		let authorized = true;
		const { resolvedUrl } = context;
		const cookies = parseCookies(context)

		// console.log('cookie', cookies);
		const pathname = route || resolvedUrl;
		console.log('pathname in auth js======', pathname);

		const authrizedPaths = ['/', '/pageone', '/pagetwo', '/pagethree', '/pagefour'];

		if (!cookies?.mctoken || !cookies?.mcuser || !cookies?.mcgroups) {
			authorized = false
		}
		if (authrizedPaths.includes(pathname) && !authorized) {
			authorized = false;
		}
		console.log('authorized: ' + authorized);
		if (!authorized) {
			AuthService.logout()
		}
		return authorized;
	}
}
