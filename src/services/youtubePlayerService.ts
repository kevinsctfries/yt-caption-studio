declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
  }
}

type PlayerEvents = {
  onReady?: (event: YT.PlayerEvent) => void;
  onStateChange?: (event: YT.OnStateChangeEvent) => void;
};

let apiLoaded = false;
let apiLoadPromise: Promise<void> | null = null;

function loadYouTubeIframeAPI(): Promise<void> {
  if (apiLoaded) {
    return Promise.resolve();
  }
  if (apiLoadPromise) {
    return apiLoadPromise;
  }

  apiLoadPromise = new Promise(resolve => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";

    window.onYouTubeIframeAPIReady = () => {
      apiLoaded = true;
      resolve();
    };

    document.body.appendChild(tag);
  });

  return apiLoadPromise;
}

export async function createYouTubePlayer(
  element: HTMLElement,
  videoId: string,
  events?: PlayerEvents
): Promise<YT.Player> {
  await loadYouTubeIframeAPI();

  return new window.YT.Player(element, {
    videoId,
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      iv_load_policy: 3,
      fs: 1,
      disablekb: 0,
    },
    events: {
      onReady: events?.onReady,
      onStateChange: events?.onStateChange,
    },
  });
}
