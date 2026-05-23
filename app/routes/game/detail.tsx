import type {Route} from "./+types/detail";
import {getGame} from "~/data/games";

export function meta({params}: Route.MetaArgs) {
  return [{title: `Game ${params.id}`}];
}

export default function GameDetail({params}: Route.ComponentProps) {
  const game = getGame(parseInt(params.id ?? "1"));
  return (
    <div>
      <h2 className="text-3xl pt-2 text-center text-amber-950 font-semibold">{game?.title ?? "Loading..."}</h2>
    </div>
  );
}
