import axios from 'axios';                      // Import axios to enable API calls to our back-end

// Set URL according to environment
const isProduction = process.env.NODE_ENV === 'production';
const base_url = isProduction ? 'https://nubiomed-iron.herokuapp.com/api/facilities' : 'http://localhost:3000/api/facilities';

// Export get function to retrieve all facilities owned by the current logged in user
export const getUserFacilities = () => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  return axios.get(`${base_url}`, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
    }
  });
  
}

// Export get function to retrieve all facilities in database
export const getAllFacilities = () => {

  return axios.get(`${base_url}/all`);
  
}

// Export get function to retrieve information of a particular facility
export const getFacilityInfo = (id) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  return axios.get(`${base_url}/${id}`, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
    }
  });
  
}

// Export create facility function, which receives data as parameters to enable facility creation
export const createFacility = (data) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a call to our /new route, while sending the parameters obtained from the form/front-end
  return axios.post(`${base_url}/new`, data, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
      "Content-Type": "multipart/form-data"     // Set content as multipart/form-data for files and text
    }
  });

};

// Export update function, which receives data as parameters to enable facility edition
export const updateFacility = (data, id) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a call to our /edit route, while sending the parameters obtained from the form/front-end
  return axios.patch(`${base_url}/${id}`, data, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
      "Content-Type": "multipart/form-data"     // Set content as multipart/form-data for files and text
    }
  });

};

// Export delete function, which receives facility id as parameter to search in database and delete it
export const deleteFacility = (id) => {

  const token = localStorage.getItem('token');  // Get token from localStorage

  // Return a call to our /edit route, while sending the parameters obtained from the form/front-end
  return axios.delete(`${base_url}/${id}`, {
    headers: {
      Authorization: token,                     // Send token in request headers (check api/helpers/auth-helper)
    }
  });

};