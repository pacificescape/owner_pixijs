import React, { useState } from "react";
import styles from "./window.module.css";
import { useStore } from "effector-react";
import { appStore } from "../../../store/appStore";

const Window = () => {
  // const [pos, setPos] = useState({ x: 333, y: 111 });
  const app = useStore(appStore);
  const pos = app.windowPos;

  if (!app.windowVisibility) return null;

  const css = {
    transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
    "-o-transform": `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
    "-webkit-transform": `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
    transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
    transform: `translate(calc(${pos.x}px - 50%), calc(${pos.y}px - 100%))`,
  };

  return (
    <div className={styles.Wrapper} style={css}>
      Window element
      <span>{JSON.stringify(app).replace(/,/gi, ",\n")}</span>
    </div>
  );
};

export default Window;
