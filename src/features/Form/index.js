import React, { useState } from "react";
import styles from "./index.module.scss";
import { Input, Card } from "../../ui";

async function getDataFromAPI(url) {
  let data = null;
  let errors = null;
  try {
    const res = await fetch(url);
    const responseJson = await res.json();
    if (res.status === 404) {
      errors = responseJson;
    } else {
      data = responseJson;
    }
  } catch (e) {
    console.log(e);
  }
  return { data, errors };
}

const apiKey = "4d8fb5b93d4af21d66a2948710284366";

export function Form() {
  const [value, setValue] = useState("");
  const [dataCards, setDataCards] = useState([]);
  const [error, setError] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, errors } = await getDataFromAPI(
      `http://api.openweathermap.org/data/2.5/weather?apikey=${apiKey}&q=${value}&units=metric&lang=ru`
    );
    if (errors) {
      return setError("Город не найден!");
    }

    if (!dataCards.some((item) => item.name === data.name)) {
      setDataCards((state) => [...state, data]);
      console.log(dataCards);
    }

    setValue("");
  }

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <div className={styles.input__wrapper}>
        <Input onChange={handleChange} value={value} placeholder="City..." />
        {error && <span className={styles.error}>{error}</span>}
      </div>
      <div className={styles.card}>
        {dataCards.length > 0 &&
          dataCards.map((item) => <Card key={item.name} data={item} />)}
      </div>
    </form>
  );
}
