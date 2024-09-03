import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { uiReducer } from "./reducers/uiReducer";
import { rootReducer } from "./reducers/rootReducer";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Combine the uiReducer and rootReducer
const combinedReducer = combineReducers({
  ui: uiReducer,
  root: rootReducer,
});

// Create the Redux store with the combinedReducer and middleware
const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Create the root for rendering the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the App component wrapped with the Redux Provider
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
