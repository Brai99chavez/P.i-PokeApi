import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./landingPage.css";
//asd

export default function ladingPage() {
  return (
    <React.Fragment>
      <div className="title-container">
        <h1 className="title">⛩PikAPi⛩</h1>
        <br />
        <Link to="/home" className="join">
          {" "}
          Join to Pokedex
        </Link>
      </div>
    </React.Fragment>
  );
}
