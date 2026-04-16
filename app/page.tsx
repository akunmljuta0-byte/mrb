"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";

type GameItem = {
  publisher: string;
  name: string;
  platform: string;
  loginOption: string;
  warning: string;
  steps: string[];
  image: string;
  video: string;
};

const PLATFORMS = ["All platform", "Android", "iOS", "PC", "Steam", "PS5"];

export default function HomePage() {
  const [games, setGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("Tất cả");
  const [publisherFilter, setPublisherFilter] = useState("Tất cả");

  useEffect(() => {
    fetch("/mrb/data/games.json")
      .then((r) => r.json())
      .then((data) => {
        setGames(data.games ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const publishers = useMemo(() => {
    const set = new Set(games.map((g) => g.publisher));
    return ["Tất cả", ...Array.from(set)];
  }, [games]);

  const filtered = useMemo(() => {
    return games.filter((g) => {
      const matchSearch =
        search.trim() === "" ||
        g.name.toLowerCase().includes(search.toLowerCase()) ||
        g.publisher.toLowerCase().includes(search.toLowerCase());
      const matchPlatform =
        platformFilter === "Tất cả" || g.platform === platformFilter;
      const matchPublisher =
        publisherFilter === "Tất cả" || g.publisher === publisherFilter;
      return matchSearch && matchPlatform && matchPublisher;
    });
  }, [games, search, platformFilter, publisherFilter]);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--text)" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600&display=swap');
        :root {
          --bg: #0a0a0f;
          --bg2: #12121a;
          --bg3: #1a1a28;
          --accent: #7c3aed;
          --accent2: #a855f7;
          --neon: #c084fc;
          --text: #e2e8f0;
          --muted: #94a3b8;
          --border: rgba(124,58,237,0.3);
          --card: rgba(18,18,26,0.9);
          --gold: #f59e0b;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Rajdhani', sans-serif; }
        .orbitron { font-family: 'Orbitron', sans-serif; }

        .hero-bg {
          background: linear-gradient(135deg, #0a0a0f 0%, #0f0a1f 50%, #0a0a0f 100%);
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.12) 0%, transparent 60%),
                      radial-gradient(ellipse at 70% 60%, rgba(168,85,247,0.08) 0%, transparent 60%);
          pointer-events: none;
        }
        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(124,58,237,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(124,58,237,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
          pointer-events: none;
        }

        .search-input {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 8px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 16px;
          font-weight: 500;
          padding: 12px 18px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          width: 100%;
        }
        .search-input:focus {
          border-color: var(--accent2);
          box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
        }
        .search-input::placeholder { color: var(--muted); }

        .filter-btn {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--muted);
          cursor: pointer;
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 16px;
          transition: all 0.2s;
          white-space: nowrap;
        }
        .filter-btn:hover { border-color: var(--accent2); color: var(--text); }
        .filter-btn.active {
          background: var(--accent);
          border-color: var(--accent2);
          color: #fff;
        }

        .select-filter {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 14px;
          font-weight: 600;
          padding: 8px 12px;
          outline: none;
          cursor: pointer;
        }
        .select-filter:focus { border-color: var(--accent2); }
        .select-filter option { background: var(--bg3); }

        .game-card {
          background: var(--card);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
          display: flex;
          flex-direction: column;
          backdrop-filter: blur(10px);
        }
        .game-card:hover {
          transform: translateY(-4px);
          border-color: var(--accent2);
          box-shadow: 0 8px 32px rgba(124,58,237,0.25);
        }
        .card-img-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 16/9;
          overflow: hidden;
          background: var(--bg3);
        }
        .card-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.4s;
        }
        .game-card:hover .card-img-wrap img { transform: scale(1.05); }
        .platform-badge {
          position: absolute;
          top: 10px; right: 10px;
          background: rgba(10,10,15,0.85);
          border: 1px solid var(--border);
          border-radius: 4px;
          color: var(--neon);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          letter-spacing: 0.5px;
          backdrop-filter: blur(4px);
        }
        .card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex: 1;
          gap: 10px;
        }
        .card-publisher {
          color: var(--accent2);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .card-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 15px;
          font-weight: 700;
          color: var(--text);
          line-height: 1.3;
        }
        .login-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(124,58,237,0.15);
          border: 1px solid rgba(124,58,237,0.3);
          border-radius: 4px;
          color: var(--neon);
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          width: fit-content;
        }
        .warning-box {
          background: rgba(245,158,11,0.08);
          border-left: 3px solid var(--gold);
          border-radius: 0 4px 4px 0;
          color: #fbbf24;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 10px;
          line-height: 1.4;
        }
        .steps-mini {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .steps-mini-label {
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 2px;
        }
        .step-item-mini {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: var(--muted);
        }
        .step-num-mini {
          background: var(--accent);
          border-radius: 3px;
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-size: 9px;
          font-weight: 700;
          min-width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .detail-btn {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          border: none;
          border-radius: 6px;
          color: #fff;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 10px;
          text-align: center;
          text-decoration: none;
          transition: opacity 0.2s, transform 0.2s;
          display: block;
          margin-top: auto;
        }
        .detail-btn:hover { opacity: 0.85; transform: scale(1.02); }

        .empty-state {
          text-align: center;
          padding: 80px 20px;
          color: var(--muted);
        }

        .count-badge {
          background: rgba(124,58,237,0.2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--accent2);
          font-family: 'Orbitron', sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 4px 14px;
        }

        @media (max-width: 640px) {
          .filter-row { flex-wrap: wrap; }
          .platform-scroll { overflow-x: auto; padding-bottom: 8px; }
        }
      `}</style>

      {/* HERO HEADER */}
      <div className="hero-bg" style={{ padding: "60px 20px 40px" }}>
        <div className="grid-overlay" />
        <div style={{ position: "relative", maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ color: "var(--accent2)", fontFamily: "Orbitron", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
              ▸ GAME GUIDE SYSTEM
            </span>
          </div>
          <h1 className="orbitron" style={{ fontSize: "clamp(28px, 5vw, 52px)", fontWeight: 900, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>
            HƯỚNG DẪN{" "}
            <span style={{ background: "linear-gradient(90deg, #7c3aed, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ĐĂNG NHẬP GAME
            </span>
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 16, fontWeight: 500, maxWidth: 480, margin: "0 auto 32px" }}>
            Hướng dẫn chi tiết từng bước đăng nhập cho các tựa game phổ biến
          </p>

          {/* SEARCH */}
          <div style={{ maxWidth: 520, margin: "0 auto 24px", position: "relative" }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--muted)", fontSize: 18 }}>⌕</span>
            <input
              className="search-input"
              placeholder="Tìm kiếm game..."
              style={{ paddingLeft: 44 }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* FILTERS */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
            <div className="platform-scroll" style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {["Tất cả", ...PLATFORMS].map((p) => (
                <button
                  key={p}
                  className={`filter-btn${platformFilter === p ? " active" : ""}`}
                  onClick={() => setPlatformFilter(p)}
                >
                  {p}
                </button>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ color: "var(--muted)", fontSize: 13, fontWeight: 600 }}>Publisher:</span>
              <select
                className="select-filter"
                value={publisherFilter}
                onChange={(e) => setPublisherFilter(e.target.value)}
              >
                {publishers.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "32px 20px" }}>
        {/* COUNT + ADMIN LINK */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="orbitron" style={{ color: "var(--text)", fontWeight: 700, fontSize: 15 }}>
              DANH SÁCH GAME
            </span>
            <span className="count-badge">{filtered.length} game</span>
          </div>
          <Link
            href="/admin"
            style={{
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              color: "var(--muted)",
              fontSize: 13,
              fontFamily: "Orbitron",
              fontWeight: 700,
              padding: "8px 16px",
              textDecoration: "none",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            ⚙ ADMIN
          </Link>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: 80, color: "var(--muted)", fontFamily: "Orbitron", fontSize: 14 }}>
            LOADING...
          </div>
        )}

        {/* EMPTY */}
        {!loading && filtered.length === 0 && (
          <div className="empty-state">
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎮</div>
            <div className="orbitron" style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Không tìm thấy game</div>
            <div style={{ fontSize: 14 }}>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</div>
          </div>
        )}

        {/* GRID */}
        {!loading && filtered.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 20,
          }}>
            {filtered.map((game, i) => (
              <div className="game-card" key={i}>
                <div className="card-img-wrap">
                  {game.image ? (
                    <img src={game.image} alt={game.name} loading="lazy" />
                  ) : (
                    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #1a1a28, #0f0a1f)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 48 }}>🎮</span>
                    </div>
                  )}
                  <span className="platform-badge">{game.platform}</span>
                </div>
                <div className="card-body">
                  <div className="card-publisher">{game.publisher}</div>
                  <div className="card-name">{game.name}</div>
                  <div className="login-tag">
                    <span>🔑</span>
                    {game.loginOption}
                  </div>
                  {game.warning && (
                    <div className="warning-box">⚠ {game.warning}</div>
                  )}
                  {game.steps.length > 0 && (
                    <div className="steps-mini">
                      <div className="steps-mini-label">Các bước</div>
                      {game.steps.slice(0, 3).map((s, si) => (
                        <div className="step-item-mini" key={si}>
                          <span className="step-num-mini">{si + 1}</span>
                          <span>{s}</span>
                        </div>
                      ))}
                      {game.steps.length > 3 && (
                        <div style={{ color: "var(--accent2)", fontSize: 12, fontWeight: 600, marginTop: 2 }}>
                          +{game.steps.length - 3} bước nữa...
                        </div>
                      )}
                    </div>
                  )}
                  <Link
                    href={`/game/${encodeURIComponent(game.publisher)}/${encodeURIComponent(game.name)}`}
                    className="detail-btn"
                    style={{ display: "block", marginTop: "auto" }}
                  >
                    XEM CHI TIẾT →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div style={{ borderTop: "1px solid var(--border)", padding: "24px 20px", textAlign: "center", color: "var(--muted)", fontSize: 13 }}>
        <span className="orbitron" style={{ color: "var(--accent2)", fontWeight: 700 }}>GAME GUIDE SYSTEM</span>
        {" "}— Hướng dẫn đăng nhập game
      </div>
    </div>
  );
}
