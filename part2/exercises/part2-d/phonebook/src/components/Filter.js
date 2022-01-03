import React from "react";

const Filter = ({ search, setSearch }) => {
  return (
    <div>
      <p>
        Filter shown with :{" "}
        <input value={search} onChange={(e) => setSearch(e.target.value)} />
      </p>
    </div>
  );
};

export default Filter;
