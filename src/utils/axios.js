import axios from 'axios';

const axiosServices = axios.create({ baseURL: '/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

// axiosServices.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem('token');
//     if (accessToken) {
//       config.headers['authorization'] = accessToken;
//     } else {
//       window.location.pathname = '/login';
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosServices.interceptors.response.use(
  (response) => { console.log("axios====>",response); return response; },
  (error) => {
    if (error.response.status === 401 && !window.location.href.includes('/login')) {
      window.location.pathname = '/login';
    }
    return Promise.reject((error.response && error.response.data) || 'Wrong Services');
  }
);

export default axiosServices;

export const fetcher = async (args) => {
  //   const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosServices.get('/api/commonCall', { slug, data });

  return res.data;
};

export const fetcherPost = async (slug, data) => {

  const res = await axiosServices.post('/api/commonCall', { slug, data });
  return res.data;

};
export const loginCall = async (slug, data) => {
  try{
  const res = await axios.post('/api/loginCall', { slug, data });
  return res.data;
  } catch(error){
    console.log("🚀 ~ loginCall axios ~ err:", error)
    return Promise.reject(error.response.data) || 'Wrong Services';
  }
};