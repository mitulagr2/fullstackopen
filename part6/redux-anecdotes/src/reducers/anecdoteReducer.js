import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    increaseVotes(state, action) {
      state.find((a) => a.id === action.payload).votes += 1;
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { increaseVotes, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initAnecdotes = () => async (dispatch) =>
  dispatch(setAnecdotes(await anecdoteService.getAll()));

export const createAnecdote = (content) => async (dispatch) =>
  dispatch(appendAnecdote(await anecdoteService.create(content)));

export const voteAnecdote = (anecdote) => async (dispatch) => {
  await anecdoteService.update(anecdote.id, {
    ...anecdote,
    votes: anecdote.votes + 1,
  });
  dispatch(increaseVotes(anecdote.id));
};

export default anecdoteSlice.reducer;
