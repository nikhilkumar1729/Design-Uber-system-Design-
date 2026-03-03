import { useState } from "react";

const sections = [
  {
    id: "overview",
    title: "🏗️ System Overview",
    color: "#1a1a2e",
    accent: "#00d4aa",
    content: {
      description: "Uber is a real-time, geo-distributed ride-hailing platform operating at massive scale — 100M+ monthly active users, 15M+ daily trips, across 70+ countries.",
      stats: [
        { label: "Daily Trips", value: "15M+" },
        { label: "Active Drivers", value: "5M+" },
        { label: "MAU", value: "100M+" },
        { label: "Countries", value: "70+" },
      ],
    },
  },
  {
    id: "frontend",
    title: "📱 Frontend Architecture",
    color: "#16213e",
    accent: "#4cc9f0",
    subsections: [
      {
        title: "Rider App (React Native / Swift / Kotlin)",
        items: [
          "Map Integration — Google Maps SDK / Mapbox for real-time tracking",
          "WebSockets — Live driver location updates every 3–5 seconds",
          "Optimistic UI — Instant feedback before server confirmation",
          "Offline-first — Local cache with Redux Persist / Zustand",
          "Push Notifications — FCM / APNs for trip alerts",
          "Deep Linking — Universal links for promo codes, referrals",
          "Payment UI — Stripe SDK, Apple Pay, Google Pay integration",
        ],
      },
      {
        title: "Driver App (React Native / Native)",
        items: [
          "Background Location — Foreground service with GPS batching",
          "Trip State Machine — IDLE → DISPATCHED → EN_ROUTE → ARRIVED → IN_TRIP → COMPLETED",
          "Earnings Dashboard — Real-time surge, weekly/daily totals",
          "Navigation — Waze/Google Maps deep link or embedded turn-by-turn",
          "Offline Queue — Cache accepted trips when network drops",
        ],
      },
      {
        title: "Web Dashboard (React + TypeScript)",
        items: [
          "Admin Panel — Trip management, user support, fraud flags",
          "Analytics — Real-time Grafana dashboards embedded",
          "Fleet Management — Driver onboarding, document verification",
        ],
      },
    ],
  },
  {
    id: "backend",
    title: "⚙️ Backend Microservices",
    color: "#0f3460",
    accent: "#f72585",
    subsections: [
      {
        title: "Core Services",
        items: [
          "Auth Service — JWT + OAuth2, refresh tokens, biometric login",
          "User Service — Profiles, preferences, KYC verification",
          "Trip Service — Trip lifecycle CRUD, state machine management",
          "Matching Service — Geospatial driver-rider matching (H3 hexagons)",
          "Pricing Service — Surge pricing, fare estimation, promo codes",
          "Payment Service — Stripe/Braintree, escrow, payouts, fraud detection",
          "Notification Service — SMS (Twilio), Push (FCM/APNs), Email (SendGrid)",
          "Rating Service — Post-trip ratings, rolling averages, ban logic",
          "Maps/Routing Service — ETA computation, route optimization (OSRM)",
        ],
      },
      {
        title: "Platform Services",
        items: [
          "API Gateway — Kong / AWS API Gateway, rate limiting, auth middleware",
          "Service Mesh — Istio / Envoy for mTLS, circuit breaking, retries",
          "Config Service — Feature flags (LaunchDarkly), dynamic config",
          "Audit Service — Immutable event log for compliance",
        ],
      },
    ],
  },
  {
    id: "matching",
    title: "🎯 Matching & Dispatch Engine",
    color: "#1a1a2e",
    accent: "#ffb703",
    subsections: [
      {
        title: "Algorithm Design",
        items: [
          "Geo-indexing with Uber H3 hexagonal hierarchy (res 7–9)",
          "Supply quadtree — O(log n) nearest driver queries",
          "Batch matching every 5s — Hungarian Algorithm for optimal assignment",
          "ETA scoring — Balance proximity vs driver rating vs vehicle type",
          "Surge zones — Real-time demand/supply ratio per H3 cell",
          "Dispatch timeout — Re-offer to next driver after 15s",
        ],
      },
      {
        title: "Location Pipeline",
        items: [
          "Driver heartbeat — GPS ping every 4 seconds via UDP",
          "Kafka ingestion — location-updates topic, 100K+ events/sec",
          "Stream processing — Apache Flink for moving average smoothing",
          "Redis Geo — GEOADD/GEORADIUS for live driver lookup < 5ms",
          "Kalman filtering — Smooth GPS noise for display",
        ],
      },
    ],
  },
  {
    id: "data",
    title: "🗄️ Data Architecture",
    color: "#16213e",
    accent: "#06d6a0",
    subsections: [
      {
        title: "Databases by Use Case",
        items: [
          "PostgreSQL (+ Citus) — User profiles, trip history, payments (ACID)",
          "Redis Cluster — Driver locations, sessions, surge cache, rate limits",
          "Cassandra — Trip events, driver telemetry (write-heavy, time-series)",
          "Elasticsearch — Full-text search, trip/user lookup, fraud signals",
          "ClickHouse — OLAP analytics, fare analytics, business metrics",
          "S3 / GCS — Driver documents, receipts, map tiles, model artifacts",
        ],
      },
      {
        title: "Data Flow",
        items: [
          "Kafka — Central event bus (trip.created, payment.completed, etc.)",
          "Debezium CDC — PostgreSQL → Kafka for downstream consumers",
          "Apache Spark — Batch ETL, driver incentive computation",
          "dbt — Data transformation layer for warehouse",
          "Snowflake / BigQuery — Data warehouse for BI and ML features",
        ],
      },
    ],
  },
  {
    id: "infrastructure",
    title: "☁️ Infrastructure & DevOps",
    color: "#0f3460",
    accent: "#a78bfa",
    subsections: [
      {
        title: "Cloud & Compute",
        items: [
          "Multi-cloud — AWS primary, GCP for ML, Azure for enterprise",
          "Kubernetes (EKS) — Container orchestration, auto-scaling HPA/VPA",
          "Terraform — Infrastructure as Code for all cloud resources",
          "Helm Charts — Kubernetes service templating",
          "Spot/Preemptible — Non-critical batch workloads on spot instances",
          "Multi-region active-active — US-East, EU-West, AP-Southeast",
        ],
      },
      {
        title: "Networking & CDN",
        items: [
          "CloudFront / Fastly CDN — Static assets, map tiles globally",
          "AWS Global Accelerator — TCP/UDP anycast routing",
          "VPC Peering + PrivateLink — Secure inter-service communication",
          "BGP Anycast — GeoDNS for lowest-latency data center routing",
          "WAF — DDoS protection, SQL injection, bot mitigation",
        ],
      },
      {
        title: "CI/CD Pipeline",
        items: [
          "GitHub Actions / Jenkins — PR checks, unit + integration tests",
          "ArgoCD — GitOps continuous deployment to Kubernetes",
          "Canary releases — 1% → 10% → 100% traffic rollout",
          "Feature flags — Dark launch new features safely",
          "Automated rollback — P99 latency spike triggers auto-revert",
        ],
      },
    ],
  },
  {
    id: "realtime",
    title: "⚡ Real-Time Systems",
    color: "#1a1a2e",
    accent: "#fb5607",
    subsections: [
      {
        title: "Communication Layers",
        items: [
          "WebSocket Gateway — Socket.io / custom WS, 10M+ concurrent connections",
          "Long Polling fallback — For restrictive mobile networks",
          "MQTT — Lightweight pub/sub for IoT-class driver devices",
          "gRPC streaming — Service-to-service bidirectional streams",
          "Server-Sent Events — One-way trip status to riders",
        ],
      },
      {
        title: "Event Streaming",
        items: [
          "Apache Kafka — 1M+ events/sec, 7-day retention, partitioned by city",
          "Kafka Connect — Source/sink connectors to DBs and external APIs",
          "Schema Registry — Avro schemas, backward compatibility enforcement",
          "Dead Letter Queue — Failed event reprocessing with exponential backoff",
        ],
      },
    ],
  },
  {
    id: "ml",
    title: "🤖 ML & AI Systems",
    color: "#16213e",
    accent: "#ff006e",
    subsections: [
      {
        title: "ML Models in Production",
        items: [
          "Surge Pricing Model — Gradient boosted trees on demand/supply signals",
          "ETA Prediction — Deep learning on historical traffic + real-time GPS",
          "Fraud Detection — Graph neural networks on transaction patterns",
          "Driver Churn Prediction — Survival analysis + engagement scoring",
          "Destination Prediction — LSTM on partial trip GPS traces",
          "Route Optimization — Reinforcement learning for multi-stop routing",
        ],
      },
      {
        title: "MLOps Stack",
        items: [
          "Feature Store — Tecton / Feast for online+offline feature serving",
          "Model Registry — MLflow for versioning and lineage",
          "Training — SageMaker / Vertex AI, GPU clusters for DL models",
          "Serving — TorchServe / Triton Inference Server, p99 < 20ms",
          "Monitoring — Evidently AI for data drift, model performance decay",
          "A/B Testing — Multi-armed bandit for model rollout decisions",
        ],
      },
    ],
  },
  {
    id: "reliability",
    title: "🛡️ Reliability & Scalability",
    color: "#0f3460",
    accent: "#00b4d8",
    subsections: [
      {
        title: "High Availability",
        items: [
          "SLO: 99.99% uptime — 52 min downtime/year budget",
          "Circuit Breaker — Hystrix/Resilience4j per-service",
          "Bulkhead Pattern — Isolate critical path (match/dispatch)",
          "Chaos Engineering — Chaos Monkey, game days, fault injection",
          "Graceful degradation — Fallback to cached ETAs if live fails",
          "Multi-AZ deployments — No single datacenter SPOF",
        ],
      },
      {
        title: "Scalability",
        items: [
          "Horizontal pod autoscaling — CPU + custom Kafka lag metric",
          "Database read replicas — 5+ replicas for read-heavy services",
          "CQRS — Separate read/write models for trip queries",
          "Event Sourcing — Trip state rebuilt from immutable event log",
          "Sharding strategy — Geo-based sharding (city_id) for locality",
          "Rate limiting — Token bucket per user, leaky bucket per endpoint",
        ],
      },
    ],
  },
  {
    id: "security",
    title: "🔒 Security",
    color: "#1a1a2e",
    accent: "#e63946",
    subsections: [
      {
        title: "Auth & Data Security",
        items: [
          "Zero-trust architecture — Every service call verified",
          "mTLS — Mutual TLS between all microservices via Istio",
          "Secrets management — HashiCorp Vault, no hardcoded secrets",
          "PCI DSS — Tokenized card data, no raw PAN storage",
          "GDPR / CCPA — Data minimization, right-to-delete pipeline",
          "Encryption at rest — AES-256 for all PII fields",
          "Encryption in transit — TLS 1.3 everywhere",
        ],
      },
      {
        title: "Fraud & Safety",
        items: [
          "Driver background checks — 3rd party API integration (Checkr)",
          "Real-time trip monitoring — Anomaly detection on route deviation",
          "Safety toolkit — In-app emergency button → 911 + Uber Safety team",
          "Account takeover detection — Device fingerprinting + behavioral biometrics",
          "Promo abuse detection — Graph analysis of referral networks",
        ],
      },
    ],
  },
  {
    id: "observability",
    title: "📊 Observability",
    color: "#16213e",
    accent: "#80ffdb",
    subsections: [
      {
        title: "Monitoring Stack",
        items: [
          "Metrics — Prometheus + Grafana, 500+ dashboards",
          "Logs — ELK Stack (Elasticsearch + Logstash + Kibana)",
          "Traces — Jaeger / Zipkin distributed tracing, OpenTelemetry",
          "Alerting — PagerDuty, Slack on-call rotation, runbooks",
          "Uptime monitoring — Synthetic checks every 30s per region",
          "Error tracking — Sentry for frontend + backend exceptions",
          "Business metrics — Real-time trip funnel in Looker / Tableau",
        ],
      },
    ],
  },
];

