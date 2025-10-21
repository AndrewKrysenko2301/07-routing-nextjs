import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";

interface Props {
  params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: Props) {
  const { slug } = await params;

  // 🧩 Достаём тег из массива slug (или undefined)
  const tag = Array.isArray(slug) ? slug[0] : slug;

  // 🧠 Нормализуем "All" — чтобы запрос не ломался
  const normalizedTag = tag?.toLowerCase() === "all" ? undefined : tag;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, normalizedTag, ""],
    queryFn: () => fetchNotes("", 1, normalizedTag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={normalizedTag ?? "All"} />
    </HydrationBoundary>
  );
}
