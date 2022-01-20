import React from "react";

const Persons = ({ list, search }) => {
  const filteredList = list.filter((person) => {
    const searchName = person.name.toLowerCase();
    return searchName.includes(search);
  });

  return (
    <div>
      <ul>
        {filteredList.map((person) => (
          <li key={person.id}>
            {person.name} | {person.number}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
