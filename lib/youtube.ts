const YOUTUBE_ID = /^[\w-]{11}$/;

function isYoutubeId(value: string | undefined): boolean {
  return !!value && YOUTUBE_ID.test(value);
}

export function parseYoutubeId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;
  if (isYoutubeId(raw)) return raw;

  try {
    const url = new URL(raw.includes("://") ? raw : `https://${raw}`);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return isYoutubeId(id) ? id : null;
    }

    if (
      host === "youtube.com" ||
      host === "m.youtube.com" ||
      host === "music.youtube.com"
    ) {
      const v = url.searchParams.get("v");
      if (v && isYoutubeId(v)) return v;
      const parts = url.pathname.split("/").filter(Boolean);
      if (
        (parts[0] === "embed" || parts[0] === "shorts" || parts[0] === "live") &&
        isYoutubeId(parts[1])
      ) {
        return parts[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

export function youtubeThumbUrl(id: string): string {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