export default function UberSystemDesign() {
  const [active, setActive] = useState("overview");
  const [expandedSub, setExpandedSub] = useState(null);

  const current = sections.find((s) => s.id === active);

  return (
    <div style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif", background: "#0a0a12", minHeight: "100vh", color: "#e0e0e0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #000000 0%, #1a0030 50%, #000a20 100%)", borderBottom: "1px solid #333", padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ background: "#000", borderRadius: 12, padding: "10px 16px", fontSize: 28 }}>🚗</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", color: "#fff" }}>
              Uber — Full Stack System Design
            </h1>
            <p style={{ margin: "4px 0 0", color: "#999", fontSize: 13 }}>
              End-to-end architecture across 11 domains · Production scale · 100M+ MAU
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 90px)" }}>
        {/* Sidebar */}
        <div style={{ width: 240, background: "#0d0d1a", borderRight: "1px solid #1e1e35", overflowY: "auto", flexShrink: 0 }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => { setActive(s.id); setExpandedSub(null); }}
              style={{
                display: "block", width: "100%", textAlign: "left",
                padding: "13px 20px", border: "none", cursor: "pointer",
                background: active === s.id ? "rgba(255,255,255,0.07)" : "transparent",
                borderLeft: active === s.id ? `3px solid ${s.accent}` : "3px solid transparent",
                color: active === s.id ? "#fff" : "#888",
                fontSize: 13, fontWeight: active === s.id ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              {s.title}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
          {current && (
            <>
              <div style={{ marginBottom: 28 }}>
                <h2 style={{ margin: 0, fontSize: 22, fontWeight: 800, color: current.accent }}>{current.title}</h2>
              </div>

              {/* Overview Section */}
              {current.content && (
                <div>
                  <p style={{ color: "#ccc", fontSize: 15, lineHeight: 1.7, maxWidth: 700, marginBottom: 28 }}>
                    {current.content.description}
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                    {current.content.stats.map((stat) => (
                      <div key={stat.label} style={{
                        background: "#13131f", border: `1px solid ${current.accent}33`,
                        borderRadius: 12, padding: "20px 16px", textAlign: "center"
                      }}>
                        <div style={{ fontSize: 28, fontWeight: 800, color: current.accent }}>{stat.value}</div>
                        <div style={{ fontSize: 12, color: "#888", marginTop: 4 }}>{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Architecture diagram */}
                  <div style={{ marginTop: 32, background: "#13131f", border: "1px solid #1e1e35", borderRadius: 16, padding: 28 }}>
                    <h3 style={{ color: "#fff", margin: "0 0 20px", fontSize: 15 }}>High-Level Architecture Flow</h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                      {["Rider/Driver App", "→", "CDN + WAF", "→", "API Gateway", "→", "Microservices", "→", "Kafka", "→", "Databases"].map((item, i) => (
                        <div key={i} style={{
                          background: item === "→" ? "transparent" : "#1e1e35",
                          color: item === "→" ? "#555" : "#e0e0e0",
                          padding: item === "→" ? "0 4px" : "8px 14px",
                          borderRadius: 8, fontSize: item === "→" ? 20 : 13, fontWeight: 500
                        }}>{item}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Subsections */}
              {current.subsections && current.subsections.map((sub, si) => (
                <div key={si} style={{ marginBottom: 20 }}>
                  <button
                    onClick={() => setExpandedSub(expandedSub === si ? null : si)}
                    style={{
                      width: "100%", textAlign: "left", padding: "16px 20px",
                      background: "#13131f", border: `1px solid ${expandedSub === si ? current.accent + "66" : "#1e1e35"}`,
                      borderRadius: expandedSub === si ? "12px 12px 0 0" : 12,
                      color: "#fff", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center"
                    }}
                  >
                    <span style={{ fontSize: 14, fontWeight: 600 }}>{sub.title}</span>
                    <span style={{ color: current.accent, fontSize: 18 }}>{expandedSub === si ? "−" : "+"}</span>
                  </button>
                  {expandedSub === si && (
                    <div style={{
                      background: "#0f0f1c", border: `1px solid ${current.accent}44`,
                      borderTop: "none", borderRadius: "0 0 12px 12px", padding: "4px 0 8px"
                    }}>
                      {sub.items.map((item, ii) => {
                        const [label, ...rest] = item.split(" — ");
                        return (
                          <div key={ii} style={{
                            display: "flex", gap: 12, padding: "11px 20px",
                            borderBottom: ii < sub.items.length - 1 ? "1px solid #1a1a2a" : "none"
                          }}>
                            <div style={{ width: 6, height: 6, background: current.accent, borderRadius: "50%", marginTop: 7, flexShrink: 0 }} />
                            <div>
                              <span style={{ color: current.accent, fontWeight: 600, fontSize: 13 }}>{label}</span>
                              {rest.length > 0 && <span style={{ color: "#999", fontSize: 13 }}> — {rest.join(" — ")}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
