import axios from 'axios';
export default class MachineService {

	static async getMachineList(token) {
		// console.log('token retrieved', token);
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
	}
