export type Item = {
  id: number;
  name: string;
  image: string;
};

export const items: Item[] = [
  { id: 1, name: "Sword",  image: "https://placehold.co/80x80/e74c3c/white?text=Sword"  },
  { id: 2, name: "Shield", image: "https://placehold.co/80x80/2980b9/white?text=Shield" },
  { id: 3, name: "Bow",    image: "https://placehold.co/80x80/27ae60/white?text=Bow"    },
  { id: 4, name: "Staff",  image: "https://placehold.co/80x80/8e44ad/white?text=Staff"  },
  { id: 5, name: "Dagger", image: "https://placehold.co/80x80/f39c12/white?text=Dagger" },
];
