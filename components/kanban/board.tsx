import { columns, type Status } from "../../lib/mock-data";
import type { LocalTicket } from "./types";

function Card({
  t,
  selected,
  dragged,
  click,
  start,
  end,
}: {
  t: LocalTicket;
  selected: boolean;
  dragged: boolean;
  click: () => void;
  start: () => void;
  end: () => void;
}) {
  return (
    <article
      className={`ticket ${selected ? "selected" : ""} ${dragged ? "dragging" : ""}`}
      draggable
      tabIndex={0}
      role="button"
      aria-label={`Open ticket ${t.id}: ${t.title}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          click();
        }
      }}
      onDragStart={start}
      onDragEnd={end}
      onClick={click}
    >
      <div className="ticket-meta">
        <span className="ticket-key">{t.id}</span>
        <span className="pill">{t.points} SP</span>
      </div>
      <div className="ticket-title">{t.title}</div>
      <div className="ticket-foot">
        <span className="tag">{t.tags[0]}</span>
        <span
          className={`priority ${t.priority}`}
          aria-label={`${t.priority} priority`}
        >
          {t.priority === "urgent"
            ? "▲"
            : t.priority === "high"
              ? "◆"
              : t.priority === "low"
                ? "↓"
                : "•"}
        </span>
        <span
          className="avatar"
          aria-hidden="true"
          style={{ width: 22, height: 22 }}
        >
          {t.initials}
        </span>
      </div>
    </article>
  );
}

export function Board({
  tickets,
  selected,
  dragged,
  onSelect,
  onDragStart,
  onDragEnd,
  onDrop,
  onAdd,
}: {
  tickets: LocalTicket[];
  selected: string;
  dragged: string | null;
  onSelect: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (id: string, status: Status) => void;
  onAdd: () => void;
}) {
  return (
    <section className="board">
      {columns.map((column) => (
        <div
          className="column"
          key={column.id}
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => onDrop(dragged ?? "", column.id)}
        >
          <div className="column-head">
            <div className="column-title">
              <span className="dot" style={{ background: column.color }} />
              {column.label}
              <span className="count">
                {tickets.filter((t) => t.status === column.id).length}
              </span>
              {column.limit && (
                <small className="muted">/ {column.limit}</small>
              )}
            </div>
            <button
              aria-label={`Add ticket to ${column.label}`}
              onClick={onAdd}
            >
              ＋
            </button>
          </div>
          <div className="cards">
            {tickets
              .filter((t) => t.status === column.id)
              .map((ticket) => (
                <Card
                  key={ticket.id}
                  t={ticket}
                  selected={selected === ticket.id}
                  dragged={dragged === ticket.id}
                  click={() => onSelect(ticket.id)}
                  start={() => onDragStart(ticket.id)}
                  end={onDragEnd}
                />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
