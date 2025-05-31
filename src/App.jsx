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
      toast.info("Fetching data from local storage...");
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
      return;
    }
    if (parseInt(noteId) === 0) {
      setNoteId("");
      toast.error("Do not enter zero");
      return;
    }

    async function fetchQuote() {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/todos/${noteId}`
        );
        toast.info("fetching data from api");
        if (!res.ok) {
          throw new Error("Requested item not found");
        }
        let quote;
        try {
          quote = await res.json();
        } catch {
          toast.error("can't parse data");
        }
        if (!quote || !quote.title) {
          throw new Error("Unexpected response format");
        }

        setNotesArray((prevNotes) => [
          ...prevNotes,
          { ...quote, id: nanoid() },
        ]);

        toast.success("Note added!");
      } catch (e) {
        toast.error(e.message);
      } finally {
        setNoteId("");
      }
    }
    fetchQuote();
  }, [noteId]);

  //managing data entered from text area
  function AddNoteHandler(e) {
    const numericValue = e.replace(/[^0-9]/g, "");
    if (!numericValue) {
      toast.error("Don't enter alphabets");
    }

    setNoteId(numericValue);
  }
  //For deleting notes
  function deleteNote(id) {
    const updatedNote = noteArray.filter((note) => note.id != id);
    setNotesArray(updatedNote);
    toast.success("Note deleted!");
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
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  );
}

export default App;
