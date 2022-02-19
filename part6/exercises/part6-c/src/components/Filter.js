import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdote);

  const handleChange = (event) => {
    const input = event.target.value;
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(input.toLowerCase())
    );
    dispatch(saveFilter(filteredAnecdotes));
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

export default Filter;
