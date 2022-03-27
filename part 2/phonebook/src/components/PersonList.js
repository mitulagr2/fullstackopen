import PersonDetails from "./PersonDetails";

const PersonList = ({ personsToShow, handleDelete }) => (
  <p>
    {personsToShow.map(({ name, number, id }) => (
      <PersonDetails
        key={name}
        name={name}
        number={number}
        id={id}
        handleDelete={handleDelete}
      />
    ))}
  </p>
);

export default PersonList;
