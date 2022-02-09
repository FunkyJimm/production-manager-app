import axios from "axios";

import config from '../config/config';
import errorsHandler from '../errors/errors-messages';

const login = async function(values, setMessage, setErrMessage, setIsLogged) {
  await axios.post(`${config.API_URL}/login`, values)
    .then(res => {
      localStorage.setItem("userName", res.data.name);
      localStorage.setItem("isLogged", "true");
      setIsLogged(true);
      setMessage('Zalogowano!');
    },
    (err) => {
      console.log(err.response.status);
      setErrMessage(errorsHandler(err.response.status));
    })
}

const loginCheck = () => {
  if (localStorage.getItem("isLogged") === "true") {
    return true;
  } else {
    return false;
  }
}

export default {
  login,
  loginCheck,
}