"use strict";

import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.css";
import Loader from "./components/loader";

const Main = () => {
  return <Loader />;
};

ReactDOM.render(<Main />, document.getElementById("container"));
