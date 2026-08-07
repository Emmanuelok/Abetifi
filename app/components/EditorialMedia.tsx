import type { VisualAsset } from "../lib/visuals";
import Image from "next/image";

export function EditorialMedia({
  asset,
  className = "",
  eager = false,
}: {
  asset: VisualAsset;
  className?: string;
  eager?: boolean;
}) {
  return (
    <figure className={`editorial-media ${className}`.trim()}>
      <div className="editorial-media__frame">
        <Image
          src={asset.src}
          alt={asset.alt}
          fill
          sizes="(max-width: 820px) 100vw, 50vw"
          priority={eager}
          unoptimized
        />
        <span className="editorial-media__label">{asset.label}</span>
      </div>
      <figcaption>
        <span>{asset.caption}</span>
        {asset.credit ? <small>{asset.credit}</small> : null}
      </figcaption>
    </figure>
  );
}
