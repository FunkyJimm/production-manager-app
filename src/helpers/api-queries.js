import axios from "axios";

import config from '../config/config';
import errorsHandler from '../errors/errors-messages';

const getItems = async function(endpoint, setItems, setIsLoaded, setMessage) {
  await axios.get(`${config.API_URL}/${endpoint}`)
    .then(res => {
      setItems(res.data);
      setIsLoaded(true);
    },
    (err) => {
      setIsLoaded(false);
      err?.response?.status ? setMessage(errorsHandler(err.response.status)) : console.log(err);
    })
}

const getItemDetails = async function(endpoint, id, setItems, setIsLoaded) {
  await axios.get(`${config.API_URL}/${endpoint}/${id}`)
    .then(res => {
      setItems(res.data);
      setIsLoaded(true);
    })
}

const addItem = async function(endpoint, values, setMessage, setErrMessage) {
  await axios.post(`${config.API_URL}/${endpoint}`, values)
  .then(res => {
    console.log(res.data.status);
    setMessage('Wprowadzono pomyślnie!');
  },
  (err) => {
    console.log(err.response.status);
    setErrMessage(errorsHandler(err.response.status));
  })
}

const updateItem = async function(endpoint, id, values, setMessage, setErrMessage) {
  await axios.put(`${config.API_URL}/${endpoint}/${id}`, values)
    .then(res => {
      console.log(res.data.status);
      setMessage('Wprowadzono pomyślnie!');
    },
    (err) => {
      console.log(err.response.status);
      setErrMessage(errorsHandler(err.response.status));
    })
}

const deleteItem = async function(endpoint, id) {
  let message = '';

  axios.delete(`${config.API_URL}/${endpoint}/${id}`)
  .then(res => {
    console.log(res.data.status);
    message = res.data.status;
  })
  .catch(err => {
    console.log(err.response.status);
    message = err.response.status;
  })
  return message;
}

export default {
  getItems,
  getItemDetails,
  addItem,
  updateItem,
  deleteItem,
}