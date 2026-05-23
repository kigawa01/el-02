import item1 from "./item1.png"
import item2 from "./kesigomu.png"
import item3 from "./jelly.png"
import item4 from "./girl.png"
import item5 from "./kane.png"
import semi from "./semi.png"
import frend from "./boyandgirl.png"
import bocchi from "./boy3.png"
import type { ZoneImage } from "./games";

export type ItemVariant = {
  id: number;
  name: string;
  zoneImage: string;
  decorImages: ZoneImage[];
  resultId: number;
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
      { id: 0, name: "大きくする",  zoneImage: semi, decorImages: [], resultId: 1 },
      { id: 1, name: "そのままにしておく",  zoneImage: semi, decorImages: [], resultId: 2 },
      { id: 2, name: "小さくする",  zoneImage: semi, decorImages: [], resultId: 3 },
    ],
  },
  {
    id: 2, name: "けしごむ", image: item2,
    variants: [
      { id: 0, name: "消す",  zoneImage: "https://placehold.co/120x120/2980b9/white?text=防", decorImages: [], resultId: 3 },
    ],
  },
  {
    id: 3, name: "ゼリー", image: item3,
    variants: [
      { id: 0, name: "設置する",  zoneImage: "https://placehold.co/120x120/27ae60/white?text=狙", decorImages: [], resultId: 2 },
    ],
  },
  {
    id: 4, name: "誰か", image: item4,
    variants: [
      { id: 0, name: "友達",  zoneImage: frend, decorImages: [], resultId: 1 },
      { id: 1, name: "誰だろう",  zoneImage: frend, decorImages: [], resultId: 2 },
    ],
  },
  {
    id: 5, name: "おこづかい", image: item5,
    variants: [
      { id: 0, name: "つかう",   zoneImage: bocchi, decorImages: [], resultId: 3 },
      { id: 1, name: "貯めておこう…", zoneImage: bocchi, decorImages: [], resultId: 3 },
    ],
  },
];
