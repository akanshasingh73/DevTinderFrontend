import { BASE_URL } from '../utils/constant';
import axios from 'axios';

export const loggedIn = ({ email, password }) =>
  axios.post(
    BASE_URL + '/login',
    { email, password },
    { withCredentials: true },
  );


export const loggedOut = () =>
  axios.post(BASE_URL + '/logout', {}, { withCredentials: true });
