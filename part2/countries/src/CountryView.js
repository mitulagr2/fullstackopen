import WeatherDisplay from "./WeatherDisplay";

const CountryView = ({ country }) => (
  <>
    <h1>{country.name.common}</h1>
    <p>
      capital {country.capital[0]}
      <br />
      area {country.area}
    </p>

    <h3>languages:</h3>
    <ul>
      {Object.entries(country.languages).map((pair) => (
        <li key={pair[0]}> {pair[1]} </li>
      ))}
    </ul>

    <img alt="Country Flag" src={country.flags.svg} style={{ width: 200 }} />

    <WeatherDisplay name={country.name.common} latlng={country.latlng} />
  </>
);

export default CountryView;
