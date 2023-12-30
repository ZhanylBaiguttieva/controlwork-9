import axios from 'axios';

const axiosApi = axios.create({
  baseURL:'https://pizza-2ffd2-default-rtdb.europe-west1.firebasedatabase.app/'
});

export default axiosApi;