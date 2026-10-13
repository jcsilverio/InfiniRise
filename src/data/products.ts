export type Product = {
  name: string;
  status: string;
  pitch: string;
  ctaLabel: string;
  ctaHref: string;
};

function mailto(address: string, subject: string, body: string): string {
  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const launchNewsBody = `Hi InfiniRise Studios,

Please let me know when your new product launches.

Name:
Company (optional):
Anything else you'd like us to know (optional):

Thanks!`;

export const products: Product[] = [
  {
    name: 'New InfiniRise product',
    status: 'In development',
    pitch: 'A new software product is in development. Details at launch.',
    ctaLabel: 'Get launch news',
    ctaHref: mailto('contact@infinirisestudios.com', 'Launch news', launchNewsBody),
  },
];
