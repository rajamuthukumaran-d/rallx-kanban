"use client";

import { useEffect, useMemo, useState } from "react";
import { initialTickets, type Status } from "../lib/mock-data";
import { Archive, Settings } from "./kanban-views";
import { Board } from "./kanban-board";
import { Inspector } from "./kanban-inspector";
import { MobileNav, Sidebar } from "./kanban-sidebar";
import type { LocalTicket, Theme } from "./kanban-types";

export default function KanbanApp() {
  const [tickets, setTickets] = useState<LocalTicket[]>(initialTickets);
  const [selected, setSelected] = useState("RLX-1042");
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("board");
  const [dragged, setDragged] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [commentHistory, setCommentHistory] = useState<
    Record<string, string[]>
  >({});
  const [theme, setTheme] = useState<Theme>("dark");
  const [railCollapsed, setRailCollapsed] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("rallx-theme") as Theme | null;
    if (savedTheme) setTheme(savedTheme);
    const savedTickets = localStorage.getItem("rallx-tickets");
    if (savedTickets) setTickets(JSON.parse(savedTickets));
    const savedComments = localStorage.getItem("rallx-comments");
    if (savedComments) setCommentHistory(JSON.parse(savedComments));
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("rallx-theme", theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);
  useEffect(() => {
    localStorage.setItem("rallx-tickets", JSON.stringify(tickets));
  }, [tickets]);
  useEffect(() => {
    localStorage.setItem("rallx-comments", JSON.stringify(commentHistory));
  }, [commentHistory]);

  const visible = useMemo(
    () =>
      tickets.filter(
        (t) =>
          !t.archived &&
          (t.id + " " + t.title + " " + t.tags.join(" "))
            .toLowerCase()
            .includes(query.toLowerCase()) &&
          (filter === "all" ||
            (filter === "mine"
              ? t.assignee === "Elena Vance"
              : t.priority === "urgent")),
      ),
    [tickets, query, filter],
  );
  const archived = tickets.filter((t) => t.archived);
  const selectedTicket = tickets.find((t) => t.id === selected);

  const move = (id: string, status: Status) =>
    setTickets((previous) =>
      previous.map((t) => (t.id === id ? { ...t, status } : t)),
    );
  const add = () => {
    const ticket: LocalTicket = {
      id: `RLX-${1060 + tickets.length}`,
      title: "New delivery task",
      status: "backlog",
      priority: "medium",
      tags: ["new"],
      points: 2,
      assignee: "Elena Vance",
      initials: "EV",
      comments: 0,
      description: "Add acceptance criteria for this task.",
    };
    setTickets((previous) => [...previous, ticket]);
    setSelected(ticket.id);
    setView("board");
  };
  const archive = (id: string) => {
    setTickets((previous) =>
      previous.map((t) => (t.id === id ? { ...t, archived: true } : t)),
    );
    setSelected("");
    setView("archive");
  };
  const restore = (id: string) =>
    setTickets((previous) =>
      previous.map((t) => (t.id === id ? { ...t, archived: false } : t)),
    );
  const remove = (id: string) => {
    setTickets((previous) => previous.filter((t) => t.id !== id));
    setSelected("");
  };
  const addComment = () => {
    if (!selectedTicket || !comment.trim()) return;
    setCommentHistory((previous) => ({
      ...previous,
      [selectedTicket.id]: [
        ...(previous[selectedTicket.id] ?? []),
        comment.trim(),
      ],
    }));
    setTickets((previous) =>
      previous.map((t) =>
        t.id === selectedTicket.id ? { ...t, comments: t.comments + 1 } : t,
      ),
    );
    setComment("");
  };
  const drop = (id: string, status: Status) => {
    if (id) move(id, status);
    setDragged(null);
  };

  return (
    <div className={`app-shell ${railCollapsed ? "rail-collapsed" : ""}`}>
      <Sidebar
        collapsed={railCollapsed}
        onToggle={() => setRailCollapsed((value) => !value)}
        view={view}
        onViewChange={setView}
        visibleCount={visible.length}
        backlogCount={visible.filter((t) => t.status === "backlog").length}
        archivedCount={archived.length}
        onQueryChange={setQuery}
        theme={theme}
        onThemeChange={setTheme}
      />
      <main className="workspace">
        <Toolbar
          view={view}
          onViewChange={setView}
          onAdd={add}
          query={query}
          onQueryChange={setQuery}
          filter={filter}
          onFilterChange={setFilter}
        />
        {view === "settings" ? (
          <Settings theme={theme} setTheme={setTheme} />
        ) : view === "archive" ? (
          <Archive tickets={archived} restore={restore} remove={remove} />
        ) : (
          <div className="board-wrap">
            <Board
              tickets={visible}
              selected={selected}
              dragged={dragged}
              onSelect={setSelected}
              onDragStart={setDragged}
              onDragEnd={() => setDragged(null)}
              onDrop={drop}
              onAdd={add}
            />
            {selectedTicket && (
              <Inspector
                t={selectedTicket}
                close={() => setSelected("")}
                comment={comment}
                setComment={setComment}
                comments={commentHistory[selectedTicket.id] ?? []}
                addComment={addComment}
                archive={() => archive(selectedTicket.id)}
                done={() => move(selectedTicket.id, "done")}
              />
            )}
          </div>
        )}
        <footer className="footer">
          <span>
            <b>{visible.length}</b> tickets　•　
            <b>{visible.reduce((n, t) => n + t.points, 0)}</b> SP　•　
            <span style={{ color: "#ffdcc1" }}>
              {visible.filter((t) => t.status === "review").length}
            </span>{" "}
            in review
          </span>
          <span className="mono">
            ✓ GitHub sync scaffold · Sprint 14: 5d remaining
          </span>
        </footer>
        <MobileNav onViewChange={setView} onAdd={add} />
      </main>
    </div>
  );
}

