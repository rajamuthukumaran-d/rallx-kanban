type NavProps = {
  active?: boolean;
  onClick: () => void;
  label: string;
  count?: number;
};

function Nav({ active, onClick, label, count }: NavProps) {
  return (
    <button
      className={active ? "nav-item active" : "nav-item"}
      onClick={onClick}
    >
      <span>{label}</span>
      {count !== undefined && <span className="count">{count}</span>}
    </button>
  );
}

type SidebarProps = {
  collapsed: boolean;
  onToggle: () => void;
  view: string;
  onViewChange: (view: string) => void;
  visibleCount: number;
  backlogCount: number;
  archivedCount: number;
  onQueryChange: (query: string) => void;
  theme: "dark" | "light";
  onThemeChange: (theme: "dark" | "light") => void;
};

export function Sidebar({
  collapsed,
  onToggle,
  view,
  onViewChange,
  visibleCount,
  backlogCount,
  archivedCount,
  onQueryChange,
  theme,
  onThemeChange,
}: SidebarProps) {
  const projects = ["Core Platform", "Auth Gateway", "Mobile Client"];

  return (
    <aside className="rail">
      <div className="brand">
        <div className="brand-row">
          <span className="brand-name">
            <span className="logo">R</span>Rallx Kanban
          </span>
          <button
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            onClick={onToggle}
          >
            {collapsed ? "›" : "‹"}
          </button>
        </div>
        <div className="tenant">
          <b>Acme Corp</b>
          <small className="mono">tnt_8932x_us</small>
        </div>
      </div>
      <button
        className="search"
        type="button"
        onClick={() =>
          document.querySelector<HTMLInputElement>(".filter-search")?.focus()
        }
        aria-label="Focus ticket filter"
      >
        ⌕ Command / Filter <span className="mono shortcut">⌘K</span>
      </button>
      <nav className="nav" aria-label="Workspace navigation">
        <div className="section-label">Workspace</div>
        <Nav
          active={view === "board"}
          onClick={() => onViewChange("board")}
          label="▦　Board"
          count={visibleCount}
        />
        <Nav
          onClick={() => onViewChange("board")}
          label="◎　My Work"
          count={4}
        />
        <Nav
          active={view === "backlog"}
          onClick={() => onViewChange("backlog")}
          label="☷　Backlog"
          count={backlogCount}
        />
        <Nav
          active={view === "archive"}
          onClick={() => onViewChange("archive")}
          label="▱　Archive"
          count={archivedCount}
        />
        <div className="section-label">Pinned projects</div>
        {projects.map((project, i) => (
          <button
            className="nav-item"
            key={project}
            onClick={() => onQueryChange(project)}
            aria-label={`Filter by ${project}`}
          >
            <span
              style={{
                color: i === 0 ? "#b4f1be" : i === 1 ? "#8d9199" : "#ffdcc1",
              }}
            >
              ●　{project}
            </span>
            <small className="mono">{[84, 19, 31][i]}</small>
          </button>
        ))}
      </nav>
      <div className="rail-bottom">
        <Nav
          active={view === "settings"}
          onClick={() => onViewChange("settings")}
          label="⚙　Settings"
        />
        <button
          className="nav-item"
          onClick={() => onThemeChange(theme === "dark" ? "light" : "dark")}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          ☾ Theme
        </button>
        <div className="profile">
          <div className="avatar">EV</div>
          <div>
            <b>Elena Vance</b>
            <div className="muted mono">Lead Architect</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export function MobileNav({
  onViewChange,
  onAdd,
}: {
  onViewChange: (view: string) => void;
  onAdd: () => void;
}) {
  return (
    <nav className="mobile-nav" aria-label="Mobile navigation">
      <button onClick={() => onViewChange("board")} aria-label="Board">
        ▦<br />
        Board
      </button>
      <button onClick={() => onViewChange("backlog")} aria-label="Backlog">
        ☷<br />
        Backlog
      </button>
      <button onClick={onAdd} aria-label="New ticket">
        ＋<br />
        New
      </button>
      <button onClick={() => onViewChange("settings")} aria-label="Settings">
        ⚙<br />
        Settings
      </button>
    </nav>
  );
}
