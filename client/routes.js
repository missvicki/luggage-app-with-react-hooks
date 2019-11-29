import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./login";

const Routes = () => (
  <BrowserRouter>
    <div>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/landingPage" />
      </Switch>
    </div>
  </BrowserRouter>
);
export default Routes;
