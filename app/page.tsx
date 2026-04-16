import gamesData from "../public/data/games.json";

type GameItem = {
  id: string;
  name: string;
  platform: string;
  loginOption: string;
  warning: string;
  steps: string[];
  image: string;
  video: string;
};

export default function Home() {
  const games = (gamesData as { games: GameItem[] }).games || [];

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 34, fontWeight: 700, marginBottom: 8 }}>
        Game Guide System
      </h1>
      <p style={{ color: "#555", marginBottom: 24 }}>
        Danh sách hướng dẫn game
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: 20,
        }}
      >
        {games.map((game) => (
          <div
            key={game.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: 14,
              overflow: "hidden",
              background: "#fff",
            }}
          >
            <img
              src={game.image}
              alt={game.name}
              style={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                display: "block",
              }}
            />

            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 8 }}>
                ID: {game.id}
              </div>

              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                {game.name}
              </h2>

              <div style={{ marginBottom: 8 }}>
                <strong>Platform:</strong> {game.platform}
              </div>

              <div style={{ marginBottom: 8 }}>
                <strong>Login option:</strong> {game.loginOption}
              </div>

              <div
                style={{
                  marginBottom: 12,
                  padding: 10,
                  borderRadius: 8,
                  background: "#fff4e5",
                  color: "#8a4b00",
                  border: "1px solid #f3d19c",
                }}
              >
                <strong>Warning:</strong> {game.warning}
              </div>

              <div style={{ marginBottom: 14 }}>
                <strong>Steps:</strong>
                <ol style={{ marginTop: 8, paddingLeft: 20 }}>
                  {game.steps.map((step, i) => (
                    <li key={i} style={{ marginBottom: 6 }}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              {game.video && (
                <div>
                  <iframe
                    width="100%"
                    height="220"
                    src={game.video}
                    title={game.name}
                    style={{ border: 0, borderRadius: 10 }}
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
