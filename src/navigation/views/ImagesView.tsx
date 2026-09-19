import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { weddingPhotoUploadDay } from "../../helpers/constants";

const PAGE_SIZE = 9;
const IMAGES_API =
  "https://us-central1-euawedding-b7606.cloudfunctions.net/getWeddingImages";

const VIDEO_EXT = /\.(mp4|webm|mov|m4v|ogg)(\?|$)/i;

function isVideoUrl(url: string): boolean {
  return VIDEO_EXT.test(url);
}

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fdefda 0%, #f9ddc1 100%);
  padding: 2rem 1rem 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Card = styled.div`
  background: ${({ theme }) => theme.colors.background.light};
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.peach.light};
  box-shadow: 0 8px 32px rgba(181, 82, 57, 0.15);
  padding: 1.75rem 1.5rem 2rem;
  max-width: 1100px;
  width: 100%;
`;
const Title = styled.h1`
  font-family: "Linnea-bold", ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.terracotta.tertiary};
  font-size: 1.6rem;
  margin: 0 0 0.5rem;
  text-transform: uppercase;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.4rem;
  }
`;
const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.foreground};
  opacity: 0.85;
  margin: 0 0 1.75rem;
  text-align: center;
`;
const PasscodeForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  max-width: 320px;
  margin: 0 auto 1.5rem;
`;
const PasscodeInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid ${({ theme }) => theme.colors.peach.light};
  background: ${({ theme }) => theme.colors.background.light};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.95rem;
  outline: none;
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
  color: ${({ theme }) => theme.colors.foreground};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px rgba(217, 108, 74, 0.16);
  }
`;
const Button = styled.button`
  font-family: ${({ theme }) => theme.fonts.sans};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  outline: none;
  padding: 0.7rem 1.6rem;
  font-size: 0.95rem;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(181, 82, 57, 0.25);

  &:hover:enabled {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(181, 82, 57, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    box-shadow: none;
  }
`;
const ErrorText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.error.light};
  margin: 0;
  text-align: center;
`;
const LoadingText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.foreground};
  text-align: center;
  margin: 0 0 1.25rem;
`;
const MediaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.65rem;

  @media (max-width: 640px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 400px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;
const MediaTile = styled.button`
  position: relative;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid ${({ theme }) => theme.colors.peach.light};
  padding: 0;
  cursor: pointer;
  display: block;
  width: 100%;

  img,
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    pointer-events: none;
  }

  video {
    background: #1a1210;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;
const VideoBadge = styled.span`
  position: absolute;
  top: 0.45rem;
  left: 0.45rem;
  z-index: 1;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.65rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: white;
  background: rgba(0, 0, 0, 0.55);
  padding: 0.2rem 0.45rem;
  border-radius: 6px;
  pointer-events: none;
`;
const EmptyText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.foreground};
  opacity: 0.7;
  text-align: center;
  margin: 1.5rem 0 0.5rem;
`;
const FooterRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;
const PaginationRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.65rem;
`;
const MetaText = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.foreground};
  opacity: 0.65;
  margin: 0;
`;
const LightboxOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(20, 12, 10, 0.78);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.25rem;
  cursor: zoom-out;
`;
const LightboxMedia = styled.div`
  max-width: min(920px, 100%);
  max-height: 88vh;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35);
  background: #111;
  cursor: default;

  img,
  video {
    display: block;
    max-width: 100%;
    max-height: 88vh;
    width: auto;
    height: auto;
    object-fit: contain;
  }
`;

type MediaItem = {
  url: string;
  kind: "image" | "video";
};

