"use client";

import { useRouter } from "next/navigation";
import Modal from "../Modal/Modal";
import type { Note } from "@/types/note";
import css from "./NotePreview.module.css";
interface NotePreviewProps {
  note: Note;
}

export default function NotePreview({ note }: NotePreviewProps) {
  const router = useRouter();

  const handleClose = () => {
    router.back();
  };

  return (
    <Modal onClose={handleClose}>
      <div className={css.container}>
        <h2 className={css.title}>{note.title}</h2>
        <p className={css.content}>{note.content}</p>
        <p className={css.tag}>
          <strong>Tag:</strong> {note.tag}
        </p>
      </div>
    </Modal>
  );
}
