import React, { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./components/Services";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }
  return <div className="error">{message}</div>;
};

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  };
  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Departement of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};

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
  const [errorMessage, setErrorMessage] = useState(null);

  const hook = () => {
    console.log(`effect`);
    noteService.getAll().then((initialNotes) => setNotes(initialNotes));
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
    // setNotes(notes.concat(noteObject));
    noteService.create(noteObject).then((initialNotes) => {
      setNotes(notes.concat(initialNotes));
      setNewNote(``);
    });
  };
  // event handle input/change note
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  // toggle impotantance
  const toggleImportanceOf = (id) => {
    console.log(`importance of ${id} needs to be toggled`);
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
      })
      .catch((error) => {
        setErrorMessage(
          `the note "${note.content}" was already deleted from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
