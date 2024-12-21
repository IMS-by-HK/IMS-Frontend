import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';
import "../styles/signup.css";
import "../styles/signupMobile.css";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { signup, setToken } = useAuth(); 



  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError('');
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    console.log('Form submission started');
    e.preventDefault();
    console.log('Form submission prevented default');

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      console.log("Trying...");
      const response = await axios.post('https://ims-backend-2qfp.onrender.com/users/signup', formData);
      console.log(formData);
      if (response.status === 200 || response.status === 201) {
        const token = response.data.jwt; 
        signup();
        setToken(token);
        navigate('/');
        console.log('Signup successful, navigating to main page');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      let errorMessage = 'An error occurred during sign-up.';
      
      if (error.request) {
        errorMessage = "Sign-up failed. Please wait a moment and choose a different username.";
      } else {
        errorMessage = error.message;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="login">
      <p className="titleHeading">INVENTORY MANAGEMENT SYSTEM</p>
      {error && <p className="errorMessage">{error}</p>}
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
        <button className="button" type="button" onClick={handleLoginClick}>LOG-IN</button>
      </form>
    </div>
  );
}

export default Signup;