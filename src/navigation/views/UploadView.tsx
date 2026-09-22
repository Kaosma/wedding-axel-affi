import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { weddingPhotoUploadDay } from "../../helpers/constants";
import { useTheme } from "../../app/AppStyling";

const MAX_FILES = 20;
const UPLOAD_URL =
  "https://us-central1-euawedding-b7606.cloudfunctions.net/uploadWeddingPhoto";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fdefda 0%, #f9ddc1 100%);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Card = styled.div`
  background: ${useTheme().colors.red.secondary};
  border-radius: 16px;
  border: 1px solid ${useTheme().colors.red.secondary};
  box-shadow: 0 8px 32px rgba(181, 82, 57, 0.15);
  padding: 1.75rem 1.5rem 2rem;
  max-width: 480px;
  width: 100%;
  text-align: center;
`;
const Title = styled.h1`
  font-family: "Linnea-bold", ${useTheme().fonts.serif};
  color: ${useTheme().colors.red.primary};
  font-size: 1.5rem;
  margin: 0 0 0.5rem;
  text-transform: uppercase;

  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;
const Subtitle = styled.p`
  font-family: ${useTheme().fonts.sans};
  font-size: 0.95rem;
  color: ${useTheme().colors.foreground};
  opacity: 0.85;
  margin: 0 0 1.5rem;
`;
const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.5rem;
  margin: 0 0 1.25rem;

  @media (max-width: 400px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;
const PreviewThumb = styled.div`
  position: relative;
  aspect-ratio: 1;
  border-radius: 10px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.06);
  border: 1px solid ${useTheme().colors.red.primary};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;
const RemoveButton = styled.button`
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.55);
  color: white;
  font-size: 0.85rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;
const ButtonsRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;
const ProgressContainer = styled.div`
  margin-top: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const ProgressTrack = styled.div`
  width: 100%;
  max-width: 260px;
  height: 8px;
  border-radius: 999px;
  background: ${useTheme().colors.red.primary};
  overflow: hidden;
`;
const ProgressFill = styled.div`
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: ${useTheme().colors.primary};
  transition: width 0.2s ease-out;
