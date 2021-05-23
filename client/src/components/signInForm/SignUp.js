import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./SignUp.css";
import { signup, signin, authenticate } from "../../helper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
const SignUp = () => {
  const [isSignUp, setIsSignUp] = useState(true);

  const [formValues, setformValues] = useState({
    name: "",
    email: "",
    password: "",
    didRedirect: false,
  });

  const handleSignIn = (e) => {
    e.preventDefault();

    signin(formValues)
      .then((data) => {
        if (data.error) toast.warn(data.error);
        else {
          authenticate(data, () => {
            setformValues({ ...formValues, didRedirect: true });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
    return;
  };

  const handleSignup = (e) => {
    e.preventDefault();
    signup(formValues)
      .then((data) => {
        if (data.error) toast.warn("User email already in use");
        else {
          toast.success(`User created with email ${formValues.email}`);
          setformValues({
            name: "",
            email: "",
            password: "",
          });
        }
      })
      .catch(console.log("Error in signup"));
  };

  const switchingForm = () => {
    setformValues({
      name: "",
      email: "",
      password: "",
    });

    setIsSignUp(!isSignUp);
  };

  const signInForm = () => {
    return (
      <React.Fragment>
        <h2>
          <i>Welcome to story forum.</i>
        </h2>
        <h3>
          <i>Signin to explore other features.</i>
        </h3>
        <button
          onClick={switchingForm}
          className="btn btn-success button__signup"
        >
          SWITCH TO SIGN UP
        </button>
        <div className="row signin__container">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Email</label>
                <input
                  onChange={(e) =>
                    setformValues({ ...formValues, email: e.target.value })
                  }
                  value={formValues.email}
                  className="form-control"
                  type="email"
                />
              </div>

              <div className="form-group">
                <label className="text-dark">Password</label>
                <input
                  onChange={(e) =>
                    setformValues({ ...formValues, password: e.target.value })
                  }
                  value={formValues.password}
                  className="form-control"
                  type="password"
                />
              </div>
              <button
                onClick={handleSignIn}
                className="btn btn-success btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const signUpForm = () => {
    return (
      <React.Fragment>
        <h2>
          <i>Welcome to story forum.</i>
        </h2>
        <h3>
          <i>Signup to explore other features.</i>
        </h3>
        <button
          onClick={switchingForm}
          className="btn btn-success button__signup"
        >
          SWITCH TO SIGN IN
        </button>
        <div className="row signin__container">
          <div className="col-md-6 offset-sm-3 text-left">
            <form>
              <div className="form-group">
                <label className="text-dark">Name</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    setformValues({ ...formValues, name: e.target.value });
                  }}
                  type="text"
                  value={formValues.name}
                />
              </div>
              <div className="form-group">
                <label className="text-dark">Email</label>
                <input
                  className="form-control"
                  onChange={(e) => {
                    setformValues({ ...formValues, email: e.target.value });
                  }}
                  type="email"
                  value={formValues.email}
                />
              </div>

              <div className="form-group">
                <label className="text-dark">Password</label>
                <input
                  onChange={(e) => {
                    setformValues({ ...formValues, password: e.target.value });
                  }}
                  className="form-control"
                  type="password"
                  value={formValues.password}
                />
              </div>
              <button
                onClick={(e) => handleSignup(e)}
                className="btn btn-success btn-block"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  };

  const performRedirect = () => {
    if (formValues.didRedirect) return <Redirect to="/dashboard" />;
  };

  return (
    <>
      {isSignUp ? signUpForm() : signInForm()}
      {performRedirect()}
    </>
  );
};

export default SignUp;
