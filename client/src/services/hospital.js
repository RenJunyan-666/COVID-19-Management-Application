import axios from 'axios';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { API } from '../App';


export const getPatients = () =>
  axios.get(`${API}/useraccounts`).then(({ data }) => data);

export const putUserInfo = ({ _id, ...data }) =>
  axios.put(`${API}/useraccounts/${_id}`, data).then(({ data }) => data);



// export const GetPatients = () =>{
//     const AxiosPrivate = useAxiosPrivate();
//     return(
//       AxiosPrivate.get(`${API}/useraccounts`).then(({ data }) => data)
//     )

// }
  

// export const PutUserInfo = ({ _id, ...data }) =>{
//   const AxiosPrivate = useAxiosPrivate();
//   return(
//     AxiosPrivate.put(`${API}/useraccounts/${_id}`, data).then(({ data }) => data)
//   )

// }
  

  