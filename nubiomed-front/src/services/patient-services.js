import axios from 'axios';                      // Import axios to enable API calls to our back-end

// Set URL according to environment
const isProduction = process.env.NODE_ENV === 'production';
const base_url = isProduction ? 'https://nubiomed-ih.herokuapp.com/api/patients' : 'http://localhost:3000/api/patients';

// Export get function to retrieve all doctors in database
export const getAllPatients = () => {

  return axios.get(`${base_url}`);

};