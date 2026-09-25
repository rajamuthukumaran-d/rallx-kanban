import type { LocalTicket, Theme } from "./types";

export function Archive({
  tickets,
  restore,
  remove,
}: {
  tickets: LocalTicket[];
  restore: (id: string) => void;
  remove: (id: string) => void;
}) {
  return (
    <section className="archive-view">
      <div className="section-label">Workspace</div>
      <h1>Archive</h1>
      {tickets.length === 0 ? (
        <div className="panel">
          <p className="muted">
            Archived tickets will appear here when they are retired from the
            delivery board.
          </p>
        </div>
      ) : (
        tickets.map((ticket) => (
          <div className="panel archive-row" key={ticket.id}>
            <div>
              <b>{ticket.id}</b> <span>{ticket.title}</span>
            </div>
            <div>
              <button className="chip" onClick={() => restore(ticket.id)}>
                Restore
              </button>
              <button className="chip danger" onClick={() => remove(ticket.id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </section>
  );
}

export function Settings({
  theme,
  setTheme,
}: {
  theme: Theme;
  setTheme: (value: Theme) => void;
}) {
  return (
    <section className="settings-view">
      <div className="section-label">Workspace settings</div>
      <h1>Settings</h1>
      <div className="panel">
        <div className="panel-title">Appearance</div>
        <p className="muted" style={{ fontSize: 12 }}>
          Choose the console theme. Your preference is stored locally.
        </p>
        <button
          className={theme === "dark" ? "chip selected" : "chip"}
          onClick={() => setTheme("dark")}
        >
          Dark
        </button>{" "}
        <button
          className={theme === "light" ? "chip selected" : "chip"}
          onClick={() => setTheme("light")}
        >
          Light
        </button>
      </div>
      <div className="panel integrations">
        <div className="panel-title">Integrations · scaffolded</div>
        <p>
          GitHub sync{" "}
          <span className="muted">Not connected (mock data only)</span>
        </p>
        <p>
          OIDC / Authentik{" "}
          <span className="muted">
            Auth scaffold; deployment configuration required
          </span>
        </p>
        <p>
          MCP access{" "}
          <span className="muted">
            Token model planned; service not available
          </span>
        </p>
      </div>
    </section>
  );
}
