import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../styles/signup.css";

function Signup() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log('Form submission started');
    e.preventDefault();
    console.log('Form submission prevented default');

    try {
      // Correct the endpoint to match backend route
      const response = await axios.post('/signup', formData);
      if (response.status === 200) {
        console.log('Navigating to main page');
        navigate('/');
      }
    } catch (error) {
      console.error('Error signing up:', error);
      // Implement UI feedback for errors
    }
  };

  return (
    <div className="login">

      <p className="titleHeading">INVENTORY MANAGEMENT SYSTEM</p>

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