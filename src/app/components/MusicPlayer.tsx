import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [showPrompt, setShowPrompt] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioUrl = '/music/background.mp3';
  const hasTriedAutoplay = useRef(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      // Sync muted state with audio element
      audioRef.current.muted = isMuted;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    // Try to auto-play music when component mounts
    const attemptAutoplay = async () => {
      if (audioRef.current && !hasTriedAutoplay.current) {
        hasTriedAutoplay.current = true;
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowPrompt(false);
        } catch (error) {
          // Auto-play blocked by browser - show prompt
          setShowPrompt(true);
          setIsPlaying(false);
        }
      }
    };

    const timer = setTimeout(attemptAutoplay, 500);
    return () => clearTimeout(timer);
  }, []);

  // Try to play on any user interaction
  useEffect(() => {
    const handleUserInteraction = async () => {
      if (!isPlaying && audioRef.current) {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
          setShowPrompt(false);
        } catch (error) {
          // Still blocked
        }
      }
    };

    if (showPrompt) {
      window.addEventListener('click', handleUserInteraction, { once: true });
      window.addEventListener('touchstart', handleUserInteraction, { once: true });

      return () => {
        window.removeEventListener('click', handleUserInteraction);
        window.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, [showPrompt, isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
      setShowPrompt(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
      if (audioRef.current) {
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src={audioUrl} type="audio/mpeg" />
      </audio>

      {/* Prompt to enable music */}
      <AnimatePresence>
        {showPrompt && (
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={togglePlay}
          >
            <motion.div
              className="bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-4 text-center"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Music className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-medium text-foreground mb-2">
                Включить музыку?
              </h3>
              <p className="text-foreground/60 mb-6">
                Нажмите кнопку, чтобы начать воспроизведение
              </p>
              <motion.button
                onClick={togglePlay}
                className="w-full bg-gradient-to-br from-primary to-primary/80 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Включить музыку
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Player */}
      <motion.div
        className="fixed top-8 right-8 z-50 bg-white/70 backdrop-blur-2xl rounded-full shadow-2xl p-4 flex items-center gap-4 border border-white/40"
        initial={{ opacity: 0, y: -20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 200 }}
        whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
      >
        <motion.button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all flex items-center justify-center text-white shadow-lg"
          aria-label={isPlaying ? 'Пауза' : 'Воспроизвести'}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Pause className="w-5 h-5" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Play className="w-5 h-5 ml-0.5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        <div className="flex items-center gap-3">
          <motion.button
            onClick={toggleMute}
            className="text-foreground/60 hover:text-foreground transition-colors"
            aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </motion.button>

          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 h-1.5 bg-primary/20 rounded-full appearance-none cursor-pointer
                       [&::-webkit-slider-thumb]:appearance-none
                       [&::-webkit-slider-thumb]:w-4
                       [&::-webkit-slider-thumb]:h-4
                       [&::-webkit-slider-thumb]:rounded-full
                       [&::-webkit-slider-thumb]:bg-primary
                       [&::-webkit-slider-thumb]:cursor-pointer
                       [&::-webkit-slider-thumb]:shadow-lg
                       [&::-webkit-slider-thumb]:transition-transform
                       [&::-webkit-slider-thumb]:hover:scale-110
                       [&::-moz-range-thumb]:w-4
                       [&::-moz-range-thumb]:h-4
                       [&::-moz-range-thumb]:rounded-full
                       [&::-moz-range-thumb]:bg-primary
                       [&::-moz-range-thumb]:border-0
                       [&::-moz-range-thumb]:cursor-pointer
                       [&::-moz-range-thumb]:shadow-lg"
            aria-label="Громкость"
          />
        </div>
      </motion.div>
    </>
  );
}