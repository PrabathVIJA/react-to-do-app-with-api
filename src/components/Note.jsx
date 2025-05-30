import { MdDeleteForever } from "react-icons/md";

export default function Note({ note, deleteNote }) {
  return (
    <>
      <div className="note-container">
        <p>{note.title}</p>
        <div className="note-footer">
          <p>{note.title.length} no of characters</p>
          <MdDeleteForever
            onClick={() => deleteNote(note.id)}
            className="delete-icon"
            size="1.7em"
          />
        </div>
      </div>
    </>
  );
}
