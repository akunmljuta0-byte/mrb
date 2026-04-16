"use client";

import { useMemo, useState } from "react";

type GameItem = {
  id: string;
  name: string;
  desc: string;
};

type GamesData = {
  games: GameItem[];
};

const emptyGame = (): GameItem => ({
  id: "",
  name: "",
  desc: "",
});

export default function AdminPage() {
  const [games, setGames] = useState<GameItem[]>([
    {
      id: "1",
      name: "Game Demo",
      desc: "CMS hoạt động",
    },
  ]);

  const [copied, setCopied] = useState(false);

  const jsonOutput = useMemo<GamesData>(() => ({ games }), [games]);

  const prettyJson = useMemo(
    () => JSON.stringify(jsonOutput, null, 2),
    [jsonOutput]
  );

  function updateGame(index: number, key: keyof GameItem, value: string) {
    setGames((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }

  function addGame() {
    setGames((prev) => [...prev, emptyGame()]);
  }

  function removeGame(index: number) {
    setGames((prev) => prev.filter((_, i) => i !== index));
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(prettyJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  }

  function downloadJson() {
    const blob = new Blob([prettyJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "games.json";
    a.click();

    URL.revokeObjectURL(url);
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        Admin Form
      </h1>
      <p style={{ marginBottom: 24, color: "#555" }}>
        Nhập dữ liệu game, sau đó copy hoặc tải file <code>games.json</code> để
        cập nhật lên GitHub.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 24,
          alignItems: "start",
        }}
      >
        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 16,
            background: "#fff",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h2 style={{ fontSize: 22, fontWeight: 600 }}>Danh sách game</h2>
            <button
              onClick={addGame}
              style={{
                padding: "10px 14px",
                borderRadius: 8,
                border: "1px solid #222",
                background: "#111",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              + Thêm game
            </button>
          </div>

          {games.map((game, index) => (
            <div
              key={index}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 10,
                padding: 14,
                marginBottom: 14,
                background: "#fafafa",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <strong>Game #{index + 1}</strong>
                <button
                  onClick={() => removeGame(index)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: 6,
                    border: "1px solid #c00",
                    background: "#fff",
                    color: "#c00",
                    cursor: "pointer",
                  }}
                >
                  Xóa
                </button>
              </div>

              <label style={{ display: "block", marginBottom: 10 }}>
                <div style={{ marginBottom: 6 }}>ID</div>
                <input
                  value={game.id}
                  onChange={(e) => updateGame(index, "id", e.target.value)}
                  placeholder="vd: game-001"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "block", marginBottom: 10 }}>
                <div style={{ marginBottom: 6 }}>Tên game</div>
                <input
                  value={game.name}
                  onChange={(e) => updateGame(index, "name", e.target.value)}
                  placeholder="vd: Liên Quân"
                  style={inputStyle}
                />
              </label>

              <label style={{ display: "block" }}>
                <div style={{ marginBottom: 6 }}>Mô tả</div>
                <textarea
                  value={game.desc}
                  onChange={(e) => updateGame(index, "desc", e.target.value)}
                  placeholder="Mô tả ngắn"
                  rows={4}
                  style={textareaStyle}
                />
              </label>
            </div>
          ))}
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 12,
            padding: 16,
            background: "#fff",
            position: "sticky",
            top: 20,
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
            JSON output
          </h2>

          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <button onClick={copyJson} style={primaryBtn}>
              {copied ? "Đã copy" : "Copy JSON"}
            </button>

            <button onClick={downloadJson} style={secondaryBtn}>
              Tải games.json
            </button>
          </div>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#111",
              color: "#eaeaea",
              padding: 14,
              borderRadius: 10,
              minHeight: 360,
              fontSize: 13,
              overflow: "auto",
            }}
          >
            {prettyJson}
          </pre>

          <div
            style={{
              marginTop: 12,
              fontSize: 14,
              color: "#555",
              lineHeight: 1.6,
            }}
          >
            Cách dùng:
            <br />
            1. Nhập dữ liệu ở bên trái
            <br />
            2. Bấm <strong>Tải games.json</strong> hoặc <strong>Copy JSON</strong>
            <br />
            3. Thay nội dung file <code>public/data/games.json</code> trong repo
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14,
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14,
  resize: "vertical",
};

const primaryBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #111",
  background: "#111",
  color: "#fff",
  cursor: "pointer",
};

const secondaryBtn: React.CSSProperties = {
  padding: "10px 14px",
  borderRadius: 8,
  border: "1px solid #ccc",
  background: "#fff",
  color: "#111",
  cursor: "pointer",
};
