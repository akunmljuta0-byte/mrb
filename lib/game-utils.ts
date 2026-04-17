import type { GameItem, GamesData, PlatformOption } from "@/types/game";

export const PLATFORM_OPTIONS: PlatformOption[] = [
  "All platform",
  "Android",
  "iOS",
  "PC",
  "Steam",
  "PS5",
];

export function createEmptyGame(): GameItem {
  return {
    publisher: "",
    name: "",
    platform: "All platform",
    loginOption: "",
    warning: "",
    steps: [""],
    image: "",
    video: "",
  };
}

export function sanitizeGame(game: GameItem): GameItem {
  const platform = PLATFORM_OPTIONS.includes(game.platform as PlatformOption)
    ? game.platform
    : "All platform";

  return {
    publisher: game.publisher.trim(),
    name: game.name.trim(),
    platform,
    loginOption: game.loginOption.trim(),
    warning: game.warning.trim(),
    steps:
      game.steps.length > 0
        ? game.steps.map((step) => step.trim())
        : [""],
    image: game.image.trim(),
    video: game.video.trim(),
  };
}

export function parseGamesData(raw: unknown): GamesData {
  if (!raw || typeof raw !== "object" || !("games" in raw)) {
    throw new Error("JSON không hợp lệ: thiếu trường games.");
  }

  const gamesValue = (raw as { games: unknown }).games;
  if (!Array.isArray(gamesValue)) {
    throw new Error("JSON không hợp lệ: games phải là mảng.");
  }

  const games: GameItem[] = gamesValue.map((game, index) => {
    if (!game || typeof game !== "object") {
      throw new Error(`Game tại vị trí ${index + 1} không hợp lệ.`);
    }

    const candidate = game as Partial<GameItem>;
    const steps = Array.isArray(candidate.steps)
      ? candidate.steps.filter((item): item is string => typeof item === "string")
      : [];

    const normalized: GameItem = {
      publisher: typeof candidate.publisher === "string" ? candidate.publisher : "",
      name: typeof candidate.name === "string" ? candidate.name : "",
      platform: typeof candidate.platform === "string" ? candidate.platform : "All platform",
      loginOption:
        typeof candidate.loginOption === "string" ? candidate.loginOption : "",
      warning: typeof candidate.warning === "string" ? candidate.warning : "",
      steps,
      image: typeof candidate.image === "string" ? candidate.image : "",
      video: typeof candidate.video === "string" ? candidate.video : "",
    };

    return sanitizeGame(normalized);
  });

  return { games };
}

export function toGamePath(publisher: string, name: string): string {
  return `/game/${encodeURIComponent(publisher)}/${encodeURIComponent(name)}`;
}

export function normalizeValue(value: string): string {
  return value.trim().toLowerCase();
}

export function filterGames(
  games: GameItem[],
  query: string,
  platform: string,
  publisher: string
): GameItem[] {
  const normalizedQuery = normalizeValue(query);

  return games.filter((game) => {
    const matchesQuery =
      normalizedQuery.length === 0 ||
      normalizeValue(game.name).includes(normalizedQuery);

    const matchesPlatform =
      platform === "All" || normalizeValue(game.platform) === normalizeValue(platform);

    const matchesPublisher =
      publisher === "All" || normalizeValue(game.publisher) === normalizeValue(publisher);

    return matchesQuery && matchesPlatform && matchesPublisher;
  });
}
