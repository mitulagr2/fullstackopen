const PersonDetails = ({ name, number, id, handleDelete }) => (
  <>
    {name} {number} <button onClick={() => handleDelete(id)}> delete </button>
    <br />
  </>
);

export default PersonDetails;
