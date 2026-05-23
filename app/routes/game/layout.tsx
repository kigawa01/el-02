import { useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router";

const items = [
  { id: 1, name: "Sword",  image: "https://placehold.co/80x80/e74c3c/white?text=Sword"  },
  { id: 2, name: "Shield", image: "https://placehold.co/80x80/2980b9/white?text=Shield" },
  { id: 3, name: "Bow",    image: "https://placehold.co/80x80/27ae60/white?text=Bow"    },
  { id: 4, name: "Staff",  image: "https://placehold.co/80x80/8e44ad/white?text=Staff"  },
  { id: 5, name: "Dagger", image: "https://placehold.co/80x80/f39c12/white?text=Dagger" },
];

const hotZones = [
  { id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%" },
];

export default function GameLayout() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [dragging, setDragging] = useState<number | null>(null);
  const [activeZone, setActiveZone] = useState<string | null>(null);

  const nextId = id ? parseInt(id) + 1 : 2;

  function handleDrop(zoneId: string) {
    if (dragging === null) return;
    setActiveZone(null);
    setDragging(null);
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
          src="https://placehold.co/1280x720"
          alt="game"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />

        {hotZones.map((zone) => (
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
              pointerEvents: "auto",
              transition: "background 0.15s, border-color 0.15s",
            }}
          >
            {zone.label}
          </div>
        ))}
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
