// Styles
import "./youtubeVideo.scss";
// React
import { useEffect, useRef } from "react";

const YoutubeVideo = ({ YTVideoID }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    // Check -> YouTube API script is already loaded
    if (window.YT) {
      createYTPlayer();
    }
    else {
      // Load -> YouTube API script
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);

      // Define the callback before loading the script
      window.onYouTubeIframeAPIReady = createYTPlayer;

      // Cleanup
      return () => {
        document.head.removeChild(tag);
        delete window.onYouTubeIframeAPIReady;
      }
    }
  }, []);

  const createYTPlayer = () => {
    // Create a new YouTube player
    const player = new window.YT.Player(playerRef.current, {
      videoId: YTVideoID,
      events: {
        onReady: onPlayerReady,
      },
    });
  };

  const onPlayerReady = e => {
    // Default volume when playing the video -> from 0 to 100
    e.target.setVolume(5);
  }

  return (
    <div ref={playerRef}></div>
  );
}

export default YoutubeVideo;