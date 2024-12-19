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

  const [error, setError] = useState(''); // State for error messages
  const navigate = useNavigate();
  const { login, setToken } = useAuth(); // We'll update AuthContext to include setToken

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError(''); // Clear any previous errors when user starts typing
  };

  const handleSignUpClick = () => {
    navigate("/signup"); // Replace "/signup" with the desired route
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://ims-backend-2qfp.onrender.com/login', formData);
      if (response.status === 200 || response.status === 201) {
        // Assuming the token is returned in the response data with a key 'token'
        console.log(response.data.jwt);
        const token = response.data.jwt; 
        login(); // This will still set isAuthenticated to true
        setToken(token); // Store token in the context which will also save it to localStorage
        navigate('/');
        console.log("Logged in.");
      }
    } catch (error) {
      if (error.response) {
        // Assuming the backend sends specific messages for username/password errors
        if (error.response.data.message === "Invalid username") {
          setError("Username does not exist.");
        } else if (error.response.data.message === "Invalid password") {
          setError("Wrong password.");
        } else {
          setError("Login failed. Please check your credentials.");
        }
      } else {
        setError("An error occurred while logging in.");
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
        <button className="button" type="submit" onClick={handleSignUpClick}>SIGN-UP</button>
      </form>
    </div>
  );
}

export default Login;