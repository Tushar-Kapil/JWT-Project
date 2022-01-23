import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./dashboard.css";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      setName(parseRes.user_name);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Uh oh GoodBye :(");
  };
  useEffect(() => {
    getName();
  }, []);
  return (
    <Fragment>
      <div className="container1">
        <h1 className="heading">Hello {name} ! Welcome To The Dashboard.</h1>
        <button className="btn btn-primary bt" onClick={(e) => logOut(e)}>
          Log Out
        </button>
      </div>
    </Fragment>
  );
};

export default Dashboard;
