import React from "react";
import "./Login.css";

function Login() {
  return (
    <>
      <main className="App-body">
        <p>Login to access the full dashboard</p>
        <div className="userEmail">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
          <br />
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
          <br />
          <button type="button">OK</button>
        </div>
      </main>
    </>
  );
}
export default Login;
