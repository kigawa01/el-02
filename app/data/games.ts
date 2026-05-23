import back1 from "./mori.png";
import back2 from "./maturi.png"

export type ZoneImage = {
  src: string;
  top: string;
  left: string;
  width: string;
  height: string;
};

export type HotZone = {
  id: string;
  label: string;
  hitImages: ZoneImage[];
  acceptedItemIds: number[];
};

export type Game = {
  id: number;
  title: string;
  image: string;
  decorImages: ZoneImage[];
  hotZones: HotZone[];
};

export function resolveHotZoneImage(item: import("./items").Item, variantId: number): string {
  return [...item.variants]
    .filter((v) => v.id <= variantId)
    .at(-1)?.zoneImage ?? item.variants[0].zoneImage;
}

export const games: Game[] = [
  {
    id: 1,
    title: "7月☀日",
    image: back1,
    decorImages: [],
    hotZones: [
      {
        id: "gate",
        label: "Gate",
        hitImages: [{ src: "https://placehold.co/120x120/555/white?text=Gate", top: "30%", left: "35%", width: "30%", height: "40%" }],
        acceptedItemIds: [1],
      },
    ],
  },
  {
    id: 2,
    title: "8月△日",
    image: back2,
    decorImages: [],
    hotZones: [
      {
        id: "gate",
        label: "Gate",
        hitImages: [{ src: "https://placehold.co/120x120/555/white?text=Gate", top: "30%", left: "35%", width: "30%", height: "40%" }],
        acceptedItemIds: [2],
      },
    ],
  },
];

export function getGame(id: number): Game | undefined {
  return games.find((g) => g.id === id);
}
