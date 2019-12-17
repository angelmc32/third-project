import axios from 'axios';                      // Import axios to enable API calls to our back-end

// Set URL according to environment
const isProduction = process.env.NODE_ENV === 'production';
const base_url = isProduction ? 'https://nubiomed-ih.herokuapp.com/api/consultations' : 'http://localhost:3000/api/consultations';

// Export get function to retrieve all consultations of the current logged in user
export const getDoctorConsultations = (doctorID = null) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  if ( ! doctorID ) {

    return axios.get(`${base_url}/doctor`, {
      headers: {
        Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
      }
    });

  } else {

    return axios.get(`${base_url}/user/${doctorID}`, {
      headers: {
        Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
      }
    });

  }
};

// Export create facility function, which receives data as parameters to enable consultation creation
export const createDoctorConsultation = (data) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a call to our /new route, while sending the parameters obtained from the form/front-end
  return axios.post(`${base_url}/doctor`, data, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
    }
  });

};

// Export create facility function, which receives data as parameters to enable consultation creation
export const createUserConsultation = (data, doctorID) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a call to our /new route, while sending the parameters obtained from the form/front-end
  return axios.post(`${base_url}/user/${doctorID}`, data, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
    }
  });

};