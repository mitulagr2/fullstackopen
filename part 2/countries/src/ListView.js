import React from "react";

const ListView = ({ countries, handleShow }) => (
  <p>
    {countries.map((country, i) => (
      <React.Fragment key={country.name.official}>
        {country.name.common}{" "}
        <button id={i} onClick={handleShow}>
          Show
        </button>
        <br />
      </React.Fragment>
    ))}
  </p>
);

export default ListView;
