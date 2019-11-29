import axios from 'axios';                      // Import axios to enable API calls to our back-end

// Set URL according to environment
const isProduction = process.env.NODE_ENV === 'production';
const base_url = isProduction ? 'heroku.com' : 'http://localhost:3000/api/facilities';

// Export edit function, which receives data as parameters to enable profile edition
export const newFacility = (data) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a call to our /edit route, while sending the parameters obtained from the form/front-end
  return axios.patch(`${base_url}/new`, data, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
      "Content-Type": "multipart/form-data"     // Set content as multipart/form-data for files and text
    }
  });

};