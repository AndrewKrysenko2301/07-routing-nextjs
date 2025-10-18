"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "../../../lib/api";

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NoteDetailsClientProps {
  noteId: string;
}

export default function NoteDetailsClient({ noteId }: NoteDetailsClientProps) {
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),

    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;

  if (error) {
    return <p>Could not fetch note details. {error.message}</p>;
  }

  if (!note) return <p>Note not found.</p>;

  return (
    <div className="container">
      <div className="note-header">
        <h2>{note.title}</h2>
      </div>
      <div className="note-content">
        <p>{note.content}</p>
        <p className="note-date">Created: {note.createdAt}</p>
      </div>
    </div>
  );
}
