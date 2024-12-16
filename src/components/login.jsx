import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/login.css";

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/login', formData);
      if (response.status === 200) {
        navigate('/');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className="login">
      <p className="titleHeading">INVENTORY MANAGEMENT SYSTEM</p>
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
        <button className="button" type="submit">LOGIN</button>
      </form>
    </div>
  );
}

export default Login;