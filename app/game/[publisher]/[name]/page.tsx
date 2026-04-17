import fs from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { GameItem, GamesData } from "@/types/game";

type DetailPageProps = {
  params: Promise<{
    publisher: string;
    name: string;
  }>;
};

async function readGamesFromFile(): Promise<GameItem[]> {
  const filePath = path.join(process.cwd(), "public", "data", "games.json");
  const content = await fs.readFile(filePath, "utf-8");
  const parsed = JSON.parse(content) as GamesData;
  return Array.isArray(parsed.games) ? parsed.games : [];
}

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateStaticParams() {
  const games = await readGamesFromFile();
  return games.map((game) => ({
    publisher: encodeURIComponent(game.publisher),
    name: encodeURIComponent(game.name),
  }));
}

export const dynamicParams = false;

export default async function GameDetailPage({ params }: DetailPageProps) {
  const routeParams = await params;
  const publisher = safeDecode(routeParams.publisher).trim().toLowerCase();
  const name = safeDecode(routeParams.name).trim().toLowerCase();

  const games = await readGamesFromFile();
  const game = games.find(
    (item) =>
      item.publisher.trim().toLowerCase() === publisher &&
      item.name.trim().toLowerCase() === name
  );

  if (!game) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="inline-flex w-fit rounded-md border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          ← Back to Home
        </Link>

        <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <div className="aspect-video w-full bg-zinc-100 dark:bg-zinc-950">
            {game.image ? (
              <img src={game.image} alt={game.name} className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                No image
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 sm:p-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                {game.publisher}
              </p>
              <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {game.name}
              </h1>
            </div>

            <div className="grid grid-cols-1 gap-2 text-sm text-zinc-700 dark:text-zinc-300 sm:grid-cols-2">
              <p>
                <span className="font-semibold">Platform:</span> {game.platform}
              </p>
              <p>
                <span className="font-semibold">Login option:</span> {game.loginOption}
              </p>
            </div>

            {game.warning && (
              <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                <p className="font-semibold">Warning</p>
                <p>{game.warning}</p>
              </div>
            )}

            <div>
              <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Steps
              </h2>
              <ol className="space-y-2">
                {game.steps.map((step, index) => (
                  <li
                    key={`${game.name}-detail-step-${index}`}
                    className="flex gap-3 rounded-md border border-zinc-200 bg-zinc-50 p-3 text-sm dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span className="text-zinc-800 dark:text-zinc-200">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {game.video && (
              <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                <iframe
                  src={game.video}
                  title={`${game.name} guide video`}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
