import React, { useState } from "react";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router";
import { items } from "../../data/items";
import { getGame, resolveHotZoneImage } from "../../data/games";

export const handle = {
  title: (params: Record<string, string | undefined>) =>
    getGame(parseInt(params.id ?? "1"))?.title ?? null,
};

type ZoneState = {
  itemId: number;
  selectedVariantId: number | null;
};
type PlacedItems = Record<string, ZoneState>;

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
  const [placedItems, setPlacedItems] = useState<PlacedItems>({});
  const [tooltipZoneId, setTooltipZoneId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  const tooltipZone = tooltipZoneId ? game?.hotZones.find((z) => z.id === tooltipZoneId) : null;
  const tooltipState = tooltipZoneId ? placedItems[tooltipZoneId] : null;
  const tooltipItem = tooltipState ? items.find((i) => i.id === tooltipState.itemId) : null;
  function handleDrop(zoneId: string) {
    if (dragging === null) return;
    const zone = game?.hotZones.find((z) => z.id === zoneId);
    if (!zone?.acceptedItemIds.includes(dragging)) return;
    setPlacedItems((prev) => ({ ...prev, [zoneId]: { itemId: dragging, selectedVariantId: null } }));
    setTooltipZoneId(zoneId);
    setActiveZone(null);
    setDragging(null);
  }

  function handleVariantSelect(zoneId: string, variantId: number, resultId: number) {
    setPlacedItems((prev) => ({ ...prev, [zoneId]: { ...prev[zoneId], selectedVariantId: variantId } }));
    setTooltipZoneId(null);
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      navigate(`/diary/${id}/result/${resultId}?version=${nextVersion}`);
    }, 3000);
  }

  return (
    <div  style={{ display: "flex", height: "100%" }}>
      {/* Main image area */}
      <main
        style={{ flex: 1, position: "relative", overflow: "hidden" }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => setTooltipZoneId(null)}
      >
        <img
          src={game?.image ?? "https://placehold.co/1280x720"}
          alt="game"
          className="h-screen w-full"
          style={{ objectFit: "cover", display: "block" }}
        />

        {/* 装飾画像：バリアント選択後はvariant.decorImages、未選択時はgame.decorImages */}
        {(() => {
          const variantDecorImages = game?.hotZones.flatMap((zone) => {
            const state = placedItems[zone.id];
            const placedItem = state ? items.find((i) => i.id === state.itemId) : null;
            const selectedVariant = placedItem && state?.selectedVariantId !== null
              ? placedItem.variants.find((v) => v.id === state.selectedVariantId)
              : null;
            return selectedVariant?.decorImages ?? [];
          }) ?? [];
          const decorImages = variantDecorImages.length > 0 ? variantDecorImages : (game?.decorImages ?? []);
          return decorImages.map((img, i) => (
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
          ));
        })()}

        {game?.hotZones.map((zone) => {
          const state = placedItems[zone.id];
          const placedItem = state ? items.find((i) => i.id === state.itemId) : null;
          const selectedVariant = placedItem && state?.selectedVariantId !== null
            ? placedItem.variants.find((v) => v.id === state.selectedVariantId)
            : null;
          return (
            <React.Fragment key={zone.id}>
              {/* 当たり判定のある画像（画像ごとに独立したドロップゾーン） */}
              {zone.hitImages.map((img, i) => {
                const displaySrc = selectedVariant?.zoneImage ?? img.src;
                return (
                  <div
                    key={i}
                    onDragOver={(e) => { e.preventDefault(); if (zone.acceptedItemIds.includes(dragging)) setActiveZone(zone.id); }}
                    onDragLeave={() => setActiveZone(null)}
                    onDrop={(e) => { e.stopPropagation(); handleDrop(zone.id); }}
                    style={{
                      position: "absolute",
                      top: img.top,
                      left: img.left,
                      width: img.width,
                      height: img.height,
                      outline: debug ? `3px dashed ${activeZone === zone.id ? "#f1c40f" : "rgba(255,255,255,0.4)"}` : "none",
                      transition: "outline-color 0.15s",
                    }}
                  >
                    <img
                      src={displaySrc}
                      alt={i === 0 ? zone.label : ""}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        pointerEvents: "none",
                        opacity: activeZone === zone.id ? 0.7 : 1,
                        transition: "opacity 0.15s",
                      }}
                    />
                  </div>
                );
              })}
            </React.Fragment>
          );
        })}

        {/* Tooltip */}
        {tooltipZone && tooltipState && tooltipItem && (
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: "absolute",
              top: tooltipZone.hitImages[0]?.top ?? "30%",
              left: `calc(${tooltipZone.hitImages[0]?.left ?? "35%"} - 220px)`,
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
                src={tooltipItem.image}
                alt={tooltipItem.name}
                style={{ width: "40px", height: "40px", borderRadius: "4px" }}
              />
              <span style={{ fontWeight: "bold", fontSize: "0.9rem" }}>{tooltipItem.name}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
              {tooltipItem.variants.map((variant) => {
                const selected = tooltipState.selectedVariantId === variant.id;
                return (
                  <button
                    key={variant.id}
                    onClick={() => handleVariantSelect(tooltipZoneId!, variant.id, variant.resultId)}
                    style={{
                      padding: "0.4rem 0.75rem",
                      borderRadius: "6px",
                      border: selected ? "2px solid #2980b9" : "2px solid transparent",
                      background: selected ? "#eaf4fb" : "#f5f5f5",
                      cursor: "pointer",
                      fontSize: "0.875rem",
                      fontWeight: selected ? "bold" : "normal",
                      textAlign: "left",
                      width: "100%",
                    }}
                  >
                    {variant.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}

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

      </main>

      {/* Sidebar */}
      <aside  style={{ width: "200px", borderLeft: "1px solid #ccc", overflowY: "auto", background: "#fafafa" }}>
        <Outlet />
        <ul className="h-7/8 flex flex-col justify-center align-bottom" style={{ listStyle: "none", margin: 0, padding: "0.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
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
                style={{ width: "80px", height: "80px", borderRadius: "8px", display: "block", margin: "0 auto",objectFit:"contain" }}
              />
              <div style={{ fontSize: "0.75rem", marginTop: "0.25rem" }}>{item.name}</div>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
