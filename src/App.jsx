import "./App.css";
import NotesList from "./components/NotesList";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [noteId, setNoteId] = useState("");
  const [noteArray, setNotesArray] = useState([]);
  // for getting data from localStorage
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));

    if (savedNotes) {
      setNotesArray(savedNotes);
    }
  }, []);

  // writing into local storage
  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(noteArray));
  }, [noteArray]);

  // for fetching data from api
  useEffect(() => {
    if (!noteId) {
      console.log("empty string");

      return;
    }
    if (parseInt(noteId) === 0) {
      setNoteId("");
      toast.error("Do not enter zero");
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
    const numericValue = e.replace(/[^0-9]/g, "");

    setNoteId(numericValue);
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
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
