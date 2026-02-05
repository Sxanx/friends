import { forwardRef, useImperativeHandle, useRef } from "react";

export interface BackgroundMusicHandle {
  play: () => void;
  pause: () => void;
}

interface BackgroundMusicProps {
  src?: string;
}

const BackgroundMusic = forwardRef<BackgroundMusicHandle, BackgroundMusicProps>(
  ({ src = "/music/background.mp3" }, ref) => {
    const audioRef = useRef<HTMLAudioElement>(null);

    useImperativeHandle(ref, () => ({
      play() {
        const audio = audioRef.current;
        if (!audio) return;
        audio.volume = 0.4;
        audio.loop = true;
        audio.play().catch(() => {});
      },
      pause() {
        audioRef.current?.pause();
      },
    }));

    return <audio ref={audioRef} src={src} preload="auto" />;
  }
);

export default BackgroundMusic;
