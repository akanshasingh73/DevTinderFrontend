import { BASE_URL } from '../utils/constant';
import axios from 'axios';

export const getConnectionRequests = () =>
  axios.get(BASE_URL + '/user/requests/received', { withCredentials: true });

export const reviewRequest = (requestId, status) =>
  axios.post(
    BASE_URL + `/request/review/${status}/${requestId}`,
    {},
    { withCredentials: true },
  );

export const getConnections = () =>
  axios.get(BASE_URL + '/user/connections', { withCredentials: true });

export const sendRequest = (status, receiverId) =>
  axios.post(
    BASE_URL + `/request/send/${status}/${receiverId}`,
    {},
    { withCredentials: true },
  );
