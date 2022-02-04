import React, { useState } from 'react';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const handleChange = (event) => {
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    createNote({
      content: newNote,
      date: new Date().toISOString(),
      important: false,
    });

    setNewNote('');
  };

  return (
    <div className='formDiv'>
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input id='input-note' value={newNote} onChange={handleChange} />
        <button>save</button>
      </form>
    </div>
  );
};

export default NoteForm;
