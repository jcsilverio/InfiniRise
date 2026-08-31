export function youtubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be' || parsed.hostname.endsWith('.youtu.be')) {
      const id = parsed.pathname.replace(/^\//, '').split('/')[0];
      return id || null;
    }
    return parsed.searchParams.get('v');
  } catch {
    return null;
  }
}
