import axios, { AxiosResponse } from "axios";
import type { Note, CreateNoteDto } from "../types/note";

const API_URL = "https://notehub-public.goit.study/api";

const authHeader = {
  Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
};

export const fetchNotes = async (
  page: number,
  perPage: number,
  search = ""
): Promise<{ notes: Note[]; totalPages: number }> => {
  const response: AxiosResponse<{ notes: Note[]; totalPages: number }> =
    await axios.get(`${API_URL}/notes`, {
      params: { page, perPage, search },
      headers: authHeader,
    });
  return response.data;
};

export const createNote = async (note: CreateNoteDto): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(
    `${API_URL}/notes`,
    note,
    {
      headers: authHeader,
    }
  );
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.delete(
    `${API_URL}/notes/${id}`,
    {
      headers: authHeader,
    }
  );
  return response.data;
};

export const fetchNoteById = async (id: string | number): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.get(
    `${API_URL}/notes/${id}`,
    {
      headers: authHeader,
    }
  );
  return response.data;
};
