import React from "react";
import styles from "./loader.module.css";
import { useStore } from "effector-react";
import { connectionStore } from "../../../store/connectionStore";

import Login from "../login";

const Loader = () => {
  const store = useStore(connectionStore);

  if (store.login && store.ws) return null;

  if (store.isFetching) {
    return (
      <div className={styles.Wrapper}>
        <div className={styles.Loader}></div>
      </div>
    );
  }

  if (!store.login) {
    return (
      <div className={styles.Wrapper}>
        <Login />;
      </div>
    );
  }

  return null;
};

export default Loader;
