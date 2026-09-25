import type { LocalTicket } from "./types";

export function Inspector({
  t,
  close,
  comment,
  setComment,
  comments,
  addComment,
  archive,
  done,
}: {
  t: LocalTicket;
  close: () => void;
  comment: string;
  setComment: (value: string) => void;
  comments: string[];
  addComment: () => void;
  archive: () => void;
  done: () => void;
}) {
  return (
    <aside className="inspector" aria-label={`Ticket inspector for ${t.id}`}>
      <div className="inspector-head">
        <div>
          <span className="ticket-key pill">{t.id}</span>{" "}
          <span className="status-pill">
            ● {t.status === "review" ? "In Review" : t.status}
          </span>
        </div>
        <button onClick={close} aria-label="Close ticket inspector">
          ✕
        </button>
      </div>
      <div className="inspector-body">
        <h2>{t.title}</h2>
        <div>
          {t.tags.map((tag) => (
            <span className="tag" key={tag} style={{ marginRight: 5 }}>
              {tag}
            </span>
          ))}
          <span className="tag urgent">{t.priority.toUpperCase()}</span>
        </div>
        <div className="meta-grid">
          <div>
            <span>Assignee</span>
            <b>{t.assignee}</b>
          </div>
          <div>
            <span>Reporter</span>
            <b>Marcus Brody</b>
          </div>
          <div>
            <span>Estimate</span>
            <b className="mono">{t.points} SP</b>
          </div>
          <div>
            <span>Priority</span>
            <b className="urgent">{t.priority.toUpperCase()}</b>
          </div>
          <div>
            <span>Due date</span>
            <b>{t.due || "No date"}</b>
          </div>
          <div>
            <span>Project</span>
            <b className="mono">CORE</b>
          </div>
        </div>
        {t.pr && (
          <div className="panel">
            <div className="panel-title">GitHub VCS · scaffolded</div>
            <div className="github">
              Mock pull request {t.pr} · no live sync
            </div>
            <div className="muted mono">Integration is not connected</div>
          </div>
        )}
        <div className="panel">
          <div className="panel-title">Description</div>
          <p style={{ fontSize: 12, lineHeight: 1.6 }}>{t.description}</p>
          <pre
            style={{
              background: "#111417",
              padding: 10,
              borderRadius: 8,
              overflow: "auto",
              fontSize: 10,
            }}
          >
            <code>openssl s_client -connect edge.mesh.internal:443</code>
          </pre>
          <label style={{ display: "block", fontSize: 11 }}>
            <input type="checkbox" defaultChecked /> Generate subordinate CA
            bundle
          </label>
          <label style={{ display: "block", fontSize: 11 }}>
            <input type="checkbox" /> Deploy staging handshake harness
          </label>
        </div>
        <div className="panel">
          <div className="panel-title">
            Activity & discussion · {t.comments} events
          </div>
          <div className="comment">
            <b>Elena Vance</b> linked mock PR{" "}
            <span className="ticket-key">{t.pr || "#892"}</span>
            <div className="muted">2h ago</div>
          </div>
          {comments.map((text, index) => (
            <div className="comment" key={`${text}-${index}`}>
              <b>Elena Vance</b>
              <p>{text}</p>
              <div className="muted">Just now · local prototype state</div>
            </div>
          ))}
          <textarea
            rows={3}
            aria-label="Write a comment"
            placeholder="Write a comment... (stored locally)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button className="chip" onClick={addComment}>
            Comment
          </button>
        </div>
      </div>
      <div className="inspector-foot">
        <button className="chip" onClick={archive}>
          Archive
        </button>
        <button className="primary" onClick={done}>
          ✓ Move to Done
        </button>
      </div>
    </aside>
  );
}
