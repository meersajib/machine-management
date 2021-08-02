import axios from 'axios';

export default class AuthService {
  static async login(data) {
    const response = await axios.post(
      `http://172.104.163.254:8000/api/v1/users/token/`,
      {
        data,
        method: 'POST',
      },
    );
    console.log('responseeeeeeeeee', response);
    return response;
  }
}
