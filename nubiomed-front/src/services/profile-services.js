import axios from 'axios';                      // Import axios to enable API calls to our back-end

// Set URL according to environment
const isProduction = process.env.NODE_ENV === 'production';
const base_url = isProduction ? 'https://nubiomed-ih.herokuapp.com/api' : 'http://localhost:3000/api';

// Export edit function, which receives data as parameters to enable profile edition
export const editProfile = (data) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a call to our /edit route, while sending the parameters obtained from the form/front-end
  return axios.patch(`${base_url}/profile/edit`, data, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
      "Content-Type": "multipart/form-data"     // Set content as multipart/form-data for files and text
    }
  });

};

// Export get function, which retrieves preferences data from database
export const getPreferences = () => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a get call to our /preferences route
  return axios.get(`${base_url}/preferences`, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
    }
  });

};

// Export edit function, which receives data as parameters to enable profile edition
export const editPreferences = (data) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a patch call to our /preferences route, while sending the parameters obtained from the form/front-end
  return axios.patch(`${base_url}/preferences`, data, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
    }
  });

};