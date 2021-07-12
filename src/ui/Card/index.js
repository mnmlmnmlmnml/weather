import React from "react";
import styles from "./index.module.scss";

export function Card(props) {
  const { data } = props;
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.text}>{data.name}</h2>{" "}
      <sup className={styles.desc}>{data.sys.country}</sup>
      <div className={styles.column}>
        <span className={styles.temp}> {Math.round(data.main.temp)}</span>
        <sup className={styles.item}>°C</sup>
      </div>
      <img
        className={styles.img}
        src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
      />
    </div>
  );
}
