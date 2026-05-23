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
    title: "Stage 1: The Gate",
    image: back1,
    hotZones: [
      { id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%", acceptedItemId: 1 },
    ],
  },
  {
    id: 2,
    title: "Stage 2: The Dark Forest",
    image: "https://placehold.co/1280x720/16213e/white?text=Game+2",
    hotZones: [
      { id: "gate", label: "Gate", top: "30%", left: "35%", width: "30%", height: "40%", acceptedItemId: 2 },
    ],
  },
];

export function getGame(id: number): Game | undefined {
  return games.find((g) => g.id === id);
}
