const EMBED_BLOCKED_HOSTS = [
  'medium.com',
  'gamepressure.com',
  'gdconf.com',
  'museumofdesign.org',
  'huggingface.co',
  'linkedin.com',
];

export function canEmbedUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    return !EMBED_BLOCKED_HOSTS.some((blocked) => host === blocked || host.endsWith(`.${blocked}`));
  } catch {
    return false;
  }
}

export function hostnameLabel(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
}
