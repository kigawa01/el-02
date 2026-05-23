import item1 from "./item1.png"
import item2 from "./kesigomu.png"
import item3 from "./jelly.png"
import item4 from "./girl.png"
import item5 from "./kane.png"
import type { ZoneImage } from "./games";

export type ItemVariant = {
  id: number;
  name: string;
  zoneImage: string;
  decorImages: ZoneImage[];
  resultId: number;
  outcome: "clear" | "fail";
};

export type Item = {
  id: number;
  name: string;
  image: string;
  variants: ItemVariant[];
};

export const items: Item[] = [
  {
    id: 1, name: "音量", image: item1,
    variants: [
      { id: 0, name: "大きくする",  zoneImage: "https://placehold.co/120x120/e74c3c/white?text=斬", decorImages: [], resultId: 1, outcome: "fail" },
      { id: 1, name: "そのままにしておく",  zoneImage: "https://placehold.co/120x120/c0392b/white?text=突", decorImages: [], resultId: 2, outcome: "fail" },
      { id: 2, name: "小さくする",  zoneImage: "https://placehold.co/120x120/e67e22/white?text=払", decorImages: [], resultId: 3, outcome: "clear" },
    ],
  },
  {
    id: 2, name: "けしごむ", image: item2,
    variants: [
      { id: 0, name: "消す",  zoneImage: "https://placehold.co/120x120/2980b9/white?text=防", decorImages: [], resultId: 1, outcome: "fail" },
      { id: 1, name: "けずる",  zoneImage: "https://placehold.co/120x120/1a5276/white?text=弾", decorImages: [], resultId: 2, outcome: "clear" },
    ],
  },
  {
    id: 3, name: "ゼリー", image: item3,
    variants: [
      { id: 0, name: "設置する",  zoneImage: "https://placehold.co/120x120/27ae60/white?text=狙", decorImages: [], resultId: 1, outcome: "clear" },
    ],
  },
  {
    id: 4, name: "誰か", image: item4,
    variants: [
      { id: 0, name: "友達",  zoneImage: "https://placehold.co/120x120/8e44ad/white?text=詠", decorImages: [], resultId: 1, outcome: "clear" },
      { id: 1, name: "誰だろう",  zoneImage: "https://placehold.co/120x120/6c3483/white?text=解", decorImages: [], resultId: 2, outcome: "fail" },
    ],
  },
  {
    id: 5, name: "おこづかい", image: item5,
    variants: [
      { id: 0, name: "つかう",   zoneImage: "https://placehold.co/120x120/f39c12/white?text=刺", decorImages: [], resultId: 1, outcome: "clear" },
      { id: 1, name: "貯めておこう…", zoneImage: "https://placehold.co/120x120/d68910/white?text=投", decorImages: [], resultId: 2, outcome: "fail" },
    ],
  },
];
