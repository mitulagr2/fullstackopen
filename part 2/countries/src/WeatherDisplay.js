import { useEffect, useState } from "react";
import getURL from "./util";

const WeatherDisplay = ({ name, latlng }) => {
  const [data, setData] = useState({});
  const api_key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    getURL(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&appid=${api_key}`,
      (res) => {
        setData({
          temp: res.data.main.temp,
          windSpeed: res.data.wind.speed,
          iconCode: res.data.weather[0].icon,
        });
      }
    );
  }, [latlng, api_key]);

  return (
    <>
      <h2> Weather in {name} </h2>
      {data.temp && (
        <>
          <p> temperature {data.temp} Celcius </p>
          <img
            alt="Weather Icon"
            src={`http://openweathermap.org/img/wn/${data.iconCode}@2x.png`}
          />
          <p> wind {data.windSpeed} m/s </p>
        </>
      )}
    </>
  );
};

export default WeatherDisplay;
