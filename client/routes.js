import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./login";
import BusComponent from "./buses";

const Routes = () => (
  <BrowserRouter>
    <div>
      <ToastContainer />
      <Switch>
        {/* <Route exact path="/" component={App} /> */}
        <Route exact path="/" component={BusComponent} />
      </Switch>
    </div>
  </BrowserRouter>
);
export default Routes;
