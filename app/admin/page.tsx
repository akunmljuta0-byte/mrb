"use client";

import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import type { GameItem } from "@/types/game";
import {
  createEmptyGame,
  parseGamesData,
  PLATFORM_OPTIONS,
  sanitizeGame,
} from "@/lib/game-utils";

function getDataUrlCandidates(): string[] {
  if (typeof window === "undefined") {
    return ["/data/games.json"];
  }

  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const firstSegment = pathParts[0];
  const candidates = ["/data/games.json", "../data/games.json", "./data/games.json"];

  if (firstSegment && firstSegment !== "admin" && firstSegment !== "game") {
    candidates.unshift(`/${firstSegment}/data/games.json`);
  }

  return Array.from(new Set(candidates));
}

export default function AdminPage() {
  const [games, setGames] = useState<GameItem[]>([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<string>("Ready");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void autoLoadGames();
  }, []);

  async function autoLoadGames(): Promise<void> {
    setLoading(true);
    try {
      let payload: unknown = null;
      let loaded = false;

      for (const url of getDataUrlCandidates()) {
        const response = await fetch(url, { cache: "no-store" });
        if (!response.ok) {
          continue;
        }
        payload = (await response.json()) as unknown;
        loaded = true;
        break;
      }

      if (!loaded) {
        throw new Error("Không đọc được games.json");
      }

      const parsed = parseGamesData(payload);
      setGames(parsed.games);
      setStatus(`Loaded ${parsed.games.length} game(s) từ games.json`);
    } catch (error) {
      setStatus(
        error instanceof Error
          ? `Auto-load lỗi: ${error.message}`
          : "Auto-load lỗi không xác định."
      );
    } finally {
      setLoading(false);
    }
  }

  function addGame(): void {
    setGames((prev) => [...prev, createEmptyGame()]);
    setStatus("Đã thêm game mới.");
  }

  function removeGame(index: number): void {
    setGames((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
    setStatus("Đã xóa game.");
  }

  function updateField<K extends keyof GameItem>(
    index: number,
    field: K,
    value: GameItem[K]
  ): void {
    setGames((prev) =>
      prev.map((game, itemIndex) =>
        itemIndex === index ? { ...game, [field]: value } : game
      )
    );
  }

  function updateStep(gameIndex: number, stepIndex: number, value: string): void {
    setGames((prev) =>
      prev.map((game, itemIndex) => {
        if (itemIndex !== gameIndex) {
          return game;
        }

        const nextSteps = game.steps.map((step, currentIndex) =>
          currentIndex === stepIndex ? value : step
        );

        return { ...game, steps: nextSteps };
      })
    );
  }

  function addStep(gameIndex: number): void {
    setGames((prev) =>
      prev.map((game, itemIndex) =>
        itemIndex === gameIndex ? { ...game, steps: [...game.steps, ""] } : game
      )
    );
  }

  function removeStep(gameIndex: number, stepIndex: number): void {
    setGames((prev) =>
      prev.map((game, itemIndex) => {
        if (itemIndex !== gameIndex) {
          return game;
        }

        const nextSteps = game.steps.filter((_, index) => index !== stepIndex);
        return { ...game, steps: nextSteps.length > 0 ? nextSteps : [""] };
      })
    );
  }

  async function copyJson(): Promise<void> {
    const payload = JSON.stringify({ games: games.map(sanitizeGame) }, null, 2);
    try {
      await navigator.clipboard.writeText(payload);
      setStatus("Đã copy JSON.");
    } catch {
      setStatus("Copy thất bại. Trình duyệt chặn clipboard.");
    }
  }

  function downloadJson(): void {
    const payload = JSON.stringify({ games: games.map(sanitizeGame) }, null, 2);
    const fileName = "games.json";

    try {
      const blob = new Blob([payload], { type: "application/json;charset=utf-8" });
      const blobUrl = URL.createObjectURL(blob);
      const anchor = document.createElement("a");

      anchor.href = blobUrl;
      anchor.download = fileName;
      anchor.style.display = "none";

      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      URL.revokeObjectURL(blobUrl);
      setStatus("Đã tải games.json");
    } catch (error) {
      setStatus("Tải games.json thất bại.");
      const message = error instanceof Error ? error.message : "Unknown error";
      window.alert(`Không thể tải file games.json.\nChi tiết: ${message}`);
    }
  }

  function onImportButtonClick(): void {
    fileInputRef.current?.click();
  }

  async function handleImportFile(event: ChangeEvent<HTMLInputElement>): Promise<void> {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const raw: unknown = JSON.parse(text);
      const parsed = parseGamesData(raw);
      setGames(parsed.games);
      setStatus(`Import thành công ${parsed.games.length} game(s).`);
    } catch (error) {
      setStatus("Import thất bại.");
      const message = error instanceof Error ? error.message : "JSON không hợp lệ.";
      window.alert(`Không thể import file JSON.\nChi tiết: ${message}`);
    } finally {
      event.target.value = "";
    }
  }

  const filteredIndexes = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return games.map((_, index) => index);
    }

    return games
      .map((game, index) => ({ game, index }))
      .filter(({ game }) => game.name.trim().toLowerCase().includes(q))
      .map(({ index }) => index);
  }, [games, search]);

  const prettyJson = useMemo(
    () => JSON.stringify({ games: games.map(sanitizeGame) }, null, 2),
    [games]
  );

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">Admin Panel</h1>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            Quản lý dữ liệu game và xuất file games.json.
          </p>
        </header>

        <section className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addGame}
              className="rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-500"
            >
              + Thêm game
            </button>
            <button
              type="button"
              onClick={copyJson}
              className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Copy JSON
            </button>
            <button
              type="button"
              onClick={downloadJson}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-500"
            >
              Tải games.json
            </button>
            <button
              type="button"
              onClick={onImportButtonClick}
              className="rounded-md bg-amber-600 px-3 py-2 text-sm font-medium text-white hover:bg-amber-500"
            >
              Import games.json
            </button>
            <button
              type="button"
              onClick={() => void autoLoadGames()}
              className="rounded-md bg-zinc-700 px-3 py-2 text-sm font-medium text-white hover:bg-zinc-600"
            >
              Reload từ current JSON
            </button>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="application/json,.json"
            onChange={(event) => void handleImportFile(event)}
            className="hidden"
          />

          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr]">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search game name..."
              className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
            />
            <div className="rounded-md border border-zinc-300 px-3 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
              {loading ? "Loading..." : status}
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 xl:grid-cols-[1.6fr_1fr]">
          <div className="space-y-4">
            {filteredIndexes.map((gameIndex) => {
              const game = games[gameIndex];
              return (
                <article
                  key={`game-editor-${gameIndex}`}
                  className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                      Game #{gameIndex + 1}
                    </h2>
                    <button
                      type="button"
                      onClick={() => removeGame(gameIndex)}
                      className="rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-500"
                    >
                      Xóa
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <input
                      value={game.publisher}
                      onChange={(event) =>
                        updateField(gameIndex, "publisher", event.target.value)
                      }
                      placeholder="Publisher"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    />
                    <input
                      value={game.name}
                      onChange={(event) => updateField(gameIndex, "name", event.target.value)}
                      placeholder="Game Name"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    />
                    <select
                      value={game.platform}
                      onChange={(event) =>
                        updateField(gameIndex, "platform", event.target.value)
                      }
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    >
                      {PLATFORM_OPTIONS.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <input
                      value={game.loginOption}
                      onChange={(event) =>
                        updateField(gameIndex, "loginOption", event.target.value)
                      }
                      placeholder="Login Option"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                    />
                    <input
                      value={game.image}
                      onChange={(event) => updateField(gameIndex, "image", event.target.value)}
                      placeholder="Image URL"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 md:col-span-2"
                    />
                    <input
                      value={game.video}
                      onChange={(event) => updateField(gameIndex, "video", event.target.value)}
                      placeholder="Video Embed URL"
                      className="rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950 md:col-span-2"
                    />
                  </div>

                  <textarea
                    value={game.warning}
                    onChange={(event) => updateField(gameIndex, "warning", event.target.value)}
                    placeholder="Warning"
                    rows={3}
                    className="mt-3 w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                  />

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">Steps</p>
                      <button
                        type="button"
                        onClick={() => addStep(gameIndex)}
                        className="rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                      >
                        + Add step
                      </button>
                    </div>
                    {game.steps.map((step, stepIndex) => (
                      <div key={`game-${gameIndex}-step-${stepIndex}`} className="flex gap-2">
                        <input
                          value={step}
                          onChange={(event) =>
                            updateStep(gameIndex, stepIndex, event.target.value)
                          }
                          placeholder={`Step ${stepIndex + 1}`}
                          className="w-full rounded-md border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950"
                        />
                        <button
                          type="button"
                          onClick={() => removeStep(gameIndex, stepIndex)}
                          className="rounded-md border border-red-300 px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/30"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                </article>
              );
            })}

            {filteredIndexes.length === 0 && (
              <div className="rounded-xl border border-zinc-200 bg-white p-4 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                Không có game nào khớp từ khóa tìm kiếm.
              </div>
            )}
          </div>

          <aside className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              JSON Preview
            </h2>
            <pre className="max-h-[70vh] overflow-auto rounded-md bg-zinc-950 p-3 text-xs text-zinc-100">
              {prettyJson}
            </pre>
          </aside>
        </section>
      </main>
    </div>
  );
}
