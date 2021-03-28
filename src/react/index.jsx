"use strict";

import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.css";
import Loader from "./components/loader";
import { connectFX } from "../store/connectionStore.js";

const Main = () => {
  useEffect(() => {
    connectFX();
  }, []);

  return <Loader />;
};

ReactDOM.render(<Main />, document.getElementById("container"));
