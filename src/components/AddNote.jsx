export default function AddNote({ addNote, value }) {
  return (
    <>
      <div className="note-new">
        <textarea
          rows="5"
          cols="30"
          placeholder="Please enter random id.."
          onChange={(e) => addNote(e.target.value)}
          value={value}
        ></textarea>
        <div className="note-footer">
          <p>
            <small>{50} characters remaining</small>
          </p>
          <button>Save</button>
        </div>
      </div>
    </>
  );
}
