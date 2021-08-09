import axios from 'axios';
export default class MachineService {

	static async getMachineList(token, url) {
		const host = process.env.NEXT_PUBLIC_HOST;

		console.log('env host',host);
		// console.log('token retrieved', token);
    const response = await axios.get(`${host}/${url}`,
      {
				headers: {
					authorization: 'jwt ' + token,
        },
      },
		);
		
			
			return response?.data;
		}
	}
