import React, { useState, useEffect } from "react";
import axios from "axios";

const SeachInput = ({ countries, setSearchedCountries }) => {
  const [search, setSearch] = useState(``);

  const filter = (e) => {
    setSearch(e.target.value);
    const filteredCountries = countries.filter((country) => {
      const searchCountry = country.name.common.toLowerCase();
      return searchCountry.includes(search);
    });
    setSearchedCountries(filteredCountries);
  };
  return (
    <div>
      <span>Find Countries : </span>
      <input type="text" onInput={filter} value={search} />
    </div>
  );
};

const ListCountries = ({ countries, setCountry }) => {
  if (countries.length > 10) {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }

  if (countries.length === 0)
    return (
      <div>
        <p>Insert country name</p>
      </div>
    );

  if (countries.length === 1) {
    return <div></div>;
  }

  return (
    <div>
      <ol>
        {countries.map((c) => (
          <li key={c.cca2}>
            {c.name.common}{" "}
            <button onClick={() => setCountry([c])}>show</button>
          </li>
        ))}
      </ol>
    </div>
  );
};

const DetailCountry = ({ countries }) => {
  if (countries.length === 1) {
    return (
      <div>
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>Capital : {countries[0].capital[0]}</p>
          <p>Population : {countries[0].population}</p>
          <h4>Languages</h4>
          <ul>
            {Object.values(countries[0].languages).map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
          <img src={countries[0].flags.png} alt={countries[0].name.common} />
        </div>
      </div>
    );
  }

  return <div></div>;
};

const getDirection = (angle) => {
  var directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
  return directions[index];
};

const WeatherCountry = ({ countries }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(`/data/2.5/weather`, {
          params: {
            q: countries[0].capital[0],
            appid: process.env.REACT_APP_API_KEY,
            units: `metric`,
          },
          baseURL: `https://api.openweathermap.org`,
        })
        .then((res) => setWeather(res.data));
    }
  }, [countries]);

  if (countries.length === 1 && Object.keys(weather).length !== 0) {
    const icon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
    console.log(weather);
    return (
      <div>
        <h4>Weather in {countries[0].name.common}</h4>
        <p>
          <strong>Temperature : </strong> {weather.main.temp} Celsius
        </p>
        <img src={icon} alt={weather.weather[0].description} />
        <p>
          <strong>Wind : </strong> {weather.wind.speed} mps direction{" "}
          {getDirection(weather.wind.deg)}
        </p>
      </div>
    );
  }

  return <div></div>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchedCountries, setSearchedCountries] = useState([]);

  const hookCountries = () => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setCountries(response.data);
    });
  };
  useEffect(hookCountries, []);

  return (
    <div>
      <SeachInput
        countries={countries}
        setSearchedCountries={setSearchedCountries}
      />
      <ListCountries
        countries={searchedCountries}
        setCountry={setSearchedCountries}
      />
      <DetailCountry countries={searchedCountries} />
      <WeatherCountry countries={searchedCountries} />
    </div>
  );
};

export default App;
