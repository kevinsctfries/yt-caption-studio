/// <reference types="vite/client" />

/// <reference types="vite/client" />
/// <reference types="youtube" />

declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady?: () => void;
  }
}
