import { useNavigate } from "react-router";
import type { Route } from "./+types/detail";
import { getResult } from "../../data/results";

export default function ResultDetail({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const result = getResult(parseInt(params.id));

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <img
        src={result?.backgroundImage ?? "https://placehold.co/1280x720"}
        alt="result"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {result?.overlayImages.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt=""
          style={{
            position: "absolute",
            top: img.top,
            left: img.left,
            width: img.width,
            height: img.height,
            objectFit: "contain",
            pointerEvents: "none",
          }}
        />
      ))}
      <button
        onClick={() => navigate("/")}
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
        最初に戻る
      </button>
    </div>
  );
}
