"use client";

import NextImage from "next/image";
import React, { Component } from "react";

import type { ErrorInfo, ReactNode } from "react";

// ErrorBoundary 컴포넌트 추가
class ErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Media component error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }

    return this.props.children;
  }
}

export function Video({
  className,
  src,
  ...props
}: React.VideoHTMLAttributes<HTMLVideoElement>) {
  // src가 없을 경우 처리
  if (!src) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div data-media className={className}>
        <div className="relative overflow-hidden rounded-xl">
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10"></div>
          <video autoPlay playsInline loop muted src={src} {...props} />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export function YouTubeVideo({
  className,
  id,
  ...props
}: React.IframeHTMLAttributes<HTMLIFrameElement> & { id?: string }) {
  // id가 없을 경우 처리
  if (!id) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div data-media className={className}>
        <div className="not-prose relative overflow-hidden rounded-xl">
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10"></div>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="aspect-video w-full border-0"
            {...props}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export function Iframe({
  height = 500,
  children,
  className,
  src,
  ...props
}: React.IframeHTMLAttributes<HTMLIFrameElement>) {
  // src가 없을 경우 처리
  if (!src) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div data-media className={className}>
        <div className="not-prose relative overflow-hidden rounded-xl">
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10"></div>
          <iframe
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            className="w-full border-0"
            style={{ height }}
            src={src}
            {...props}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}

export function Image({
  src,
  alt,
  className,
  ...props
}: React.ComponentProps<typeof NextImage>) {
  // src가 없을 경우 처리
  if (!src) {
    return null;
  }

  return (
    <ErrorBoundary>
      <div data-media className={className}>
        <div className="relative overflow-hidden rounded-xl">
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-slate-950/10 ring-inset dark:ring-white/10"></div>
          {typeof src === "string" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src}
              alt={alt || ""}
              onError={(e) => {
                // 이미지 로드 실패 시 처리
                e.currentTarget.style.display = "none";
              }}
              {...props}
            />
          ) : (
            <NextImage
              width={768 * 2}
              src={src}
              alt={alt || ""}
              onError={() => {
                // NextImage에서는 onError가 다르게 처리됨
                console.error("Failed to load Next Image");
              }}
              {...props}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}