function ImagesView() {
  const [passcode, setPasscode] = useState("");
  const [authorized, setAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  /** pageToken used to fetch each page number (page 1 uses null). */
  const [tokenByPage, setTokenByPage] = useState<Record<number, string | null>>({
    1: null,
  });
  const [hasNext, setHasNext] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const tokenByPageRef = useRef(tokenByPage);
  tokenByPageRef.current = tokenByPage;

  const activeItem = activeIndex != null ? media[activeIndex] : null;

  const fetchPage = useCallback(async (pageToken?: string | null) => {
    const params = new URLSearchParams({
      day: weddingPhotoUploadDay,
      limit: String(PAGE_SIZE),
    });
    if (pageToken) params.set("pageToken", pageToken);

    const res = await fetch(`${IMAGES_API}?${params.toString()}`);
    if (!res.ok) throw new Error("Failed to fetch media");

    const data = await res.json();
    const urls: string[] = (data.images || []).slice(0, PAGE_SIZE);
    const items: MediaItem[] = urls.map((url) => ({
      url,
      kind: isVideoUrl(url) ? "video" : "image",
    }));

    return {
      items,
      nextPageToken: (data.nextPageToken as string | null) || null,
    };
  }, []);

  useEffect(() => {
    if (!authorized) return;

    const pageToken = tokenByPageRef.current[page];
    if (pageToken === undefined) return;

    let cancelled = false;

    const loadPage = async () => {
      setLoading(true);
      setError(null);

      try {
        const { items, nextPageToken: token } = await fetchPage(pageToken);
        if (cancelled) return;

        setMedia(items);
        setHasNext(Boolean(token));
        if (token) {
          setTokenByPage((prev) => {
            if (prev[page + 1] === token) return prev;
            return { ...prev, [page + 1]: token };
          });
        }
      } catch (e) {
        console.error("Failed to load media via function", e);
        if (!cancelled) {
          setMedia([]);
          setHasNext(false);
          setError("Something went wrong while loading the media. Please try again later.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadPage();
    return () => {
      cancelled = true;
    };
  }, [authorized, fetchPage, page]);

  useEffect(() => {
    if (activeIndex == null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === "miamor") {
      setAuthorized(true);
      setError(null);
      setPage(1);
      setTokenByPage({ 1: null });
      setHasNext(false);
      setMedia([]);
    } else {
      setAuthorized(false);
      setError("Incorrect passcode. Please try again.");
    }
  };

  const goToPage = (nextPage: number) => {
    if (nextPage < 1 || loading) return;
    if (nextPage > page && !hasNext) return;
    if (tokenByPageRef.current[nextPage] === undefined) return;
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <PageContainer>
      <Card>
        <Title>Wedding Memories</Title>
        <Subtitle>
          {authorized
            ? "Photos and videos shared from the wedding."
            : "Enter the passcode to see photos and videos shared from the wedding."}
        </Subtitle>

        {!authorized && (
          <PasscodeForm onSubmit={handleSubmit}>
            <PasscodeInput
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
            />
            <Button type="submit">View media</Button>
            {error && <ErrorText>{error}</ErrorText>}
          </PasscodeForm>
        )}

        {authorized && (
          <>
            {loading && <LoadingText>Loading memories…</LoadingText>}
            {!loading && error && media.length === 0 && <ErrorText>{error}</ErrorText>}

            {!loading && media.length === 0 && !error && (
              <EmptyText>No photos or videos have been uploaded yet.</EmptyText>
            )}

            {media.length > 0 && (
              <MediaGrid>
                {media.map((item, index) => (
                  <MediaTile
                    key={`${item.url}-${index}`}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    aria-label={`Open memory ${index + 1}`}
                  >
                    {item.kind === "video" ? (
                      <>
                        <VideoBadge>Video</VideoBadge>
                        <video src={item.url} muted playsInline preload="metadata" />
                      </>
                    ) : (
                      <img
                        src={item.url}
                        alt={`Wedding memory ${index + 1}`}
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </MediaTile>
                ))}
              </MediaGrid>
            )}

            {!loading && media.length > 0 && (
              <FooterRow>
                <MetaText>
                  Page {page} · {media.length}{" "}
                  {media.length === 1 ? "photo" : "photos"}
                </MetaText>
                <PaginationRow>
                  <Button
                    type="button"
                    onClick={() => goToPage(page - 1)}
                    disabled={page <= 1 || loading}
                  >
                    Previous
                  </Button>
                  <Button
                    type="button"
                    onClick={() => goToPage(page + 1)}
                    disabled={!hasNext || loading}
                  >
                    Next
                  </Button>
                </PaginationRow>
                {error && media.length > 0 && <ErrorText>{error}</ErrorText>}
              </FooterRow>
            )}
          </>
        )}
      </Card>

      {activeItem && (
        <LightboxOverlay
          onClick={() => setActiveIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <LightboxMedia onClick={(e) => e.stopPropagation()}>
            {activeItem.kind === "video" ? (
              <video src={activeItem.url} controls playsInline autoPlay />
            ) : (
              <img src={activeItem.url} alt="Wedding memory" />
            )}
          </LightboxMedia>
        </LightboxOverlay>
      )}
    </PageContainer>
  );
}

export default ImagesView;
