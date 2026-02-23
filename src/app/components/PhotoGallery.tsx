import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, Calendar, MapPin } from 'lucide-react';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    setImageLoaded(false);
  };

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    setImageLoaded(false);
  };

  const goToPhoto = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setImageLoaded(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, photos.length]);

  // Swipe detection
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;

    if (info.offset.x > swipeThreshold) {
      goToPrevious();
    } else if (info.offset.x < -swipeThreshold) {
      goToNext();
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.9,
    }),
  };

  if (photos.length === 0) {
    return (
      <div className="relative w-full h-screen flex items-center justify-center">
        <div className="text-center text-foreground/40">
          <p className="text-xl mb-2">Галерея пуста</p>
          <p className="text-sm">Добавьте фотографии в папку public/photos/</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center px-8">
      {/* Main Photo Container */}
      <div className="relative w-full max-w-6xl h-[70vh] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="absolute inset-0 flex items-center justify-center"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Loading Skeleton */}
              {!imageLoaded && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="w-full max-w-3xl h-[60vh] bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-3xl shadow-2xl animate-pulse" />
                </motion.div>
              )}

              <img
                src={photos[currentIndex].url}
                alt={photos[currentIndex].caption}
                className={`max-w-full max-h-full object-contain rounded-3xl shadow-2xl transition-opacity duration-500 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
              />

              {/* Photo Metadata - улучшенная карточка с glassmorphism */}
              <motion.div
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >

                {/* Caption */}
                <div className="bg-gradient-to-r from-primary/90 via-secondary/90 to-accent/90 backdrop-blur-xl px-8 py-4 rounded-full shadow-xl border border-white/40">
                  <p className="text-center text-white font-light text-lg">
                    {photos[currentIndex].caption}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Left Navigation Zone */}
        <div
          className="absolute left-0 top-0 h-full w-1/3 cursor-pointer group z-10"
          onMouseEnter={(e) => {
            if (photos.length > 1) {
              e.currentTarget.querySelector('.nav-hint')?.classList.add('opacity-100');
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('.nav-hint')?.classList.remove('opacity-100');
          }}
          onClick={goToPrevious}
        >
          <motion.div
            className="nav-hint absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/70 backdrop-blur-2xl rounded-full shadow-2xl flex items-center justify-center opacity-0 transition-all duration-300 border border-white/40"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronLeft className="w-7 h-7 text-foreground/70" />
          </motion.div>
        </div>

        {/* Right Navigation Zone */}
        <div
          className="absolute right-0 top-0 h-full w-1/3 cursor-pointer group z-10"
          onMouseEnter={(e) => {
            if (photos.length > 1) {
              e.currentTarget.querySelector('.nav-hint')?.classList.add('opacity-100');
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector('.nav-hint')?.classList.remove('opacity-100');
          }}
          onClick={goToNext}
        >
          <motion.div
            className="nav-hint absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/70 backdrop-blur-2xl rounded-full shadow-2xl flex items-center justify-center opacity-0 transition-all duration-300 border border-white/40"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 0.9)" }}
            whileTap={{ scale: 0.95 }}
          >
            <ChevronRight className="w-7 h-7 text-foreground/70" />
          </motion.div>
        </div>
      </div>

      {/* Navigation Dots */}
      {photos.length > 1 && (
        <motion.div
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex gap-3 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {photos.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToPhoto(index)}
              className="group relative"
              aria-label={`Перейти к фото ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.95 }}
            >
              <div
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-10 h-3 bg-primary shadow-lg'
                    : 'w-3 h-3 bg-primary/30 hover:bg-primary/50'
                }`}
              />
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Counter with progress */}
      <motion.div
        className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white/70 backdrop-blur-2xl px-6 py-3 rounded-full shadow-2xl z-20 border border-white/40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-3">
          <p className="text-sm text-foreground/70 font-light">
            {currentIndex + 1} / {photos.length}
          </p>
          {/* Mini progress bar */}
          <div className="w-20 h-1 bg-primary/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + 1) / photos.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}