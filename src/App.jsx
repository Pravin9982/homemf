import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Header from "./Header";
import Footer from "./Footer";
import UserForm from "./userForms";

const App = () => (
  <div className="container">
    <Header/>
    <div>Hello from user form</div>
    <UserForm/>
    <Footer/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
