import { connect } from "react-redux";
import { setFilter } from "../reducers/filterReducer";

const Filter = ({ setFilter }) => {
  const handleChange = ({ target: { value } }) => {
    setFilter(value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = { setFilter };

const ConnectedFilter = connect(null, mapDispatchToProps)(Filter);
export default ConnectedFilter;
