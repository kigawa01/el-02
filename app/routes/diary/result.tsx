import { useNavigate } from "react-router";
import type { Route } from "./+types/result";

export function meta({ params }: Route.MetaArgs) {
  return [{ title: `Diary ${params.diaryId} - Result ${params.resultId}` }];
}

export default function DiaryResult({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const nextGameId = parseInt(params.diaryId) + 1;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <img
        src="https://placehold.co/1280x720"
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
        <p style={{ fontSize: "1.5rem", marginTop: "1rem" }}>Result {params.resultId}</p>
      </div>
      <button
        onClick={() => navigate(`/game/${nextGameId}`)}
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
        Next →
      </button>
    </div>
  );
}
