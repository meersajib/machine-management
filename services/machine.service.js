import axios from 'axios';
export default class MachineService {

	static async getMachineList(token,page) {
		// console.log('token retrieved', token);
    const response = await axios.get(
			'http://172.104.163.254:8000/api/v1/machines?page_size=1&page='+page,
      {
				headers: {
					authorization: 'jwt ' + token,
        },
      },
		);
		
			
			return response?.data;
		}
	}
