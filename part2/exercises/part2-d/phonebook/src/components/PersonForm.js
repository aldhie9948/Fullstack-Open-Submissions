import React, { useState } from "react";
import phonebookServices from "./Services";

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
    if (checkPerson.length > 0) {
      // return alert(`${newName} already added to phonebook`);
      const confirmReplace = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one ?`
      );
      if (confirmReplace) {
        const [person] = checkPerson;
        const newPerson = {
          ...person,
          number: newNumber,
        };
        phonebookServices.update(person.id, newPerson).then((res) => {
          const newList = persons.map((l, i) =>
            l.id === newPerson.id ? (persons[i] = newPerson) : l
          );
          setPersons(newList);
        });
        return;
      }
    }
    const newObjPerson = {
      id: persons.length + 1,
      name: newName,
      number: newNumber,
    };

    phonebookServices
      .create(newObjPerson)
      .then((res) => setPersons(persons.concat(res)));
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
