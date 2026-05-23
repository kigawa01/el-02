import { useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/result";
import { getDiary } from "../../data/diaries";
import { getGame } from "../../data/games";

export const handle = {
  title: (params: Record<string, string | undefined>) =>
    getDiary(parseInt(params.diaryId ?? "1"))?.title ?? null,
};

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Diary ${params.diaryId} - Result ${params.resultId}` }];
}

export default function DiaryResult({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const version = searchParams.get("version") ?? "1.0";
  const diary = getDiary(parseInt(params.diaryId));
  const nextGameId = parseInt(params.diaryId) + 1;
  const hasNextGame = !!getGame(nextGameId);

  return (
    <div　className="w-fill opacity-80 h-screen object-cover" style={{ position: "relative" }}>
      <img
        src={diary?.image ?? "https://placehold.co/1280x720"}
        alt="diary"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          color: "white",
          textAlign: "center",
          textShadow: "0 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        <h1 style={{ fontSize: "3rem", margin: 0 }}>Diary {params.diaryId}</h1>
        <div className="bg-[url(data/clear1.png)] h-70 w-100 bg-cover mx-5 rounded-lg border-2 border-amber-200"></div>
        <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Result {params.resultId}</p>
      </div>
      <button
        onClick={() => hasNextGame ? navigate(`/game/${nextGameId}?version=${version}`) : navigate(`/result/1`)}
        style={{
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          background: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        次の日へ →
      </button>
    </div>
  );
}
