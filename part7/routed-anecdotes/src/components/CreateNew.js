import { useNavigate } from "react-router-dom";
import { useField } from "../hooks";

const CreateNew = ({ addNew }) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.inputParams.value,
      author: author.inputParams.value,
      info: info.inputParams.value,
      votes: 0,
    });
    navigate("/");
  };

  const resetFields = () => {
    content.reset();
    author.reset();
    info.reset();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.inputParams} />
        </div>
        <div>
          author
          <input {...author.inputParams} />
        </div>
        <div>
          url for more info
          <input {...info.inputParams} />
        </div>
        <button type="submit">create</button>
        <button type="button" onClick={resetFields}>
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
