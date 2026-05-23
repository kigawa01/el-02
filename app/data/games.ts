import back1 from "./1-back.png";

export type HotZone = {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
  acceptedItemId: number;
};

export type Game = {
  id: number;
  title: string;
  image: string;
  hotZones: HotZone[];
};

export const games: Game[] = [
  {
    id: 1,
    title: "7月☀日",
    image: back1,
    hotZones: [
      { id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%", acceptedItemId: 1 },
    ],
  },
  {
    id: 2,
    title: "8月△日",
    image: back1,
    hotZones: [
      { id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%", acceptedItemId: 2 },
    ],
  },
];

export function getGame(id: number): Game | undefined {
  return games.find((g) => g.id === id);
}
