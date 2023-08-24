import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/guest/login';

const loginUser = async (email, password) => {
  try {
    const response = await axios.post(apiUrl, {
      email: email,
      password: password
    });

    return response.data.data.token;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export default loginUser;