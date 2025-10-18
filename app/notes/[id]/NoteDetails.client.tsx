"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { fetchNoteById } from "../../../lib/api";
import Modal from "../../../components/Modal/Modal";
import type { Note } from "../../../types/note";

export default function NoteDetailsClient({ noteId }: { noteId: string }) {
  const router = useRouter();
  const {
    data: note,
    isLoading,
    error,
  } = useQuery<Note, Error>({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !note) return <p>Note not found.</p>;

  return (
    <Modal onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>
        <strong>Tag:</strong> {note.tag}
      </p>
    </Modal>
  );
}
