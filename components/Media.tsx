import Image from "next/image";
import type { KegiatanMedia } from "@/data/data-kegiatan";

interface MediaViewProps {
  media: KegiatanMedia;
  alt: string;
  priority?: boolean;
  sizes?: string;
}

export default function MediaView({
  media,
  alt,
  priority,
  sizes,
}: MediaViewProps) {
  if (media.type === "video") {
    return (
      <video
        className="absolute inset-0 h-full w-full bg-black object-contain"
        controls
        playsInline
        preload="metadata"
        poster={media.poster}
      >
        <source
          src={encodeURI(media.src)}
          type={media.mimeType ?? "video/mp4"}
        />
      </video>
    );
  }

  return (
    <Image
      src={media.src}
      alt={media.alt ?? alt}
      fill
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}
