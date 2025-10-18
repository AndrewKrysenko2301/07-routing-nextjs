import {
  QueryClient,
  dehydrate,
  HydrationBoundary,
} from "@tanstack/react-query";
import { fetchNotes } from "../../../../lib/api";
import NotesClient from "./Notes.client";
import type { Note } from "../../../../types/note";

const PER_PAGE = 12;

interface NotesPageProps {
  params: {
    slug?: string[];
  };
}

export default async function NotesPage({ params }: NotesPageProps) {
  const queryClient = new QueryClient();

  const tag = params.slug?.[0] || "";

  await queryClient.prefetchQuery<{ notes: Note[]; totalPages: number }>({
    queryKey: ["notes", 1, tag],
    queryFn: () => fetchNotes(1, PER_PAGE, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
