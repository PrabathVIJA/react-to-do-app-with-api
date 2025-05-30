import AddNote from "./AddNote.jsx";
import Note from "./Note.jsx";
export default function NotesList({ addNote, value, notes, deleteNote }) {
  return (
    <>
      {notes.map((note) => (
        <Note key={note.id} note={note} deleteNote={deleteNote} />
      ))}
      <AddNote addNote={addNote} value={value} />
    </>
  );
}
