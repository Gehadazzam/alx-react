import "./App.css";
import logo from "./logo.jpg";
import { getFullYear, getFooterCopy } from "./utils";

function App() {
  const isIndex = true;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>School dashboard</p>
      </header>
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
      <footer className="App-footer">
        <p>
          Copyright {getFullYear()} - {getFooterCopy(isIndex)}
        </p>
      </footer>
    </div>
  );
}

export default App;
