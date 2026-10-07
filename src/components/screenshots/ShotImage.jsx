import React from "react";

// A plain <img> on purpose. These canvases are drawn to PNG by html2canvas,
// which downloads every picture itself before painting it; the responsive
// markup the Image component builds rewrites the source at render time and
// leaves nothing for that download to read. media.base44.com serves these
// files with an open CORS header, so the canvas stays readable.
export default function ShotImage({ src, alt, className }) {
  return <img src={src} alt={alt} crossOrigin="anonymous" className={className} />;
}