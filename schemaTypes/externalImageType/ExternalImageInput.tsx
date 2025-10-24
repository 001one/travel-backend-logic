import React, { useState } from "react";
import type { ObjectInputProps } from "sanity"; // ✅ correct Sanity type helpers
import { set, unset } from "sanity";

interface ExternalImageValue {
  url?: string;
  alt?: string;
}

// 👇 Use proper typing from Sanity
export function ExternalImageInput(
  props: ObjectInputProps<ExternalImageValue>
) {
  const { value = {}, onChange } = props;
  const [url, setUrl] = useState(value.url || "");

  const handleUrlChange = (newUrl: string) => {
    setUrl(newUrl);
    if (newUrl) {
      onChange(set({ ...value, url: newUrl }));
    } else {
      onChange(unset());
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <input
        type="url"
        placeholder="Enter image URL..."
        value={url}
        onChange={(e) => handleUrlChange(e.target.value)}
        style={{
          padding: "8px",
          fontSize: "1rem",
          borderRadius: "6px",
          border: "1px solid #444",
          color: "white",
          background: "#1e1e1e",
        }}
      />

      {url && (
        <img
          src={url}
          alt={value.alt || "Preview"}
          style={{
            maxWidth: "100%",
            maxHeight: "200px",
            borderRadius: "8px",
            objectFit: "cover",
            border: "1px solid #333",
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
        />
      )}
    </div>
  );
}
