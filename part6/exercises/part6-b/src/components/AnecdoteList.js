import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteAnecdote } from '../reducers/anecdoteReducer';
import {
  showNotification,
  hideNotification,
} from '../reducers/notificationReducer';
import { saveFilter } from '../reducers/filterReducer';

const AnecdoteList = (props) => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);
  const filteredAnecdotes = useSelector((state) => state.filter);

  useEffect(() => {
    dispatch(saveFilter(anecdotes));
  }, [anecdotes, dispatch]);

  const vote = (id) => {
    console.log('vote', id);
    const content = anecdotes.find((a) => a.id === id).content;
    dispatch(voteAnecdote(id));
    dispatch(showNotification(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
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
