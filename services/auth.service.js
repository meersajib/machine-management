import axios from 'axios';
import { deleteCookie, saveCookie,getCookie } from 'utils/cookie';
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

	static isAuthorized(pathname = '/',context=null) {
		const token = getCookie('mctoken', null);
		const user = getCookie('mcuser', null);
		const group = getCookie('mcgroups', null);

		const groupList = group?.split(',');

		const protected_routes = ['/', '/analytics', '/offline-online-devices', '/machine-data', '/parameter-data'];

		if (protected_routes.includes(pathname) && (!token || !user || !group)) {
			return false;
		}
		if (!groupList?.includes('Maintainer') && pathname == `/parameter-data`) {
			return false;
		}

		return true;
	}


}
