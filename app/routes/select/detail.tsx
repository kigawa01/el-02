import type { Route } from "./+types/detail";
import { getSelect } from "../../data/selects";

export default function SelectDetail({ params }: Route.ComponentProps) {
  const select = getSelect(parseInt(params.id));

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
    </div>
  );
}
