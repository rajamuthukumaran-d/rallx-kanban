export type Status = "backlog" | "todo" | "progress" | "review" | "done";
export type Ticket = {
  id: string;
  title: string;
  status: Status;
  priority: "urgent" | "high" | "medium" | "low";
  tags: string[];
  points: number;
  assignee: string;
  initials: string;
  due?: string;
  pr?: string;
  comments: number;
  attachments?: number;
  description: string;
};
export const columns: {
  id: Status;
  label: string;
  color: string;
  limit?: number;
}[] = [
  { id: "backlog", label: "Backlog", color: "#8d9199" },
  { id: "todo", label: "Todo", color: "#a8c7fa", limit: 8 },
  { id: "progress", label: "In Progress", color: "#ffdcc1", limit: 5 },
  { id: "review", label: "In Review", color: "#a8c7fa", limit: 4 },
  { id: "done", label: "Done", color: "#b4f1be" },
];
export const initialTickets: Ticket[] = [
  {
    id: "RLX-1055",
    title:
      "Upgrade Redis client to cluster topology mode with replica failover",
    status: "backlog",
    priority: "low",
    tags: ["infra"],
    points: 1,
    assignee: "Maya Chen",
    initials: "MC",
    comments: 2,
    description:
      "Move the Redis client to topology-aware connections and verify failover behavior.",
  },
  {
    id: "RLX-1051",
    title:
      "Refactor gRPC interceptor chain to isolate telemetry latency impact",
    status: "backlog",
    priority: "medium",
    tags: ["refactor"],
    points: 3,
    assignee: "Jon Doe",
    initials: "JD",
    comments: 1,
    description: "Separate telemetry interceptors from the request path.",
  },
  {
    id: "RLX-1048",
    title:
      "Deprecate legacy session tokens in favor of short-lived JWT grant tokens",
    status: "backlog",
    priority: "low",
    tags: ["auth"],
    points: 2,
    assignee: "Elena Vance",
    initials: "EV",
    comments: 0,
    description: "Remove legacy session token support after migration.",
  },
  {
    id: "RLX-1046",
    title:
      "Configure distributed trace propagation across multi-region edge gateways",
    status: "todo",
    priority: "urgent",
    tags: ["observability"],
    points: 5,
    assignee: "Elena Vance",
    initials: "EV",
    due: "Oct 27",
    comments: 4,
    description: "Configure W3C trace context propagation across edge regions.",
  },
  {
    id: "RLX-1045",
    title:
      "Automate key rotation schedule for KMS envelope encryption master keys",
    status: "todo",
    priority: "high",
    tags: ["security"],
    points: 3,
    assignee: "Sam Kim",
    initials: "SK",
    comments: 2,
    description: "Add scheduled rotation and alerting.",
  },
  {
    id: "RLX-1044",
    title: "Patch zero-copy memory buffer leak in socket ingest pooling worker",
    status: "progress",
    priority: "urgent",
    tags: ["runtime"],
    points: 8,
    assignee: "Marcus Brody",
    initials: "MB",
    pr: "#412 Draft",
    comments: 3,
    description:
      "Fix retained buffers in the ingest worker and add regression coverage.",
  },
  {
    id: "RLX-1043",
    title: "Update OpenTelemetry protobuf schemas to spec version v1.29",
    status: "progress",
    priority: "low",
    tags: ["telemetry"],
    points: 2,
    assignee: "Sam Kim",
    initials: "SK",
    comments: 1,
    description: "Regenerate schemas and update compatibility notes.",
  },
  {
    id: "RLX-1042",
    title: "Implement mTLS gateway termination for gRPC services",
    status: "review",
    priority: "urgent",
    tags: ["security", "gateway"],
    points: 5,
    assignee: "Elena Vance",
    initials: "EV",
    pr: "#892",
    comments: 6,
    attachments: 2,
    description:
      "Implement mutual TLS authentication across public edge ingest gateways. Inbound traffic requires a valid x509 client certificate validated against the company root CA.",
  },
  {
    id: "RLX-1037",
    title:
      "Automate PostgreSQL read replica autoscaling based on WAL replay lag",
    status: "review",
    priority: "medium",
    tags: ["database"],
    points: 3,
    assignee: "Alex Lee",
    initials: "AL",
    pr: "#889",
    comments: 2,
    description: "Scale replicas using WAL lag metrics.",
  },
  {
    id: "RLX-1033",
    title: "Roll out OpenTelemetry trace agent to staging cluster",
    status: "done",
    priority: "low",
    tags: ["observability"],
    points: 3,
    assignee: "Elena Vance",
    initials: "EV",
    pr: "#884 Merged",
    comments: 2,
    description: "Deploy the trace agent to staging.",
  },
  {
    id: "RLX-1030",
    title: "Increase ingress buffer queue timeout to 4500ms",
    status: "done",
    priority: "low",
    tags: ["infra"],
    points: 1,
    assignee: "Elena Vance",
    initials: "EV",
    pr: "#881 Merged",
    comments: 1,
    description: "Tune ingress queue timeout.",
  },
];
