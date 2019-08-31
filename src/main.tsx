import * as React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import createAppStore from "./redux/creaAppStore";

import App from "./app/App";

const initialState = {};
const store = createAppStore(initialState);

const rootEl = document.getElementById("app");

render(
  <>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </>,
  rootEl
);
