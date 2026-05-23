import back1 from "./1-back.png";

export type HotZoneVariant = {
  id: number;
  name: string;
  image: string;
};

export type HotZone = {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
  acceptedItemId: number;
  variants: HotZoneVariant[];
};

export type Game = {
  id: number;
  title: string;
  image: string;
  hotZones: HotZone[];
};

export function resolveHotZoneImage(zone: HotZone, value: number): string {
  return [...zone.variants]
    .filter((v) => v.id <= value)
    .at(-1)?.image ?? zone.variants[0].image;
}

export const games: Game[] = [
  {
    id: 1,
    title: "7月☀日",
    image: back1,
    hotZones: [
      {
        id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%", acceptedItemId: 1,
        variants: [
          { id: 0, name: "Gate A", image: "https://placehold.co/120x120/555/white?text=Gate+A" },
          { id: 1, name: "Gate B", image: "https://placehold.co/120x120/2980b9/white?text=Gate+B" },
          { id: 2, name: "Gate C", image: "https://placehold.co/120x120/27ae60/white?text=Gate+C" },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "8月△日",
    image: back1,
    hotZones: [
      {
        id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%", acceptedItemId: 2,
        variants: [
          { id: 0,  name: "Gate A", image: "https://placehold.co/120x120/555/white?text=Gate+A" },
          { id: 34, name: "Gate B", image: "https://placehold.co/120x120/2980b9/white?text=Gate+B" },
          { id: 67, name: "Gate C", image: "https://placehold.co/120x120/27ae60/white?text=Gate+C" },
        ],
      },
    ],
  },
];

export function getGame(id: number): Game | undefined {
  return games.find((g) => g.id === id);
}
