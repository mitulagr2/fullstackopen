import { useState, useEffect } from "react";
import getURL from "./util";
import Filter from "./Filter";
import CountryView from "./CountryView";
import ListView from "./ListView";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const baseCountryAPI = "https://restcountries.com/v3.1/name/";

  useEffect(() => {
    filter !== "" &&
      getURL(`${baseCountryAPI + filter}`, (res) => {
        setCountries(res.data);
      });
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleShow = (e) => {
    setCountries([countries[e.target.id]]);
  };

  return (
    <>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      {countries.length === 1 ? (
        <CountryView country={countries[0]} />
      ) : countries.length <= 10 ? (
        <ListView countries={countries} handleShow={handleShow} />
      ) : (
        "Too many matches, specify another filter"
      )}
    </>
  );
};

export default App;
