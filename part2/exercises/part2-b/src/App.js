import React, { useState } from "react";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Aldi Gunawan", number: "897698789", id: 1 },
    { name: "Fajar Riadi", number: "897698789", id: 2 },
    { name: "Agus Sali", number: "897698789", id: 3 },
  ]);

  const [searchName, setSearchName] = useState("");

  return (
    <div>
      <h2>Phonebook</h2>
      <h3>Filter Phonebook</h3>
      <Filter search={searchName} setSearch={setSearchName} />
      <h3>Add New Phonebook</h3>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Number</h2>
      <Persons list={persons} search={searchName} />
    </div>
  );
};

export default App;
