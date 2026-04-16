"use client";

import { useMemo, useState } from "react";

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

type GamesData = {
  games: GameItem[];
};

const createEmptyGame = (): GameItem => ({
  publisher: "",
  name: "",
  platform: "All platform",
  loginOption: "Unlink",
  warning: "",
  steps: ["", "", ""],
  image: "",
  video: "",
});

export default function AdminPage() {
  const [games, setGames] = useState<GameItem[]>([
    {
      publisher: "IGG",
      name: "Lords Mobile",
      platform: "Android",
      loginOption: "Unlink",
      warning: "Không chia sẻ tài khoản cho người khác.",
      steps: ["Mở game", "Chọn đăng nhập", "Nhập tài khoản"],
      image: "https://via.placeholder.com/600x300?text=Lords+Mobile",
      video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
  ]);

  const [copied, setCopied] = useState(false);

  const jsonOutput = useMemo<GamesData>(() => ({ games }), [games]);
  const prettyJson = useMemo(
    () => JSON.stringify(jsonOutput, null, 2),
    [jsonOutput]
  );

  function updateField(index: number, key: keyof GameItem, value: string) {
    setGames((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [key]: value };
      return next;
    });
  }

  function updateStep(index: number, stepIndex: number, value: string) {
    setGames((prev) => {
      const next = [...prev];
      const nextSteps = [...next[index].steps];
      nextSteps[stepIndex] = value;
      next[index] = { ...next[index], steps: nextSteps };
      return next;
    });
  }

  function addGame() {
    setGames((prev) => [...prev, createEmptyGame()]);
  }

  function removeGame(index: number) {
    setGames((prev) => prev.filter((_, i) => i !== index));
  }

  async function copyJson() {
    try {
      await navigator.clipboard.writeText(prettyJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
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
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginBottom: 8 }}>
        Admin Form Pro v99 hướng dẫn
      </h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Hướng dẫn nhập nội dung game, tải file <code>games.json</code> và cập nhật vào
        <code> public/data/games.json</code>.
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
            borderRadius: 14,
            padding: 16,
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2 style={{ fontSize: 24, fontWeight: 700 }}>Danh sách game</h2>
            <button onClick={addGame} style={primaryBtn} type="button">
              + Thêm game
            </button>
          </div>

          {games.map((game, index) => (
            <div
              key={`${game.publisher}-${game.name}-${index}`}
              style={{
                border: "1px solid #e5e5e5",
                borderRadius: 12,
                padding: 16,
                marginBottom: 16,
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 12,
                }}
              >
                <strong>Game #{index + 1}</strong>
                <button
                  onClick={() => removeGame(index)}
                  style={dangerBtn}
                  type="button"
                >
                  Xóa
                </button>
              </div>

              <Label title="Publisher">
                <input
                  value={game.publisher}
                  onChange={(e) =>
                    updateField(index, "publisher", e.target.value)
                  }
                  style={inputStyle}
                  placeholder="VD: IGG, Garena, Tencent"
                />
              </Label>

              <Label title="Tên game">
                <input
                  value={game.name}
                  onChange={(e) => updateField(index, "name", e.target.value)}
                  style={inputStyle}
                  placeholder="Tên game"
                />
              </Label>

              <Label title="Platform">
                <select
                  value={game.platform}
                  onChange={(e) =>
                    updateField(index, "platform", e.target.value)
                  }
                  style={inputStyle}
                >
                  <option>All platform</option>
                  <option>Android</option>
                  <option>iOS</option>
                  <option>PC</option>
                  <option>Steam</option>
                  <option>PS5</option>
                </select>
              </Label>

              <Label title="Login option">
                <select
                  value={game.loginOption}
                  onChange={(e) =>
                    updateField(index, "loginOption", e.target.value)
                  }
                  style={inputStyle}
                >
                  <option>Unlink</option>
                  <option>Not unlink</option>
                  <option>Login by other ways</option>
                </select>
              </Label>

              <Label title="Warning">
                <textarea
                  value={game.warning}
                  onChange={(e) =>
                    updateField(index, "warning", e.target.value)
                  }
                  rows={3}
                  style={textareaStyle}
                  placeholder="Nội dung cảnh báo"
                />
              </Label>

              <div style={{ marginBottom: 12 }}>
                <div style={labelTitle}>Step 1</div>
                <input
                  value={game.steps[0] || ""}
                  onChange={(e) => updateStep(index, 0, e.target.value)}
                  style={inputStyle}
                  placeholder="Bước 1"
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={labelTitle}>Step 2</div>
                <input
                  value={game.steps[1] || ""}
                  onChange={(e) => updateStep(index, 1, e.target.value)}
                  style={inputStyle}
                  placeholder="Bước 2"
                />
              </div>

              <div style={{ marginBottom: 12 }}>
                <div style={labelTitle}>Step 3</div>
                <input
                  value={game.steps[2] || ""}
                  onChange={(e) => updateStep(index, 2, e.target.value)}
                  style={inputStyle}
                  placeholder="Bước 3"
                />
              </div>

              <Label title="Image URL">
                <input
                  value={game.image}
                  onChange={(e) => updateField(index, "image", e.target.value)}
                  style={inputStyle}
                  placeholder="https://..."
                />
              </Label>

              <Label title="Video URL (embed)">
                <input
                  value={game.video}
                  onChange={(e) => updateField(index, "video", e.target.value)}
                  style={inputStyle}
                  placeholder="https://www.youtube.com/embed/..."
                />
              </Label>
            </div>
          ))}
        </div>

        <div
          style={{
            border: "1px solid #ddd",
            borderRadius: 14,
            padding: 16,
            background: "#fff",
            position: "sticky",
            top: 20,
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 12 }}>
            JSON output
          </h2>

          <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <button onClick={copyJson} style={primaryBtn} type="button">
              {copied ? "Đã copy" : "Copy JSON"}
            </button>
            <button onClick={downloadJson} style={secondaryBtn} type="button">
              Tải games.json
            </button>
          </div>

          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              background: "#0b0b0b",
              color: "#f5f5f5",
              padding: 14,
              borderRadius: 12,
              minHeight: 420,
              fontSize: 13,
              overflow: "auto",
            }}
          >
            {prettyJson}
          </pre>

          <div style={{ marginTop: 14, color: "#555", lineHeight: 1.7 }}>
            1. Nhập dữ liệu ở cột trái
            <br />
            2. Bấm tải file <strong>games.json</strong>
            <br />
            3. Thay nội dung file <code>public/data/games.json</code>
            <br />
            4. GitHub sẽ tự deploy lại website
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <label style={{ display: "block", marginBottom: 12 }}>
      <div style={labelTitle}>{title}</div>
      {children}
    </label>
  );
}

const labelTitle: React.CSSProperties = {
  marginBottom: 6,
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14,
  background: "#fff",
};

const textareaStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid #ccc",
  outline: "none",
  fontSize: 14,
  resize: "vertical",
  background: "#fff",
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

const dangerBtn: React.CSSProperties = {
  padding: "6px 10px",
  borderRadius: 8,
  border: "1px solid #d33",
  background: "#fff",
  color: "#d33",
  cursor: "pointer",
};
