"use client";

import Image from "next/image";
import { useState } from "react";
import { media, mediaCategories, type MediaCategory } from "@/lib/media";

export function MediaPreview() {
  const [category, setCategory] = useState<MediaCategory>("exterior-front");
  const [assetIndex, setAssetIndex] = useState(0);
  const [imageUnavailable, setImageUnavailable] = useState(false);
  const selectedAssets = media[category];
  const selectedAsset = selectedAssets[assetIndex] ?? selectedAssets[0];
  const categoryNumber = String(mediaCategories.findIndex((item) => item.id === category) + 1).padStart(2, "0");

  function selectCategory(nextCategory: MediaCategory) {
    setCategory(nextCategory);
    setAssetIndex(0);
    setImageUnavailable(false);
  }

  return (
    <section className="media-browser" id="collection" aria-labelledby="collection-title">
      <div className="media-browser-heading">
        <div>
          <p className="eyebrow"><span className="eyebrow-rule" /> IMAGE INDEX</p>
          <h3 id="collection-title">Explore the details.</h3>
        </div>
        <p>Six views. One considered study.</p>
      </div>

      <div className="media-viewer" aria-live="polite">
        {imageUnavailable ? (
          <div className="image-fallback">
            <span className="fallback-mark">GT3</span>
            <p>This view is unavailable</p>
          </div>
        ) : (
          <Image
            key={selectedAsset.src}
            src={selectedAsset.src}
            alt={selectedAsset.alt}
            fill
            sizes="(max-width: 760px) 90vw, 84vw"
            onError={() => setImageUnavailable(true)}
          />
        )}
        <div className="image-index">{categoryNumber} <span>/</span> 06</div>
        {selectedAssets.length > 1 && (
          <div className="asset-count" role="group" aria-label="Choose an interior image">
            {selectedAssets.map((asset, index) => (
              <button
                key={asset.src}
                className={assetIndex === index ? "asset-dot active" : "asset-dot"}
                aria-label={`Show interior image ${index + 1}`}
                aria-pressed={assetIndex === index}
                onClick={() => { setAssetIndex(index); setImageUnavailable(false); }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="media-browser-footer">
        <div className="preview-caption" aria-live="polite">
          <span className="caption-label">CURRENT VIEW</span>
          <span>{mediaCategories.find((item) => item.id === category)?.label}</span>
        </div>
        <div className="category-list" role="group" aria-label="Choose a media view">
          {mediaCategories.map((item, index) => (
            <button
              key={item.id}
              className={category === item.id ? "category-button selected" : "category-button"}
              aria-pressed={category === item.id}
              onClick={() => selectCategory(item.id)}
            >
              <span className="category-number">0{index + 1}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
