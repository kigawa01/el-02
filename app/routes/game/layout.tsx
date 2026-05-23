import { Outlet } from "react-router";

export default function GameLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <main style={{ flex: 1, overflow: "hidden" }}>
        <img
          src="https://placehold.co/1280x720"
          alt="game"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </main>
      <aside style={{ width: "300px", borderLeft: "1px solid #ccc", padding: "1rem", overflowY: "auto" }}>
        <Outlet />
      </aside>
    </div>
  );
}
