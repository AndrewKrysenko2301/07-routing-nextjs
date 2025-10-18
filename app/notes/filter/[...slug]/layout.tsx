import type { ReactNode } from "react";
import SidebarNotes from "./@sidebar/SidebarNotes";
import css from "./LayoutNotes.module.css";

export default function NotesLayout({ children }: { children: ReactNode }) {
  return (
    <div className={css.pageWrapper} style={{ display: "flex" }}>
      <SidebarNotes />

      <main className={css.mainContent} style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}
