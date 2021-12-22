import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";

const App = () => {
  // state notes
  const [notes, setNotes] = useState([]);
  // state new notes
  const [newNote, setNewNote] = useState("a new note...");
  // state show only important
  const [showAll, setShowAll] = useState(true);
  // notes to show function
  const notesToShow = showAll
    ? notes
    : notes.filter((note) => note.important === true);

  const hook = () => {
    console.log(`effect`);
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log(`promise fulfilled`);
      setNotes(response.data);
    });
  };

  useEffect(hook, []);
  console.log(`render`, notes.length, `notes`);

  // event new notes
  const addNote = (event) => {
    event.preventDefault();
    console.log("button clicked", event.target);
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() < 0.5,
    };
    setNotes(notes.concat(noteObject));
  };
  // event handle input/change note
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };
  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note key={note.id} note={note} />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;
