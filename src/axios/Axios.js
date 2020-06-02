import axios from 'axios';
const QS = require('qs');

axios.defaults.baseURL = 'https://restapi.amap.com/v3/geocode';
// axios.defaults.transformRequest = (data)=> {
//     return QS.stringify(data)
// }
axios.defaults.timeout = 1000*30;

// axios.defaults.withCredentials = false;

export default axios;



