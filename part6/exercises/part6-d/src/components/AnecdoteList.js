import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';
import { saveFilter } from '../reducers/filterReducer';

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);
  const filteredAnecdotes = useSelector((state) => state.filter);
  const notification = useSelector((state) => state.notification);

  useEffect(() => {
    dispatch(saveFilter(anecdotes));
  }, [anecdotes]); //eslint-disable-line react-hooks/exhaustive-deps

  const vote = (id) => {
    console.log('vote', id);
    const anecdoteToChange = anecdotes.find((a) => a.id === id);
    const changedAnecdote = {
      ...anecdoteToChange,
      votes: anecdoteToChange.votes + 1,
    };

    dispatch(updateAnecdote(changedAnecdote));
    dispatch(
      setNotification(
        `you voted '${changedAnecdote.content}'`,
        5000,
        notification.timeoutID
      )
    );
  };

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
