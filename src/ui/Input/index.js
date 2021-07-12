import React from "react";
import styles from "./index.module.scss";

export function Input(props) {
  const { onChange, value, placeholder } = props;
  return (
    <input
      className={styles.input}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
}
