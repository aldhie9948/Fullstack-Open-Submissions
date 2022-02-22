import React from 'react';

const VisibilityFilter = (props) => {
  const filterSelected = (value) => {
    console.log(value);
  };

  return (
    <div>
      <div>
        <input
          type='radio'
          onChange={() => filterSelected('ALL')}
          name='filter'
        />{' '}
        All
      </div>
      <div>
        <input
          type='radio'
          onChange={() => filterSelected('IMPORTANT')}
          name='filter'
        />{' '}
        Important
      </div>
      <div>
        <input
          type='radio'
          onChange={() => filterSelected('NONIMPORTANT')}
          name='filter'
        />{' '}
        Non-important
      </div>
    </div>
  );
};

export default VisibilityFilter;
