import React, { useState } from "react";
import Spinner from "./UI/Spinner";

import "./App.css";

const api = {
  key: "88dbcaefafc6608d36f0450681f10e82",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setweather] = useState({});
  const [loading, setLoading] = useState(false);
  const [inital, setInital] = useState(true);

  const search = (evt) => {
    if (evt.key === "Enter") {
      setInital(false);
      if (weather.main || weather.message) {
        setweather({});
      }
      setLoading(true);
      setTimeout(() => {
        fetch(`${api.base}weather?q=${query}&appid=${api.key}`)
          .then((response) => {
            return response.json();
          })
          .then((res) => {
            setweather(res);
            setQuery("");
            setLoading(false);
          })
          .catch((err) => setLoading(false));
      }, 1000);
    }
  };
  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  let report = "";
  if (weather.main) {
    report = (
      <div className={"weather"}>
        <h1 className={"city"}>
          {weather.name}, {weather.sys.country}
        </h1>
        <div className="date">{dateBuilder(new Date())}</div>
        <div className="weather-box">
          <div className="temp">
            {Math.round(weather.main.temp / 10).valueOf()}°c
          </div>
          <div className="climate">{weather.weather[0].main}</div>
        </div>
      </div>
    );
  }
  let errorMsg = "";
  if (weather.message) {
    errorMsg = <div className="error">{weather.message} 😐</div>;
  }
  let spinner = "";
  if (loading) {
    spinner = <Spinner />;
  }

  let initalMsg = "";
  if (inital) {
    initalMsg = <h1 className="logo">WEATHER FORECASTER </h1>;
  }
  return (
    <div
      className={
        weather.main ? (weather.main.temp > 300 ? "app warm" : "app") : "app"
      }
    >
      {}
      <main>
        <input
          className="search"
          placeholder="Enter City Name...."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
        />
        {spinner}
        {errorMsg}
        {initalMsg}
        {report}
      </main>
    </div>
  );
}

export default App;
