import React, { useState, useEffect } from "react";
import Button from "react-bootstrap-button-loader";

import "./login.css";

const App = () => {
  return (
    <div className="container" id="root">
      <div className="row">
        <div className="col-lg-3 col-md-2" />
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-title">Sign In</div>

          <div className="col-lg-12 login-form">
            <form onSubmit="">
              <div className="form-group">
                <label className="form-control-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange=""
                  name="email"
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange=""
                  name="password"
                />
              </div>

              <div className="col-lg-12 login-button center-block">
                <Button type="submit" className="btn btn-primary" loading="">
                  LOGIN
                </Button>
              </div>
            </form>
          </div>
          <div className="col-lg-3 col-md-2" />
        </div>
      </div>
    </div>
  );
};

export default App;
