import { useState } from 'react';   // Import useState hook to create custom hook

// Declare hook as a React functional component
const useForm = () => {
  
  // Declare form state variable and setForm function to update the form state variable
  const [form, setForm] = useState({});

  // Declare handleInput function for input data manipulation
  const handleInput = (event) => {
    
    // Destructure input name and value (data that is being changed by user)
    const { name, value } = event.target;

    // Update the form state without erasing previos values (with prevState)
    setForm( prevState => ({...prevState, [name]: value}) );

  };

  // Declare handleInputFile function for files manipulation
  const handleFileInput = (event) => {

    // Destructure input name and files (data that is being changed by user)
    const { name, files } = event.target;

    // Update the form state without erasing previos values (with prevState)
    setForm( prevState => ({...prevState, [name]: files}) );

  };

  // Return the form state variable and input handling functions
  return { form, handleInput, handleFileInput };

};

export default useForm;