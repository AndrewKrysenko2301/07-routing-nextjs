import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "../../lib/api";
import NotesClient from "./Notes.client";
import type { Note } from "../../types/note";

const PER_PAGE = 12;

export default async function NotesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery<{ notes: Note[]; totalPages: number }>({
    queryKey: ["notes", 1, ""],
    queryFn: () => fetchNotes(1, PER_PAGE, ""),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {" "}
      <NotesClient />
    </HydrationBoundary>
  );
}
