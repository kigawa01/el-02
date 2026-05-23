import { useNavigate, useSearchParams } from "react-router";
import type { Route } from "./+types/detail";
import { getSelect, selects } from "../../data/selects";
import { buildClearedParams, getClearedIds } from "../../utils/cleared";

export default function SelectDetail({ params }: Route.ComponentProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const clearedIds = getClearedIds(searchParams);
  const version = searchParams.get("version") ?? "1.0";
  const currentId = parseInt(params.id);
  const select = getSelect(currentId);
  const query = buildClearedParams(clearedIds, { version });

  const hasPrev = !!getSelect(currentId - 1);
  const hasNext = !!getSelect(currentId + 1);

  const buttonStyle: React.CSSProperties = {
    position: "absolute",
    bottom: "2rem",
    padding: "0.75rem 1.25rem",
    fontSize: "1rem",
    background: "rgba(255,255,255,0.7)",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh", overflow: "hidden" }}>
      <img
        src={select?.backgroundImage ?? "https://placehold.co/1280x720"}
        alt="select"
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
      />
      {select?.overlayImages.map((img, i) => (
        <img
          key={i}
          src={img.src}
          alt=""
          onClick={() => img.navigateTo && navigate(`${img.navigateTo}?${query}`)}
          style={{
            position: "absolute",
            top: img.top,
            left: img.left,
            width: img.width,
            height: img.height,
            objectFit: "contain",
            cursor: img.navigateTo ? "pointer" : "default",
          }}
        />
      ))}
      {hasPrev && (
        <button
          onClick={() => navigate(`/select/${currentId - 1}?${query}`)}
          style={{ ...buttonStyle, left: "2rem" }}
        >
          前のページへ
        </button>
      )}
      {hasNext && (
        <button
          onClick={() => navigate(`/select/${currentId + 1}?${query}`)}
          style={{ ...buttonStyle, right: "1rem" }}
        >
          次のページへ
        </button>
      )}
    </div>
  );
}
