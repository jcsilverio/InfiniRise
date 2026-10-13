export type Product = {
  name: string;
  status: string;
  pitch: string;
  ctaLabel: string;
  ctaHref: string;
};

export const products: Product[] = [
  {
    name: 'New InfiniRise product',
    status: 'In development',
    pitch: 'A new software product is in development. Details at launch.',
    ctaLabel: 'Get launch news',
    ctaHref: 'mailto:contact@infinirisestudios.com?subject=Launch%20news',
  },
];
