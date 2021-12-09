import React, { useState } from "react";

const PersonForm = ({ persons, setPersons }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleChange = (stateEvent) => {
    return (event) => {
      stateEvent(event.target.value);
    };
  };

  const addNewPerson = (e) => {
    e.preventDefault();
    const checkPerson = persons.filter((person) => person.name === newName);
    if (checkPerson.length > 0)
      return alert(`${newName} already added to phonebook`);
    const newObjPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(newObjPerson));
  };

  return (
    <form onSubmit={addNewPerson}>
      <div>
        name : <input onChange={handleChange(setNewName)} value={newName} />
      </div>
      <div>
        number :{" "}
        <input
          type="number"
          onChange={handleChange(setNewNumber)}
          value={newNumber}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
