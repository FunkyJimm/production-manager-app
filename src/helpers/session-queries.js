import axios from "axios";

import config from '../config/config';
import errorsHandler from '../errors/errors-messages';

const login = async function(values, setMessage, setErrMessage, setIsLogged) {
  await axios.post(`${config.API_URL}/login`, values, { withCredentials: true })
    .then(res => {
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("isLogged", "true");
      setIsLogged(true);
      setMessage('Zalogowano!');
    },
    (err) => {
      console.log(err.response.status);
      setErrMessage(errorsHandler(err.response.status));
    })
}

const loginCheck = async () => {
  await axios.get(`${config.API_URL}/login-test`, { withCredentials: true })
  .then(res => {
    if (res.data.status === 200) {
      return true;
    }
  },
  (err) => {
    console.log(err.response.status);
    localStorage.removeItem("userName");
    localStorage.removeItem("role");
    localStorage.removeItem("isLogged");
  })
}

export default {
  login,
  loginCheck,
}