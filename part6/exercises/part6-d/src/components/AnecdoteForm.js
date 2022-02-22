import React from 'react';
import { connect } from 'react-redux';
import { createAnecdote } from '../reducers/anecdoteReducer';

const AnecdoteForm = (props) => {
  const createHandler = async (event) => {
    event.preventDefault();
    const input = event.target.anecdote.value;
    props.createAnecdote(input);
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

const mapDispatchToProps = (dispatch) => {
  return {
    createAnecdote: (value) => {
      dispatch(createAnecdote(value));
    },
  };
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
