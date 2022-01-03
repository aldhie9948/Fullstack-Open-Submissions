import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import phonebookServices from "./components/Services";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");

  const getAll = () => {
    console.log(`effect`);
    phonebookServices.getAll().then((res) => setPersons(res));
  };

  useEffect(getAll, []);

  return (
    <div>
      <h2>Phonebook</h2>

      <h3>Filter Phonebook</h3>
      <Filter search={searchName} setSearch={setSearchName} />
      <h3>Add New Phonebook</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Number</h2>
      <Persons
        list={persons}
        search={searchName}
        setStatePersons={setPersons}
      />
    </div>
  );
};

export default App;
