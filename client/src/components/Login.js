import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const body = { email, password };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("login success");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  toast.configure();

  return (
    <Fragment>
      <ToastContainer />
      <h1 className="text-center my-5">Login</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          placeholder="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => emailHandler(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => passwordHandler(e)}
        />
        <button className="btn btn-success btn-block">Log In</button>
      </form>
      <Link className="register" to="/register">
        Don't Have An Account ? Register Here
      </Link>
    </Fragment>
  );
};

export default Login;
