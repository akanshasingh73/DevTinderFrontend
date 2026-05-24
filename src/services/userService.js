import { BASE_URL } from '../utils/constant';
import axios from 'axios';

export const getUserProfile = () =>
  axios.get(BASE_URL + '/profile/view', { withCredentials: true });

export const updateProfile = (payload) =>
  axios.put(BASE_URL + '/profile/update', payload, { withCredentials: true });

export const getUserFeed = () =>
  axios.get(BASE_URL + '/feed', { withCredentials: true });
