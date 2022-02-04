import React, { useState, useEffect, useRef } from 'react';
import Note from './components/Note';
import Notification from './components/Notification';
import Footer from './components/Footer';
import noteService from './services/notes';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setNotes(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const addNote = async (noteObject) => {
    try {
      noteFormRef.current.toggleVisibility();
      const newNote = await noteService.create(noteObject);
      setNotes(notes.concat(newNote));
    } catch (error) {
      console.error(error.message);
    }
  };

  const toggleImportanceOf = async (id) => {
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };

    try {
      const updatedNote = await noteService.update(id, changedNote);
      setNotes(notes.map((note) => (note.id !== id ? note : updatedNote)));
    } catch (error) {
      setErrorMessage(`Note '${note.content}' was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (err) {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const noteForm = () => (
    <Togglable buttonLabel='create note' ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable buttonLabel='log-in'>
      <LoginForm
        username={username}
        password={password}
        handleSubmit={handleLogin}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
      />
    </Togglable>
  );

  const logoutBtn = () => (
    <button
      onClick={() => {
        window.localStorage.removeItem('loggedNoteappUser');
        setUser(null);
      }}
    >
      logout
    </button>
  );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in {logoutBtn()}
          </p>
          {noteForm()}
        </div>
      )}
      <br></br>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
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
      <Footer />
    </div>
  );
};

export default App;
