import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";
import { items } from "../../data/items";
import { getGame } from "../../data/games";

type DroppedState = {
  itemId: number;
  zoneId: string;
  sliderValue: number;
} | null;

export default function GameLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const game = getGame(parseInt(id ?? "1"));
  const [dragging, setDragging] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [dropped, setDropped] = useState<DroppedState>(null);

  const droppedItem = dropped ? items.find((i) => i.id === dropped.itemId) : null;

  function handleDrop(zoneId: string) {
    if (dragging === null) return;
    setActiveZone(null);
    setDropped({ itemId: dragging, zoneId, sliderValue: 50 });
    setDragging(null);
  }

  function handleConfirm() {
    setDropped(null);
    navigate(`/diary/${id}/result/1`);
  }

  return (
    <div style={{ display: "flex", height: "100%" }}>
      {/* Main image area */}
      <main
        style={{ flex: 1, position: "relative", overflow: "hidden" }}
        onDragOver={(e) => e.preventDefault()}
      >
        <img
          src={game?.image ?? "https://placehold.co/1280x720"}
          alt="game"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {game?.hotZones.map((zone) => (
          <div
            key={zone.id}
            onDragOver={(e) => { e.preventDefault(); setActiveZone(zone.id); }}
            onDragLeave={() => setActiveZone(null)}
            onDrop={() => handleDrop(zone.id)}
            style={{
              position: "absolute",
              top: zone.top,
              left: zone.left,
              width: zone.width,
              height: zone.height,
              border: `3px dashed ${activeZone === zone.id ? "#f1c40f" : "rgba(255,255,255,0.4)"}`,
              background: activeZone === zone.id ? "rgba(241,196,15,0.2)" : "transparent",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.875rem",
              transition: "background 0.15s, border-color 0.15s",
            }}
          >
            {zone.label}
          </div>
        ))}

        {/* Slider popup */}
        {dropped && droppedItem && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem",
                width: "320px",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <img
                src={droppedItem.image}
                alt={droppedItem.name}
                style={{ width: "80px", height: "80px", borderRadius: "8px", marginBottom: "1rem" }}
              />
              <h2 style={{ margin: "0 0 1.5rem" }}>{droppedItem.name}</h2>
              <input
                type="range"
                min={0}
                max={100}
                value={dropped.sliderValue}
                onChange={(e) =>
                  setDropped({ ...dropped, sliderValue: parseInt(e.target.value) })
                }
                style={{ width: "100%", marginBottom: "0.5rem" }}
              />
              <div style={{ marginBottom: "1.5rem", color: "#555" }}>{dropped.sliderValue}</div>
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
                <button
                  onClick={() => setDropped(null)}
                  style={{ padding: "0.5rem 1.25rem", borderRadius: "6px", border: "1px solid #ccc", cursor: "pointer", background: "white" }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  style={{ padding: "0.5rem 1.25rem", borderRadius: "6px", border: "none", cursor: "pointer", background: "#2980b9", color: "white" }}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Sidebar */}
      <aside style={{ width: "200px", borderLeft: "1px solid #ccc", overflowY: "auto", background: "#fafafa" }}>
        <Outlet />
        <ul style={{ listStyle: "none", margin: 0, padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {items.map((item) => (
            <li
              key={item.id}
              draggable
              onDragStart={() => setDragging(item.id)}
              onDragEnd={() => setDragging(null)}
              style={{
                cursor: "grab",
                opacity: dragging === item.id ? 0.4 : 1,
                textAlign: "center",
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: "80px", height: "80px", borderRadius: "8px", display: "block", margin: "0 auto" }}
              />
              <div style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>{item.name}</div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
