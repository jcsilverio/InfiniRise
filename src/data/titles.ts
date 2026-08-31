export type TitleItem = {
  id: string;
  title: string;
  cancelled?: boolean;
  note: string;
  trailerUrl: string;
  image: string;
};

export const titles: TitleItem[] = [
  {
    id: 'battlefield-portal',
    title: 'Battlefield Portal',
    note: 'Weapons, vehicles, and modes',
    trailerUrl: 'https://youtu.be/q4qWMcQfOCc',
    image: 'https://img.youtube.com/vi/q4qWMcQfOCc/maxresdefault.jpg',
  },
  {
    id: 'killing-floor-2',
    title: 'Killing Floor 2',
    note: 'Early Access launch trailer',
    trailerUrl: 'https://youtu.be/fTATBUhD8tE',
    image: 'https://img.youtube.com/vi/fTATBUhD8tE/maxresdefault.jpg',
  },
  {
    id: 'eve-online',
    title: 'EVE Online',
    note: 'Retribution trailer',
    trailerUrl: 'https://youtu.be/hX0p0irEOls',
    image: 'https://img.youtube.com/vi/hX0p0irEOls/hqdefault.jpg',
  },
  {
    id: 'smite',
    title: 'SMITE',
    note: 'Welcome to the Battleground of the Gods',
    trailerUrl: 'https://youtu.be/xAPsmI_zDZs',
    image: 'https://img.youtube.com/vi/xAPsmI_zDZs/maxresdefault.jpg',
  },
  {
    id: 'tribes-ascend',
    title: 'Tribes: Ascend',
    note: 'Gameplay teaser',
    trailerUrl: 'https://youtu.be/9RjdB4_rkqU',
    image: 'https://img.youtube.com/vi/9RjdB4_rkqU/maxresdefault.jpg',
  },
  {
    id: 'global-agenda',
    title: 'Global Agenda',
    note: 'Launch trailer',
    trailerUrl: 'https://youtu.be/8w7w6eNp4II',
    image: 'https://img.youtube.com/vi/8w7w6eNp4II/hqdefault.jpg',
  },
  {
    id: 'world-of-darkness',
    title: 'World of Darkness',
    cancelled: true,
    note: '2010 animatic trailer',
    trailerUrl: 'https://youtu.be/OEi7nQbNDog',
    image: 'https://img.youtube.com/vi/OEi7nQbNDog/maxresdefault.jpg',
  },
];
