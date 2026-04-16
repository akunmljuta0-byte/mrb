import gamesData from "../public/data/games.json";

type GameItem = {
  id: string;
  name: string;
  desc: string;
};

export default function Home() {
  const games = (gamesData as { games: GameItem[] }).games || [];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>
        Game Guide System
      </h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Website đã chạy thành công 🚀
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 16,
        }}
      >
        {games.map((game) => (
          <div
            key={game.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 12,
              padding: 16,
              background: "#fff",
            }}
          >
            <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
              ID: {game.id}
            </div>
            <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 8 }}>
              {game.name}
            </h2>
            <p style={{ color: "#444", lineHeight: 1.6 }}>{game.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
