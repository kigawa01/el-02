import type { Route } from "./+types/detail";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Game ${params.id}` }];
}

export default function GameDetail({ params }: Route.ComponentProps) {
  return (
    <div>
      <h2>Game {params.id}</h2>
      <p>ゲームの詳細情報がここに表示されます。</p>
    </div>
  );
}
