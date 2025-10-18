"use client";

import { useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useDebounce } from "use-debounce";
import type { Note } from "../../../../types/note";
import SearchBox from "../../../../components/SearchBox/SearchBox";
import Pagination from "../../../../components/Pagination/Pagination";
import NoteList from "../../../../components/NoteList/NoteList";
import Modal from "../../../../components/Modal/Modal";
import NoteForm from "../../../../components/NoteForm/NoteForm";
import LoadingIndicator from "../../../../components/LoadingIndicator/LoadingIndicator";
import ErrorMessage from "../../../../components/ErrorMessage/ErrorMessage";
import { fetchNotes } from "../../../../lib/api";

const PER_PAGE = 12;

interface NotesClientProps {
  tag?: string | null;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setPage(1);
  };

  const queryTag = tag && tag !== "All" ? tag : "";

  const { data, isLoading, error } = useQuery<
    { notes: Note[]; totalPages: number },
    Error
  >({
    queryKey: ["notes", page, queryTag, debouncedSearch],
    queryFn: () => fetchNotes(page, PER_PAGE, queryTag + debouncedSearch),
    placeholderData: keepPreviousData,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;

  return (
    <div className="app">
      <header className="toolbar">
        <SearchBox onChange={handleSearchChange} />
        {totalPages > 1 && (
          <Pagination
            pageCount={totalPages}
            currentPage={page}
            onPageChange={setPage}
          />
        )}
        <button className="button" onClick={openModal}>
          Create note +
        </button>
      </header>

      {isLoading && <LoadingIndicator />}
      {error && <ErrorMessage message="Error loading notes" />}

      {!isLoading && !error && notes.length === 0 && <p>No notes found.</p>}
      {!isLoading && !error && notes.length > 0 && <NoteList notes={notes} />}

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal} />
        </Modal>
      )}
    </div>
  );
}
