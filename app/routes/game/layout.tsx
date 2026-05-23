import { useState } from "react";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router";
import { items } from "../../data/items";
import { getGame } from "../../data/games";

export const handle = {
  title: (params: Record<string, string | undefined>) =>
    getGame(parseInt(params.id ?? "1"))?.title ?? null,
};


type DroppedState = {
  itemId: number;
  zoneId: string;
  sliderValue: number;
} | null;

export default function GameLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const version = parseFloat(searchParams.get("version") ?? "1.0");
  const debug = searchParams.get("debug") === "1";
  const nextVersion = parseFloat((version + 0.1).toFixed(1));

  const game = getGame(parseInt(id ?? "1"));
  const [dragging, setDragging] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);
  const [dropped, setDropped] = useState<DroppedState>(null);
  const [showModal, setShowModal] = useState(false);

  const droppedItem = dropped ? items.find((i) => i.id === dropped.itemId) : null;
  const droppedZone = dropped ? game?.hotZones.find((z) => z.id === dropped.zoneId) : null;

  function handleDrop(zoneId: string) {
    if (dragging === null) return;
    const zone = game?.hotZones.find((z) => z.id === zoneId);
    if (zone?.acceptedItemId !== dragging) return;
    setActiveZone(null);
    setDropped({ itemId: dragging, zoneId, sliderValue: 50 });
    setDragging(null);
  }

  function handleConfirm() {
    setDropped(null);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate(`/diary/${id}/result/1?version=${nextVersion}`);
    }, 3000);
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
              border: debug ? `3px dashed ${activeZone === zone.id ? "#f1c40f" : "rgba(255,255,255,0.4)"}` : "none",
              background: debug && activeZone === zone.id ? "rgba(241,196,15,0.2)" : "transparent",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "0.875rem",
              transition: "background 0.15s, border-color 0.15s",
            }}
          >
            {debug && zone.label}
          </div>
        ))}

        {/* Modal */}
        {showModal && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 20,
            }}
          >
            <div
              style={{
                background: "white",
                borderRadius: "12px",
                padding: "2rem 3rem",
                textAlign: "center",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              <p style={{ margin: "0 0 1.5rem", fontSize: "1.5rem", fontWeight: "bold" }}>バージョンアップ！</p>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.25rem" }}>以前</div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold", fontVariantNumeric: "tabular-nums" }}>{version.toFixed(1)}</div>
                </div>
                <div style={{ fontSize: "1.5rem", color: "#aaa" }}>→</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "0.75rem", color: "#888", marginBottom: "0.25rem" }}>現在</div>
                  <div style={{ fontSize: "2rem", fontWeight: "bold", fontVariantNumeric: "tabular-nums", color: "#2980b9" }}>{nextVersion.toFixed(1)}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tooltip */}
        {dropped && droppedItem && droppedZone && (
          <div
            style={{
              position: "absolute",
              top: droppedZone.top,
              left: `calc(${droppedZone.left} - 220px)`,
              width: "200px",
              background: "white",
              borderRadius: "8px",
              padding: "0.75rem",
              boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
              zIndex: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <img
                src={droppedItem.image}
                alt={droppedItem.name}
                style={{ width: "40px", height: "40px", borderRadius: "4px" }}
              />
              <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{droppedItem.name}</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={dropped.sliderValue}
              onChange={(e) => setDropped({ ...dropped, sliderValue: parseInt(e.target.value) })}
              style={{ width: "100%", marginBottom: "0.25rem" }}
            />
            <div style={{ textAlign: "center", fontSize: "0.8rem", color: "#555", marginBottom: "0.75rem" }}>
              {dropped.sliderValue}
            </div>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                onClick={() => setDropped(null)}
                style={{ flex: 1, padding: "0.4rem", borderRadius: "4px", border: "1px solid #ccc", cursor: "pointer", background: "white", fontSize: "0.8rem" }}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                style={{ flex: 1, padding: "0.4rem", borderRadius: "4px", border: "none", cursor: "pointer", background: "#2980b9", color: "white", fontSize: "0.8rem" }}
              >
                OK
              </button>
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
