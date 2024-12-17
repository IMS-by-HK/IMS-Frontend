import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';
import "../styles/signup.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState(''); // State for error messages
  const { signup } = useAuth(); // Import the signup function from AuthContext

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError(''); // Clear any previous errors when user starts typing
  };

  const handleSubmit = async (e) => {
    console.log('Form submission started');
    e.preventDefault();
    console.log('Form submission prevented default');

    try {
      // Correct the endpoint to match backend route
      console.log("Trying...");
      const response = await axios.post('https://ims-backend-2qfp.onrender.com/users/signup', formData);
      console.log(formData);
      if (response.status === 200 || response.status === 201) {
        console.log('Signup successful, navigating to main page');
        signup(); // Call the signup function to set isAuthenticated to true
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      let errorMessage = 'An error occurred during sign-up.';
      
      if (error.response) {
        // Handle specific error messages from the backend
        if (error.response.data.message === "Username already exists") {
          errorMessage = "This username is already taken.";
        } else if (error.response.data.message === "Password too weak") {
          errorMessage = "Please choose a stronger password.";
        } else {
          errorMessage = error.response.data.message || "Sign-up failed.";
        }
      } else if (error.request) {
        errorMessage = "No response from server";
      } else {
        errorMessage = error.message;
      }

      setError(errorMessage);
    }
  };

  return (
    <div className="login">
      <p className="titleHeading">INVENTORY MANAGEMENT SYSTEM</p>
      {error && <p className="errorMessage">{error}</p>}  {/* Display error message */}
      <form onSubmit={handleSubmit} className="form">
        <label className="label" htmlFor="username">
          CHOOSE USERNAME
        </label>
        <input
          className="input"
          type="text"
          id="username"
          onChange={handleChange}
          placeholder="ADMIN"
        />
        <label className="label" htmlFor="password">
          CHOOSE PASSWORD
        </label>
        <input
          className="input"
          type="password"
          id="password"
          onChange={handleChange}
          placeholder="ADMIN"
        />
        <button className="button" type="submit">SIGN-UP</button>
      </form>
    </div>
  );
}

export default Signup;