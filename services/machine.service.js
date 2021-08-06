import axios from 'axios';
import { parseCookies } from 'nookies';
import { deleteCookie, saveCookie, getCookie } from 'utils/cookie';

export default class MachineService {

	get getToken() {
		return getCookie('mctoken',null) || null;
	}
  static async getMachineData(query) {
		console.log('token retrieved from ',this.getToken);

  
    const response = await axios.get(
      'http://172.104.163.254:8000/api/v1/machines/data',
      {
        headers: {
          authorization: 'jwt ' + this.getToken,
        },
      },
    );

    return response?.data;
	}
	
	static async getMachineList(token) {
		console.log('token retrieved', token);
    const response = await axios.get(
			'http://172.104.163.254:8000/api/v1/machines',
      {
				headers: {
					authorization: 'jwt ' + token,
        },
      },
			);
			
			return response?.data;
		}

		static async getAnalytics(query, token) {	
			console.log('token retrieved', token);
			const response = await axios.get(
				'http://172.104.163.254:8000/api/v1/machines/analytics',
				{
					headers: {
						authorization: 'jwt ' + token,
					},
				},
			);
	
			return response?.data;
		}
	}
