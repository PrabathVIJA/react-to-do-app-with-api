import "./App.css";
import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";

function App() {
  const [noteId, setNoteId] = useState("");
  const [noteArray, setNotesArray] = useState([]);
  useEffect(() => {
    if (!noteId) {
      return;
    }
    if (noteId == 0) {
      setNoteId("");
      alert("Do not enter zero");
      return;
    }

    async function fetchQuote() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${noteId}`
      );
      const quote = await res.json();
      setNotesArray((prevNotes) => [...prevNotes, { ...quote, id: nanoid() }]);
      setNoteId("");
    }
    fetchQuote();
  }, [noteId]);
  //managing data entered from text area
  function AddNoteHandler(e) {
    setNoteId(e);
  }
  //For deleting notes
  function deleteNote(id) {
    const updatedNote = noteArray.filter((note) => note.id != id);
    setNotesArray(updatedNote);
  }
  return (
    <>
      <div className="container">
        <NotesList
          addNote={AddNoteHandler}
          value={noteId}
          notes={noteArray}
          deleteNote={deleteNote}
        />
      </div>
    </>
  );
}

export default App;
