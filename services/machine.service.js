import axios from 'axios';
import { parseCookies } from 'nookies';
import { deleteCookie, saveCookie, getCookie } from 'utils/cookie';

export default class MachineService {
  static async getMachineData(query, token) {
    // const token = getCookie('mctoken');

    console.log('token retrieved', token);
    const response = await axios.get(
      'http://172.104.163.254:8000/api/v1/machines/data',
      {
        headers: {
          authorization: 'jwt ' + token,
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
}
