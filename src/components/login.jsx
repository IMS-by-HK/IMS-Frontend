import '../styles/login.css';

function Login() {
    return (
        <div className="login">
          <h1 className="title">INVENTORY MANAGEMENT SYSTEM</h1>
          <div className="form">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              className="input"
              type="text"
              id="username"
              placeholder="ADMIN"
            />
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="password"
              placeholder="ADMIN"
            />
            <button className="button">Login</button>
          </div>
        </div>
      );
    };

export default Login;
