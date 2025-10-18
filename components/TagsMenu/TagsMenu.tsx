"use client";

import Link from "next/link";
import { useState } from "react";
import css from "./TagsMenu.module.css";

const TAGS = ["All notes", "Work", "Study", "Personal", "Ideas"];

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={css.menuContainer}>
      <button className={css.menuButton} onClick={toggleMenu}>
        Notes ▾
      </button>

      {isOpen && (
        <ul className={css.menuList}>
          {TAGS.map((tag) => {
            const href =
              tag === "All notes"
                ? "/notes/filter"
                : `/notes/filter/${encodeURIComponent(tag)}`;
            return (
              <li key={tag} className={css.menuItem}>
                <Link href={href} className={css.menuLink} onClick={closeMenu}>
                  {tag}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