`;
const UploadButton = styled.button`
  font-family: ${useTheme().fonts.sans};
  background: ${useTheme().colors.primary};
  color: white;
  border: none;
  outline: none;
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  border-radius: 999px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.25s ease;
  box-shadow: 0 4px 16px rgba(181, 82, 57, 0.25);

  &:hover:enabled {
    background: ${useTheme().colors.accent};
    transform: translateY(-1px);
    box-shadow: 0 6px 22px rgba(181, 82, 57, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
    box-shadow: none;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 6px rgba(217, 108, 74, 0.16);
  }
`;
const SecondaryButton = styled(UploadButton)`
  background: transparent;
  color: ${useTheme().colors.primary};
  border: 1.5px solid ${useTheme().colors.primary};
  box-shadow: none;

  &:hover:enabled {
    background: rgba(181, 82, 57, 0.08);
    transform: translateY(-1px);
    box-shadow: none;
  }
`;
const ProgressText = styled.p`
  margin-top: 1rem;
  font-family: ${useTheme().fonts.sans};
  font-size: 0.9rem;
  color: ${useTheme().colors.foreground};
`;
const HintText = styled.p`
  margin: 0.75rem 0 0;
  font-family: ${useTheme().fonts.sans};
  font-size: 0.8rem;
  color: ${useTheme().colors.foreground};
  opacity: 0.7;
`;

type PreviewItem = {
  id: string;
  file: File;
  url: string;
};

function UploadView() {
  const [previews, setPreviews] = useState<PreviewItem[]>([]);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const previewsRef = useRef(previews);
  previewsRef.current = previews;

  useEffect(() => {
    return () => {
      previewsRef.current.forEach((p) => URL.revokeObjectURL(p.url));
    };
  }, []);

  const addFiles = (fileList: FileList | null) => {
    if (!fileList || fileList.length === 0) return;

    const incoming = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (incoming.length === 0) {
      alert("Please select image files.");
      return;
    }

    setPreviews((prev) => {
      const room = MAX_FILES - prev.length;
      if (room <= 0) {
        alert(`You can upload up to ${MAX_FILES} photos at a time.`);
        return prev;
      }

      const slice = incoming.slice(0, room);
      if (incoming.length > room) {
        alert(`Only ${room} more photo${room === 1 ? "" : "s"} can be added (max ${MAX_FILES}).`);
      }

      return [
        ...prev,
        ...slice.map((file) => ({
          id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
          file,
          url: URL.createObjectURL(file),
        })),
      ];
    });
  };

  const removePreview = (id: string) => {
    setPreviews((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.url);
      return prev.filter((p) => p.id !== id);
    });
  };

  const clearPreviews = () => {
    setPreviews((prev) => {
      prev.forEach((p) => URL.revokeObjectURL(p.url));
      return [];
    });
  };

  const handleUpload = async () => {
    if (previews.length === 0 || uploading) return;

    setUploading(true);
    setProgress(0);

    const files = previews.map((p) => p.file);
    let uploaded = 0;
    let failed = 0;

    try {
      // One file per request — Cloud Functions cap HTTP bodies at ~10MB.
      for (const file of files) {
        const formData = new FormData();
        formData.append("eventId", weddingPhotoUploadDay);
        formData.append("file", file);

        const response = await fetch(UPLOAD_URL, { method: "POST", body: formData });
        if (!response.ok) {
          failed += 1;
        } else {
          uploaded += 1;
        }

        setProgress(Math.round(((uploaded + failed) / files.length) * 100));
      }

      if (failed === 0) {
        alert(
          uploaded === 1
            ? "Upload complete! Thank you for sharing a memory with us."
            : `Upload complete! Thank you for sharing ${uploaded} memories with us.`
        );
        clearPreviews();
      } else if (uploaded === 0) {
        alert("Upload failed. Please try again with fewer or smaller photos.");
      } else {
        alert(
          `${uploaded} photo${uploaded === 1 ? "" : "s"} uploaded, but ${failed} failed. Please retry the ones that failed.`
        );
        // Keep previews so the guest can retry; they can remove successes manually if needed.
      }
    } catch {
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  const resetFileInput = (id: string) => {
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (input) input.value = "";
  };

  return (
    <PageContainer>
      <Card>
        <Title>Share photos from the wedding</Title>
        <Subtitle>
          Pick one or more favorite moments so we can treasure them forever.
        </Subtitle>

        {previews.length > 0 && (
          <PreviewGrid>
            {previews.map((item) => (
              <PreviewThumb key={item.id}>
                <img src={item.url} alt="Preview" />
                <RemoveButton
                  type="button"
                  aria-label="Remove photo"
                  onClick={() => removePreview(item.id)}
                  disabled={uploading}
                >
                  ×
                </RemoveButton>
              </PreviewThumb>
            ))}
          </PreviewGrid>
        )}

        <div>
          <input
            type="file"
            accept="image/*"
            id="libraryInput"
            hidden
            multiple
            onChange={(e) => {
              addFiles(e.target.files);
              resetFileInput("libraryInput");
            }}
          />
          <input
            type="file"
            accept="image/*"
            capture="environment"
            id="cameraInput"
            hidden
            onChange={(e) => {
              addFiles(e.target.files);
              resetFileInput("cameraInput");
            }}
          />

          <ButtonsRow>
            <SecondaryButton
              type="button"
              onClick={() => document.getElementById("libraryInput")?.click()}
              disabled={uploading || previews.length >= MAX_FILES}
            >
              Choose from library
            </SecondaryButton>
            <SecondaryButton
              type="button"
              onClick={() => document.getElementById("cameraInput")?.click()}
              disabled={uploading || previews.length >= MAX_FILES}
            >
              Take a photo
            </SecondaryButton>
          </ButtonsRow>

          {previews.length > 0 && (
            <ButtonsRow>
              <UploadButton type="button" onClick={handleUpload} disabled={uploading}>
                Upload {previews.length} photo{previews.length === 1 ? "" : "s"}
              </UploadButton>
            </ButtonsRow>
          )}

          <HintText>You can select up to {MAX_FILES} photos at once.</HintText>
        </div>

        {uploading && (
          <ProgressContainer>
            <ProgressTrack>
              <ProgressFill style={{ width: `${progress}%` }} />
            </ProgressTrack>
            <ProgressText>
              Uploading {previews.length} photo{previews.length === 1 ? "" : "s"}… {progress}%
            </ProgressText>
          </ProgressContainer>
        )}
      </Card>
    </PageContainer>
  );
}

export default UploadView;