function Toolbar({
  view,
  onViewChange,
  onAdd,
  query,
  onQueryChange,
  filter,
  onFilterChange,
}: {
  view: string;
  onViewChange: (view: string) => void;
  onAdd: () => void;
  query: string;
  onQueryChange: (query: string) => void;
  filter: string;
  onFilterChange: (filter: string) => void;
}) {
  return (
    <header className="toolbar">
      <div className="toolbar-top">
        <div className="view-tabs" role="tablist" aria-label="Board views">
          <button
            className={view === "board" ? "active" : ""}
            onClick={() => onViewChange("board")}
          >
            ▦ Board
          </button>
          <button
            className={view === "backlog" ? "active" : ""}
            onClick={() => onViewChange("backlog")}
          >
            ☷ List
          </button>
          <button disabled title="Analytics is not implemented">
            ⌁ Analytics
          </button>
        </div>
        <button className="primary" onClick={onAdd}>
          ＋ New Ticket <span className="mono">C</span>
        </button>
      </div>
      <div className="toolbar-bottom">
        <div className="chips">
          <input
            aria-label="Filter tickets"
            className="filter-search"
            placeholder="Filter tickets by name, #ID, or tag..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
          <button
            className={filter === "all" ? "chip selected" : "chip"}
            onClick={() => onFilterChange("all")}
          >
            ⚙ Filter
          </button>
          <button
            className={filter === "mine" ? "chip selected" : "chip"}
            onClick={() => onFilterChange("mine")}
          >
            My tickets
          </button>
          <button
            className={filter === "urgent" ? "chip selected" : "chip"}
            onClick={() => onFilterChange("urgent")}
          >
            Urgent
          </button>
        </div>
        <div className="muted toolbar-summary">
          Group: <b>Status</b>　•　Order: <b>Priority</b>
        </div>
      </div>
    </header>
  );
}
