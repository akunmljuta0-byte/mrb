export type PlatformOption =
  | "All platform"
  | "Android"
  | "iOS"
  | "PC"
  | "Steam"
  | "PS5";

export type GameItem = {
  publisher: string;
  name: string;
  platform: string;
  loginOption: string;
  warning: string;
  steps: string[];
  image: string;
  video: string;
};

export type GamesData = {
  games: GameItem[];
};
