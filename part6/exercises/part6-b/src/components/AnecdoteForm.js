import React from 'react';
import { useDispatch } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const dispatch = useDispatch();

  const createHandler = (event) => {
    event.preventDefault();
    const input = event.target.anecdote.value;
    dispatch(createAnecdote(input));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createHandler}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
