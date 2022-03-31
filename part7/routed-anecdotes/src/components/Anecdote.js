import { Navigate } from "react-router-dom";

const Anecdote = ({ anecdote, vote }) => {
  if (!anecdote?.content) return <Navigate replace to="/" />;

  return (
    <div>
      <h2>
        {anecdote.content} by {anecdote.author}
      </h2>
      <p>
        has {anecdote.votes} votes{" "}
        <button onClick={() => vote(anecdote.id)}> vote </button>
      </p>
      <p>
        for more info see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
