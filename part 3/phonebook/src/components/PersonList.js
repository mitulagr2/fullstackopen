import PersonDetails from "./PersonDetails";

const PersonList = ({ toShow, onDelete }) => (
  <p>
    {toShow.map(({ name, number, id }) => (
      <PersonDetails
        key={id}
        name={name}
        number={number}
        id={id}
        handleDelete={onDelete}
      />
    ))}
  </p>
);

export default PersonList;
