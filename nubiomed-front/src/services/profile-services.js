// Import axios to enable API calls to our back-end
import axios from 'axios';

// Set URL according to environment
const isProduction = process.env.NODE_ENV === 'production';
const base_url = isProduction ? 'heroku.com' : 'http://localhost:3000/api/profile';

// Export edit function, which receives data as parameters to enable edit
export const editProfile = (data) => {

  const token = localStorage.getItem('token');

  // Return a call to our /edit route, while sending the parameters obtained from the form/front-end
  return axios.patch(`${base_url}/edit`, data, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data"
    }
  });

};