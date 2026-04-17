"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";

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

const emptyGame = (): GameItem => ({
  publisher: "",
  name: "",
  platform: "All platform",
  loginOption: "",
  warning: "",
  steps: [""],
  image: "",
  video: "",
});

export default function AdminPage() {
  const [games, setGames] = useState<GameItem[]>([]);
  const [search, setSearch] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: "ok" | "err" } | null>(null);
  const [loaded, setLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-load games.json hiện tại khi mở trang
  useEffect(() => {
    fetch("/mrb/data/games.json")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data.games)) {
          setGames(data.games);
        }
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  const showToast = useCallback((msg: string, type: "ok" | "err" = "ok") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }, []);

  const prettyJson = useMemo(
    () => JSON.stringify({ games }, null, 2),
    [games]
  );

  const filtered = useMemo(() => {
    if (!search.trim()) return games.map((g, i) => ({ g, i }));
    const q = search.toLowerCase();
    return games
      .map((g, i) => ({ g, i }))
      .filter(({ g }) =>
        g.name.toLowerCase().includes(q) ||
        g.publisher.toLowerCase().includes(q)
      );
  }, [games, search]);

  // CRUD
  const addGame = () => {
    setGames((prev) => [...prev, emptyGame()]);
    setExpandedIndex(games.length);
  };

  const removeGame = (index: number) => {
    if (!confirm(`Xóa game "${games[index]?.name || "chưa đặt tên"}"?`)) return;
    setGames((prev) => prev.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  const updateField = <K extends keyof GameItem>(
    index: number,
    field: K,
    value: GameItem[K]
  ) => {
    setGames((prev) =>
      prev.map((g, i) => (i === index ? { ...g, [field]: value } : g))
    );
  };

  const addStep = (index: number) => {
    setGames((prev) =>
      prev.map((g, i) =>
        i === index ? { ...g, steps: [...g.steps, ""] } : g
      )
    );
  };

  const updateStep = (gameIndex: number, stepIndex: number, value: string) => {
    setGames((prev) =>
      prev.map((g, i) =>
        i === gameIndex
          ? { ...g, steps: g.steps.map((s, si) => (si === stepIndex ? value : s)) }
          : g
      )
    );
  };

  const removeStep = (gameIndex: number, stepIndex: number) => {
    setGames((prev) =>
      prev.map((g, i) =>
        i === gameIndex
          ? { ...g, steps: g.steps.filter((_, si) => si !== stepIndex) }
          : g
      )
    );
  };

  // EXPORT
  const copyJson = () => {
    navigator.clipboard
      .writeText(prettyJson)
      .then(() => showToast("✔ Đã copy JSON!"))
      .catch(() => showToast("✖ Copy thất bại", "err"));
  };

  const downloadJson = () => {
    try {
      const blob = new Blob([prettyJson], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "games.json";
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 200);
      showToast("✔ Đã tải games.json!");
    } catch {
      showToast("✖ Không thể tải file. Hãy dùng Copy JSON.", "err");
    }
  };

  // IMPORT
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const parsed = JSON.parse(ev.target?.result as string);
        if (Array.isArray(parsed.games)) {
          if (
            games.length > 0 &&
            !confirm("Import sẽ ghi đè dữ liệu hiện tại. Tiếp tục?")
          ) return;
          setGames(parsed.games);
          setExpandedIndex(null);
          showToast(`✔ Đã import ${parsed.games.length} game!`);
        } else {
          showToast("✖ File JSON không đúng format (cần có games[])", "err");
        }
      } catch {
        showToast("✖ Lỗi parse JSON", "err");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="admin-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@400;500;600&display=swap');
        :root {
          --bg: #0a0a0f;
          --bg2: #12121a;
          --bg3: #1a1a28;
          --bg4: #20202f;
          --accent: #7c3aed;
          --accent2: #a855f7;
          --neon: #c084fc;
          --text: #e2e8f0;
          --muted: #64748b;
          --border: rgba(124,58,237,0.25);
          --gold: #f59e0b;
          --red: #ef4444;
          --green: #22c55e;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .admin-root {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
        }

        /* HEADER */
        .admin-header {
          background: rgba(18,18,26,0.98);
          border-bottom: 1px solid var(--border);
          padding: 14px 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(12px);
        }
        .admin-title {
          font-family: 'Orbitron', sans-serif;
          font-size: 16px;
          font-weight: 900;
          color: var(--neon);
          letter-spacing: 1px;
        }
        .header-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }
        .header-actions {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* BUTTONS */
        .btn {
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.5px;
          padding: 9px 14px;
          transition: opacity 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .btn:hover { opacity: 0.85; transform: scale(1.02); }
        .btn:active { transform: scale(0.98); }
        .btn-primary {
          background: linear-gradient(135deg, var(--accent), var(--accent2));
          color: #fff;
        }
        .btn-ghost {
          background: var(--bg3);
          border: 1px solid var(--border);
          color: var(--muted);
        }
        .btn-ghost:hover { border-color: var(--accent2); color: var(--text); }
        .btn-danger {
          background: rgba(239,68,68,0.12);
          border: 1px solid rgba(239,68,68,0.3);
          color: var(--red);
        }
        .btn-import {
          background: rgba(34,197,94,0.12);
          border: 1px solid rgba(34,197,94,0.3);
          color: var(--green);
        }

        /* LAYOUT */
        .admin-body {
          display: grid;
          grid-template-columns: 1fr 300px;
          height: calc(100vh - 65px);
        }
        @media (max-width: 900px) {
          .admin-body { grid-template-columns: 1fr; height: auto; }
          .json-panel { display: none; }
        }
        @media (max-width: 600px) {
          .admin-header { padding: 10px 14px; }
          .admin-title { font-size: 13px; }
          .btn { font-size: 10px; padding: 7px 10px; }
          .two-col { grid-template-columns: 1fr; }
        }

        /* GAME LIST PANEL */
        .game-list-panel {
          overflow-y: auto;
          padding: 20px;
          border-right: 1px solid var(--border);
        }
        .search-wrap {
          position: relative;
          margin-bottom: 16px;
        }
        .search-icon {
          position: absolute;
          left: 12px; top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
          font-size: 16px;
          pointer-events: none;
        }
        .search-input {
          background: var(--bg3);
          border: 1px solid var(--border);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 9px 14px 9px 36px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .search-input:focus { border-color: var(--accent2); }
        .search-input::placeholder { color: var(--muted); }

        /* GAME EDITOR CARD */
        .game-editor-card {
          background: var(--bg2);
          border: 1px solid var(--border);
          border-radius: 10px;
          margin-bottom: 10px;
          overflow: hidden;
          transition: border-color 0.2s;
        }
        .game-editor-card.expanded { border-color: var(--accent2); }
        .card-header-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 14px;
          cursor: pointer;
          user-select: none;
        }
        .card-header-row:hover { background: rgba(124,58,237,0.05); }
        .card-index {
          background: var(--accent);
          border-radius: 4px;
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          min-width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .card-title-info { flex: 1; min-width: 0; }
        .card-game-name {
          font-family: 'Orbitron', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: var(--text);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .card-sub {
          font-size: 12px;
          color: var(--muted);
          margin-top: 2px;
        }
        .chevron {
          color: var(--muted);
          font-size: 11px;
          transition: transform 0.2s;
          flex-shrink: 0;
        }
        .chevron.open { transform: rotate(180deg); }
        .card-edit-body {
          padding: 16px;
          border-top: 1px solid var(--border);
        }

        /* FORM */
        .field-group { margin-bottom: 14px; }
        .field-label {
          color: var(--muted);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 6px;
          display: block;
        }
        .field-input {
          background: var(--bg3);
          border: 1px solid rgba(100,116,139,0.25);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 9px 12px;
          outline: none;
          transition: border-color 0.2s;
          width: 100%;
        }
        .field-input:focus { border-color: var(--accent2); }
        .field-input::placeholder { color: var(--muted); }
        .field-select {
          background: var(--bg3);
          border: 1px solid rgba(100,116,139,0.25);
          border-radius: 6px;
          color: var(--text);
          font-family: 'Rajdhani', sans-serif;
          font-size: 15px;
          font-weight: 500;
          padding: 9px 12px;
          outline: none;
          cursor: pointer;
          width: 100%;
        }
        .field-select option { background: var(--bg3); }
        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* STEPS */
        .steps-editor { display: flex; flex-direction: column; gap: 8px; }
        .steps-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .step-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .step-num {
          background: var(--accent);
          border-radius: 4px;
          color: #fff;
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          min-width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .remove-step-btn {
          background: none;
          border: none;
          color: var(--red);
          cursor: pointer;
          font-size: 18px;
          padding: 0 2px;
          line-height: 1;
          opacity: 0.6;
          transition: opacity 0.2s;
          flex-shrink: 0;
        }
        .remove-step-btn:hover { opacity: 1; }

        /* JSON PANEL */
        .json-panel {
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          background: var(--bg);
        }
        .json-panel-header {
          padding: 12px 16px;
          border-bottom: 1px solid var(--border);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 1px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: sticky;
          top: 0;
          background: var(--bg);
          z-index: 1;
        }
        .json-pre {
          flex: 1;
          margin: 0;
          padding: 16px;
          font-family: 'Courier New', monospace;
          font-size: 11px;
          line-height: 1.6;
          color: #64748b;
          background: none;
          white-space: pre;
          overflow: auto;
        }

        /* TOAST */
        .toast {
          position: fixed;
          bottom: 24px; right: 24px;
          z-index: 9999;
          padding: 12px 20px;
          border-radius: 8px;
          font-family: 'Orbitron', sans-serif;
          font-size: 12px;
          font-weight: 700;
          animation: slideUp 0.3s ease;
          pointer-events: none;
        }
        .toast-ok {
          background: rgba(34,197,94,0.15);
          border: 1px solid rgba(34,197,94,0.4);
          color: var(--green);
        }
        .toast-err {
          background: rgba(239,68,68,0.15);
          border: 1px solid rgba(239,68,68,0.4);
          color: var(--red);
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .back-link {
          color: var(--muted);
          text-decoration: none;
          font-family: 'Orbitron', sans-serif;
          font-size: 11px;
          font-weight: 700;
          transition: color 0.2s;
        }
        .back-link:hover { color: var(--neon); }

        .count-pill {
          background: rgba(124,58,237,0.2);
          border: 1px solid var(--border);
          border-radius: 20px;
          color: var(--accent2);
          font-family: 'Orbitron', sans-serif;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 12px;
        }
      `}</style>

      {/* HIDDEN FILE INPUT */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json,application/json"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* TOAST */}
      {toast && (
        <div className={`toast ${toast.type === "ok" ? "toast-ok" : "toast-err"}`}>
          {toast.msg}
        </div>
      )}

      {/* HEADER */}
      <div className="admin-header">
        <div className="header-left">
          <a href="/mrb/" className="back-link">← HOME</a>
          <span className="admin-title">⚙ ADMIN</span>
          <span className="count-pill">{games.length} GAMES</span>
        </div>
        <div className="header-actions">
          <button className="btn btn-import" onClick={handleImportClick}>
            ↑ IMPORT
          </button>
          <button className="btn btn-ghost" onClick={copyJson}>
            ⎘ COPY JSON
          </button>
          <button className="btn btn-ghost" onClick={downloadJson}>
            ↓ TẢI JSON
          </button>
          <button className="btn btn-primary" onClick={addGame}>
            + THÊM GAME
          </button>
        </div>
      </div>

      {/* BODY */}
      <div className="admin-body">

        {/* LEFT — GAME LIST */}
        <div className="game-list-panel">

          {!loaded && (
            <div style={{
              textAlign: "center", padding: 60,
              color: "var(--muted)", fontFamily: "Orbitron", fontSize: 13
            }}>
              LOADING...
            </div>
          )}

          {loaded && (
            <>
              {/* SEARCH */}
              <div className="search-wrap">
                <span className="search-icon">⌕</span>
                <input
                  className="search-input"
                  placeholder="Tìm game theo tên hoặc publisher..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>

              {/* EMPTY STATE */}
              {filtered.length === 0 && (
                <div style={{
                  textAlign: "center", padding: 40,
                  color: "var(--muted)", fontFamily: "Orbitron", fontSize: 12
                }}>
                  {games.length === 0
                    ? "Chưa có game nào. Nhấn + THÊM GAME."
                    : "Không tìm thấy game nào."}
                </div>
              )}

              {/* GAME CARDS */}
              {filtered.map(({ g, i }) => (
                <div
                  key={i}
                  className={`game-editor-card${expandedIndex === i ? " expanded" : ""}`}
                >
                  {/* CARD HEADER */}
                  <div
                    className="card-header-row"
                    onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                  >
                    <span className="card-index">{i + 1}</span>
                    <div className="card-title-info">
                      <div className="card-game-name">
                        {g.name || "(Chưa đặt tên)"}
                      </div>
                      <div className="card-sub">
                        {g.publisher || "—"} · {g.platform}
                      </div>
                    </div>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "5px 10px", fontSize: 10 }}
                      onClick={(e) => { e.stopPropagation(); removeGame(i); }}
                    >
                      XÓA
                    </button>
                    <span className={`chevron${expandedIndex === i ? " open" : ""}`}>▼</span>
                  </div>

                  {/* EDIT BODY */}
                  {expandedIndex === i && (
                    <div className="card-edit-body">

                      <div className="two-col">
                        <div className="field-group">
                          <label className="field-label">Publisher</label>
                          <input
                            className="field-input"
                            value={g.publisher}
                            onChange={(e) => updateField(i, "publisher", e.target.value)}
                            placeholder="IGG, Garena..."
                          />
                        </div>
                        <div className="field-group">
                          <label className="field-label">Tên game</label>
                          <input
                            className="field-input"
                            value={g.name}
                            onChange={(e) => updateField(i, "name", e.target.value)}
                            placeholder="Lords Mobile..."
                          />
                        </div>
                      </div>

                      <div className="two-col">
                        <div className="field-group">
                          <label className="field-label">Platform</label>
                          <select
                            className="field-select"
                            value={g.platform}
                            onChange={(e) => updateField(i, "platform", e.target.value)}
                          >
                            {PLATFORMS.map((p) => (
                              <option key={p} value={p}>{p}</option>
                            ))}
                          </select>
                        </div>
                        <div className="field-group">
                          <label className="field-label">Login Option</label>
                          <input
                            className="field-input"
                            value={g.loginOption}
                            onChange={(e) => updateField(i, "loginOption", e.target.value)}
                            placeholder="Unlink, Facebook..."
                          />
                        </div>
                      </div>

                      <div className="field-group">
                        <label className="field-label">Cảnh báo</label>
                        <input
                          className="field-input"
                          value={g.warning}
                          onChange={(e) => updateField(i, "warning", e.target.value)}
                          placeholder="Lưu ý quan trọng..."
                        />
                      </div>

                      <div className="field-group">
                        <label className="field-label">URL Ảnh</label>
                        <input
                          className="field-input"
                          value={g.image}
                          onChange={(e) => updateField(i, "image", e.target.value)}
                          placeholder="https://..."
                        />
                      </div>

                      <div className="field-group">
                        <label className="field-label">URL Video (YouTube embed)</label>
                        <input
                          className="field-input"
                          value={g.video}
                          onChange={(e) => updateField(i, "video", e.target.value)}
                          placeholder="https://www.youtube.com/embed/..."
                        />
                      </div>

                      {/* STEPS */}
                      <div className="field-group">
                        <div className="steps-label-row">
                          <label className="field-label" style={{ margin: 0 }}>
                            Các bước
                          </label>
                          <button
                            className="btn btn-ghost"
                            style={{ padding: "4px 10px", fontSize: 10 }}
                            onClick={() => addStep(i)}
                          >
                            + THÊM BƯỚC
                          </button>
                        </div>
                        <div className="steps-editor">
                          {g.steps.length === 0 && (
                            <div style={{
                              color: "var(--muted)",
                              fontSize: 13,
                              fontStyle: "italic"
                            }}>
                              Chưa có bước nào.
                            </div>
                          )}
                          {g.steps.map((s, si) => (
                            <div className="step-row" key={si}>
                              <span className="step-num">{si + 1}</span>
                              <input
                                className="field-input"
                                style={{ marginBottom: 0 }}
                                value={s}
                                onChange={(e) => updateStep(i, si, e.target.value)}
                                placeholder={`Bước ${si + 1}...`}
                              />
                              <button
                                className="remove-step-btn"
                                onClick={() => removeStep(i, si)}
                                title="Xóa bước"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </>
          )}
        </div>

        {/* RIGHT — JSON PREVIEW */}
        <div className="json-panel">
          <div className="json-panel-header">
            <span>JSON PREVIEW</span>
            <button
              className="btn btn-ghost"
              style={{ padding: "4px 10px", fontSize: 10 }}
              onClick={copyJson}
            >
              COPY
            </button>
          </div>
          <pre className="json-pre">{prettyJson}</pre>
        </div>

      </div>
    </div>
  );
}
