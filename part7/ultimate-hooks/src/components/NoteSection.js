import { useEffect } from "react";
import { useField, useResource } from "../hooks";

const NoteSection = () => {
  const content = useField("text");
  const [notes, noteService] = useResource("http://localhost:3005/notes");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
  };

  useEffect(() => {
    noteService.getAll();
  }, [noteService]);

  return (
    <>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}
    </>
  );
};

export default NoteSection;
