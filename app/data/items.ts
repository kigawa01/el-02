export type ItemVariant = {
  id: number;
  name: string;
  zoneImage: string;
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
    id: 1, name: "Sword", image: "https://placehold.co/80x80/e74c3c/white?text=Sword",
    variants: [
      { id: 0, name: "斬る",  zoneImage: "https://placehold.co/120x120/e74c3c/white?text=斬", resultId: 1 },
      { id: 1, name: "突く",  zoneImage: "https://placehold.co/120x120/c0392b/white?text=突", resultId: 2 },
      { id: 2, name: "払う",  zoneImage: "https://placehold.co/120x120/e67e22/white?text=払", resultId: 3 },
    ],
  },
  {
    id: 2, name: "Shield", image: "https://placehold.co/80x80/2980b9/white?text=Shield",
    variants: [
      { id: 0, name: "防ぐ",  zoneImage: "https://placehold.co/120x120/2980b9/white?text=防", resultId: 1 },
      { id: 1, name: "弾く",  zoneImage: "https://placehold.co/120x120/1a5276/white?text=弾", resultId: 2 },
    ],
  },
  {
    id: 3, name: "Bow", image: "https://placehold.co/80x80/27ae60/white?text=Bow",
    variants: [
      { id: 0, name: "狙う",  zoneImage: "https://placehold.co/120x120/27ae60/white?text=狙", resultId: 1 },
      { id: 1, name: "連射",  zoneImage: "https://placehold.co/120x120/1e8449/white?text=連", resultId: 2 },
      { id: 2, name: "曲射",  zoneImage: "https://placehold.co/120x120/a9cce3/white?text=曲", resultId: 3 },
    ],
  },
  {
    id: 4, name: "Staff", image: "https://placehold.co/80x80/8e44ad/white?text=Staff",
    variants: [
      { id: 0, name: "詠唱",  zoneImage: "https://placehold.co/120x120/8e44ad/white?text=詠", resultId: 1 },
      { id: 1, name: "解放",  zoneImage: "https://placehold.co/120x120/6c3483/white?text=解", resultId: 2 },
    ],
  },
  {
    id: 5, name: "Dagger", image: "https://placehold.co/80x80/f39c12/white?text=Dagger",
    variants: [
      { id: 0, name: "刺す",   zoneImage: "https://placehold.co/120x120/f39c12/white?text=刺", resultId: 1 },
      { id: 1, name: "投げる", zoneImage: "https://placehold.co/120x120/d68910/white?text=投", resultId: 2 },
    ],
  },
];
