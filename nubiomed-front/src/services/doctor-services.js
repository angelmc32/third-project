import axios from 'axios';                      // Import axios to enable API calls to our back-end

// Set URL according to environment
const isProduction = process.env.NODE_ENV === 'production';
const base_url = isProduction ? 'https://nubiomed-ih.herokuapp.com/api/doctors' : 'http://localhost:3000/api/doctors';

// Export get function to retrieve all doctors in database
export const getDoctors = (id = null) => {

  if ( id ) return axios.get(`${base_url}/${id}`);

  else return axios.get(`${base_url}`);

};