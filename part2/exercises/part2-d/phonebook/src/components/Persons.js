import React from "react";
import phonebookServices from "./Services";

const Persons = ({ list, search, setStatePersons }) => {
  const filteredList = list.filter((person) => {
    const searchName = person.name.toLowerCase();
    return searchName.includes(search);
  });

  const deletePerson = (id) => {
    return phonebookServices.find(id).then((res) => {
      const confirmDelete = window.confirm(`Delete ${res.name}`);
      if (confirmDelete) {
        phonebookServices.deletePerson(id);
        const newList = list.filter((l) => l.id !== id);
        setStatePersons(newList);
      }
    });
  };

  return (
    <div>
      <ul>
        {filteredList.map((person) => (
          <li key={person.id}>
            {person.name} | {person.number}{" "}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Persons;
