import React from 'react';
import { connect } from 'react-redux';
import { saveFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const anecdotes = props.anecdote;

  const handleChange = (event) => {
    const input = event.target.value;
    const filteredAnecdotes = anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(input.toLowerCase())
    );
    props.saveFilter(filteredAnecdotes);
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

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveFilter: (value) => {
      dispatch(saveFilter(value));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
