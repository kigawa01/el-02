import back1 from "./mori.png";
import back2 from "./maturi.png";
import boy from "./boy1.png";
import semi from "./semi.png";
import kaminari from "./kaminari.png";
import bocchi from "./boy3.png"


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
    decorImages: [
      { src: boy, top: "50%", left: "35%", width: "30%", height: "40%" },
      { src: semi, top: "15%", left: "25%", width: "5%", height: "40%" },
      { src: semi, top: "15%", left: "77%", width: "15%", height: "40%" },
      { src: semi, top: "10%", left: "5%", width: "10%", height: "40%" },
      { src: semi, top: "20%", left: "65%", width: "6%", height: "40%" },
      { src: kaminari, top: "5%", left: "50%", width: "10%", height: "40%" },
    ],
    hotZones: [
      {
        id: "gate",
        label: "Gate",
        hitImages: [{ src: semi, top: "20%", left: "45%", width: "15%", height: "40%" }],
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
        hitImages: [{ src: bocchi, top: "45%", left: "35%", width: "30%", height: "40%" }],
        acceptedItemIds: [2],
      },
    ],
  },
];

export function getGame(id: number): Game | undefined {
  return games.find((g) => g.id === id);
}
