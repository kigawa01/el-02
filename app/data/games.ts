import back1 from "./1-back.png";

export type HotZone = {
  id: string;
  label: string;
  top: string;
  left: string;
  width: string;
  height: string;
};

export type Game = {
  id: number;
  image: string;
  hotZones: HotZone[];
};

export const games: Game[] = [
  {
    id: 1,
    image: back1,
    hotZones: [
      { id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%" },
    ],
  },
  {
    id: 2,
    image: "https://placehold.co/1280x720/16213e/white?text=Game+2",
    hotZones: [
      { id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%" },
    ],
  },
];

export function getGame(id: number): Game | undefined {
  return games.find((g) => g.id === id);
}
