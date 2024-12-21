import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 
import axios from 'axios';
import "../styles/login.css";
import "../styles/loginMobile.css";

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login, setToken } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError(''); // Clear any previous errors when user starts typing
  };

  const handleSignUpClick = () => {
    navigate("/signup");
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ims-backend-2qfp.onrender.com/login', formData);
      if (response.status === 200 || response.status === 201) {
        console.log(response.data.jwt);
        const token = response.data.jwt; 
        login(); // This will still set isAuthenticated to true
        setToken(token); // Store token in the context which will also save it to localStorage
        navigate('/');
        console.log("Logged in.");
      }
    } catch (error) {
      if (error.response) {
        setError("Login failed. Please check your credentials.");
      } else {
        setError("An error occurred while logging in. Please wait a moment and try again.");
      }
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login">
      <p className="titleHeading">INVENTORY MANAGEMENT SYSTEM</p>
      {error && <p className="errorMessage">{error}</p>}  {/* Display error message */}
      <form onSubmit={handleSubmit} className="form">
        <label className="label" htmlFor="username">USERNAME</label>
        <input 
          className="input" 
          type="text" 
          id="username" 
          onChange={handleChange} 
          placeholder="ADMIN" 
        />
        <label className="label" htmlFor="password">PASSWORD</label>
        <input 
          className="input" 
          type="password" 
          id="password" 
          onChange={handleChange} 
          placeholder="ADMIN" 
        />
        <button className="buttonLogin" type="submit">LOGIN</button>
        <button className="button" type="button" onClick={handleSignUpClick}>SIGN-UP</button>
      </form>
    </div>
  );
}

export default Login;