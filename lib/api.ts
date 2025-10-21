import axios from "axios";
import type { Note, CreateNoteDto } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";

const authHeader = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
};

// ✅ Получение заметок с фильтрацией, поиском и пагинацией
export async function fetchNotes(
  searchWord: string,
  page: number,
  tag?: string
): Promise<{ notes: Note[]; totalPages: number }> {
  // Если тег “All” — не передаём его в запрос
  if (tag === "All") {
    tag = undefined;
  }

  const params = {
    search: searchWord || undefined,
    tag,
    page,
    perPage: 12,
  };

  const { data } = await axios.get<{ notes: Note[]; totalPages: number }>(
    `${API_URL}/notes`,
    {
      params,
      headers: authHeader,
    }
  );

  return data;
}

// ✅ Создание заметки
export async function createNote(note: CreateNoteDto): Promise<Note> {
  const { data } = await axios.post<Note>(`${API_URL}/notes`, note, {
    headers: authHeader,
  });
  return data;
}

// ✅ Удаление заметки
export async function deleteNote(id: string | number): Promise<Note> {
  const { data } = await axios.delete<Note>(`${API_URL}/notes/${id}`, {
    headers: authHeader,
  });
  return data;
}

// ✅ Получение заметки по ID
export async function fetchNoteById(id: string | number): Promise<Note> {
  const { data } = await axios.get<Note>(`${API_URL}/notes/${id}`, {
    headers: authHeader,
  });
  return data;
}
