import Link from "next/link";
import type { GameItem } from "@/types/game";
import { toGamePath } from "@/lib/game-utils";

type GameCardProps = {
  game: GameItem;
};

export function GameCard({ game }: GameCardProps) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="aspect-video w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        {game.image ? (
          <img
            src={game.image}
            alt={game.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
            No image
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
            {game.publisher || "Unknown Publisher"}
          </p>
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            {game.name || "Untitled Game"}
          </h2>
        </div>

        <div className="space-y-1 text-sm text-zinc-700 dark:text-zinc-300">
          <p>
            <span className="font-medium">Platform:</span> {game.platform || "-"}
          </p>
          <p>
            <span className="font-medium">Login:</span> {game.loginOption || "-"}
          </p>
        </div>

        {game.warning && (
          <div className="rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
            <span className="font-semibold">Warning:</span> {game.warning}
          </div>
        )}

        {game.steps.length > 0 && (
          <ol className="list-decimal space-y-1 pl-5 text-sm text-zinc-700 dark:text-zinc-300">
            {game.steps.map((step, index) => (
              <li key={`${game.name}-step-${index}`}>{step || "(empty step)"}</li>
            ))}
          </ol>
        )}

        {game.video && (
          <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
            <iframe
              src={game.video}
              title={`${game.name} video`}
              className="aspect-video w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        )}

        <Link
          href={toGamePath(game.publisher, game.name)}
          className="mt-auto inline-flex w-fit rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
