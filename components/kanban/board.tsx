import {
  FiAlertCircle,
  FiArrowDown,
  FiArrowUp,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { columns, type Status } from "../../test/mock-data";
import type { GroupBy, LocalTicket } from "./types";

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
        <span className="ticket-signals">
          <span className="pill">{t.points} SP</span>
          <PriorityIcon priority={t.priority} />
        </span>
      </div>
      <div className="ticket-title">{t.title}</div>
      <div className="ticket-foot">
        <span className="tag">{t.tags[0]}</span>
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

function PriorityIcon({ priority }: { priority: LocalTicket["priority"] }) {
  const Icon =
    priority === "urgent"
      ? FiAlertCircle
      : priority === "high"
        ? FiArrowUp
        : priority === "low"
          ? FiArrowDown
          : FiMinus;
  return (
    <span
      className={`priority ${priority}`}
      aria-label={`${priority} priority`}
      title={`${priority} priority`}
    >
      <Icon aria-hidden="true" />
    </span>
  );
}

type BoardGroup = {
  id: string;
  label: string;
  color: string;
  limit?: number;
};

export function Board({
  tickets,
  selected,
  dragged,
  onSelect,
  onDragStart,
  onDragEnd,
  onDrop,
  onAdd,
  groupBy,
}: {
  tickets: LocalTicket[];
  selected: string;
  dragged: string | null;
  onSelect: (id: string) => void;
  onDragStart: (id: string) => void;
  onDragEnd: () => void;
  onDrop: (id: string, status: Status) => void;
  onAdd: () => void;
  groupBy: GroupBy;
}) {
  const groups: BoardGroup[] =
    groupBy === "status"
      ? columns
      : groupBy === "assignee"
        ? Array.from(new Set(tickets.map((ticket) => ticket.assignee))).map(
            (assignee) => ({ id: assignee, label: assignee, color: "#a8c7fa" }),
          )
        : [
            { id: "urgent", label: "Urgent", color: "#ffb4ab" },
            { id: "high", label: "High", color: "#ffdcc1" },
            { id: "medium", label: "Medium", color: "#a8c7fa" },
            { id: "low", label: "Low", color: "#8d9199" },
          ];
  const matchesGroup = (ticket: LocalTicket, groupId: string) =>
    groupBy === "status"
      ? ticket.status === groupId
      : groupBy === "assignee"
        ? ticket.assignee === groupId
        : ticket.priority === groupId;

  return (
    <section className="board">
      {groups.map((group) => (
        <div
          className="column"
          key={group.id}
          onDragOver={(e) => groupBy === "status" && e.preventDefault()}
          onDrop={() =>
            groupBy === "status" && onDrop(dragged ?? "", group.id as Status)
          }
        >
          <div className="column-head">
            <div className="column-title">
              <span className="dot" style={{ background: group.color }} />
              {group.label}
              <span className="count">
                {
                  tickets.filter((ticket) => matchesGroup(ticket, group.id))
                    .length
                }
              </span>
              {"limit" in group && group.limit && (
                <small className="muted">/ {group.limit}</small>
              )}
            </div>
            <button aria-label={`Add ticket to ${group.label}`} onClick={onAdd}>
              <FiPlus aria-hidden="true" />
            </button>
          </div>
          <div className="cards">
            {tickets
              .filter((ticket) => matchesGroup(ticket, group.id))
              .map((ticket) => (
                <Card
                  key={ticket.id}
                  t={ticket}
                  selected={selected === ticket.id}
                  dragged={dragged === ticket.id}
                  click={() => onSelect(ticket.id)}
                  start={() => groupBy === "status" && onDragStart(ticket.id)}
                  end={onDragEnd}
                />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
