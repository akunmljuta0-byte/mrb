"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { GameCard } from "@/components/GameCard";
import { filterGames, parseGamesData } from "@/lib/game-utils";
import type { GameItem } from "@/types/game";

function getDataUrlCandidates(): string[] {
  if (typeof window === "undefined") {
    return ["/data/games.json"];
  }

  const pathParts = window.location.pathname.split("/").filter(Boolean);
  const firstSegment = pathParts[0];
  const candidates = ["/data/games.json", "./data/games.json", "../data/games.json"];

  if (firstSegment && firstSegment !== "admin" && firstSegment !== "game") {
    candidates.unshift(`/${firstSegment}/data/games.json`);
  }

  return Array.from(new Set(candidates));
}

export default function Home() {
  const [games, setGames] = useState<GameItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] = useState("All");
  const [publisherFilter, setPublisherFilter] = useState("All");

  useEffect(() => {
    let active = true;

    async function loadGames() {
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
        if (active) {
          setGames(parsed.games);
          setError(null);
        }
      } catch (loadError) {
        if (active) {
          setError(loadError instanceof Error ? loadError.message : "Lỗi tải dữ liệu");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadGames();

    return () => {
      active = false;
    };
  }, []);

  const platformOptions = useMemo(() => {
    const values = Array.from(new Set(games.map((game) => game.platform).filter(Boolean)));
    return ["All", ...values];
  }, [games]);

  const publisherOptions = useMemo(() => {
    const values = Array.from(
      new Set(games.map((game) => game.publisher).filter(Boolean))
    );
    return ["All", ...values];
  }, [games]);

  const filteredGames = useMemo(
    () => filterGames(games, search, platformFilter, publisherFilter),
    [games, search, platformFilter, publisherFilter]
  );

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                Game Guide System
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Tìm kiếm và xem hướng dẫn đăng nhập game nhanh chóng.
              </p>
            </div>
            <Link
              href="/admin"
              className="rounded-md bg-zinc-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
            >
              Admin
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by game name..."
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
            />
            <select
              value={platformFilter}
              onChange={(event) => setPlatformFilter(event.target.value)}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
            >
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={publisherFilter}
              onChange={(event) => setPublisherFilter(event.target.value)}
              className="w-full rounded-md border border-zinc-300 bg-white px-3 py-2 text-sm outline-none ring-blue-500 transition focus:ring-2 dark:border-zinc-700 dark:bg-zinc-950"
            >
              {publisherOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </header>

        {loading && <p className="text-sm text-zinc-600 dark:text-zinc-400">Loading games...</p>}
        {error && (
          <p className="rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300">
            {error}
          </p>
        )}

        {!loading && !error && (
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {filteredGames.length > 0 ? (
              filteredGames.map((game, index) => (
                <GameCard key={`${game.publisher}-${game.name}-${index}`} game={game} />
              ))
            ) : (
              <div className="col-span-full rounded-xl border border-zinc-200 bg-white p-6 text-center text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
                Không có game nào khớp bộ lọc hiện tại.
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
