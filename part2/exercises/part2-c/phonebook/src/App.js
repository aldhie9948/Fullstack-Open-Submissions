import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchName, setSearchName] = useState("");

  const hook = () => {
    console.log(`effect`);
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log(`state fulfilled`);
      console.log(response.data);
      setPersons(response.data);
    });
  };

  useEffect(hook, []);

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
