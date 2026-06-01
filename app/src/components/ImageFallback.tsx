import { useState, useEffect, type ImgHTMLAttributes } from "react";

interface ImageFallbackProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallbackColor?: string;
}

export function ImageFallback({
  fallbackColor = "#0b0c14",
  style,
  onError,
  src,
  ...props
}: ImageFallbackProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  if (failed) {
    return (
      <div
        className="w-full h-full"
        style={{
          background: `linear-gradient(135deg, ${fallbackColor}33, ${fallbackColor})`,
          ...style,
        }}
        aria-label={props.alt || "Image failed to load"}
        role="img"
      />
    );
  }

  return (
    <img
      {...props}
      src={src}
      style={style}
      loading="lazy"
      decoding="async"
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
