import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./register.css";

const Register = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const nameHandler = (e) => {
    setName(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const body = { name, email, password };

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        setAuth(true);
        toast.success("Registration Success");
      } else {
        toast.error(parseRes);
      }
    } catch (error) {
      console.log(error.message);
    }
    // setEmail("");
    // setName("");
    // setPassword("");
  };

  return (
    <Fragment>
      <h1 className="text-center my-5 register_h1">Register</h1>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          placeholder="email"
          name="email"
          className="form-control my-3"
          value={email}
          onChange={(e) => emailHandler(e)}
        />
        <input
          type="text"
          placeholder="name"
          name="text"
          className="form-control my-3"
          value={name}
          onChange={(e) => nameHandler(e)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          className="form-control my-3"
          value={password}
          onChange={(e) => passwordHandler(e)}
        />
        <button className="btn btn-success btn-block">Register</button>
      </form>
      <Link className="register" to="/login">
        Already Have An Account? Login Here
      </Link>
    </Fragment>
  );
};

export default Register;
