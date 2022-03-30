import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer";
import { voteAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteList = ({ anecdotes, setNotification, voteAnecdote }) => {
  const vote = ({ target }, anecdote) => {
    setNotification(`You voted '${anecdote.content}'`, 5, target);
    voteAnecdote(anecdote);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}{" "}
            <button onClick={(e) => vote(e, anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

const mapStateToProps = ({ anecdotes, filter }) => ({
  anecdotes: anecdotes
    .filter(({ content }) => content.includes(filter))
    .sort((a, b) => b.votes - a.votes),
});

const mapDispatchToProps = { setNotification, voteAnecdote };

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList);
export default ConnectedAnecdoteList;
