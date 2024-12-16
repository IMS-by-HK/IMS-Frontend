import { useEffect } from "react";
import "../styles/signup.css";

function Signup() {
  return (
    <div className="login">
      <p className="titleHeading">INVENTORY MANAGEMENT SYSTEM</p>
      <div className="form">
        <label className="label" htmlFor="username">
          CHOOSE USERNAME
        </label>
        <input
          className="input"
          type="text"
          id="username"
          placeholder="ADMIN"
        />
        <label className="label" htmlFor="password">
          CHOOSE PASSWORD
        </label>
        <input
          className="input"
          type="password"
          id="password"
          placeholder="ADMIN"
        />
        <button className="button">SIGN-UP</button>
      </div>
    </div>
  );
}

export default Signup;
