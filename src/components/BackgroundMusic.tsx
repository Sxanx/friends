import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundMusicProps {
  src?: string;
}

const BackgroundMusic = ({
  src = `${import.meta.env.BASE_URL}music/background.mp3`,
}: BackgroundMusicProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.loop = true;
    audio.volume = 0.3;

    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        audio
          .play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // autoplay อาจโดนบล็อก ต้องกดปุ่มเอง
          });

        document.removeEventListener("click", handleFirstInteraction);
      }
    };

    document.addEventListener("click", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(console.error);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={src} preload="auto" />

      <button
        onClick={toggleMusic}
        className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-card/90 backdrop-blur-sm border border-primary/20 shadow-soft hover:shadow-hover transition-all flex items-center justify-center group hover:scale-110"
        aria-label={isPlaying ? "ปิดเสียงเพลง" : "เปิดเสียงเพลง"}
      >
        {isPlaying ? (
          <Volume2 className="w-5 h-5 text-primary animate-pulse-soft" />
        ) : (
          <VolumeX className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        )}

        {isPlaying && (
          <>
            <span className="absolute inset-0 rounded-full border-2 border-primary/30 animate-ping" />
            <span className="absolute inset-0 rounded-full border border-primary/20 animate-pulse" />
          </>
        )}
      </button>
    </>
  );
};

export default BackgroundMusic;