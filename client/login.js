import React, { useState } from "react";
import Button from "react-bootstrap-button-loader";
import axios from "axios";
import "./login.css";
import { dangerToast, successToast } from "./toast";

const App = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const loginFunction = payload => {
    axios
      .post(payload.url, payload.data)
      .then(response => {
        setLoading(false);
        successToast(response.data.message);
        localStorage.setItem("token", response.data.access_token);
        payload.history.push("/home");
      })
      .catch(error => {
        setLoading(false);
        const errorMsg = error.response.data.Error.message;
        dangerToast(errorMsg);
      });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setLoading(true);
    const data = { email, password };
    const url = "http://localhost:4000/api/v1/auth/signin";
    const payload = {
      data,
      history: props.history,
      url
    };
    loginFunction(payload);
  };

  return (
    <div className="container" id="root">
      <div className="row">
        <div className="col-lg-3 col-md-2" />
        <div className="col-lg-6 col-md-8 login-box">
          <div className="col-lg-12 login-title">Sign In</div>

          <div className="col-lg-12 login-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-control-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  onChange={e => setEmail(e.target.value)}
                  name="email"
                  value={email}
                />
              </div>
              <div className="form-group">
                <label className="form-control-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  onChange={e => setPassword(e.target.value)}
                  name="password"
                  value={password}
                />
              </div>

              <div className="col-lg-12 login-button center-block">
                <Button
                  type="submit"
                  className="btn btn-primary"
                  loading={loading}
                >
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
