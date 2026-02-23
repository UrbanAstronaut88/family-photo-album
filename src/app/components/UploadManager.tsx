import { useState } from 'react';
import { Upload, X, Music, Image as ImageIcon, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

interface UploadManagerProps {
  photos: Photo[];
  onPhotosChange: (photos: Photo[]) => void;
  onAudioChange: (audioUrl: string | null) => void;
  audioUrl: string | null;
}

export function UploadManager({ photos, onPhotosChange, onAudioChange, audioUrl }: UploadManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'music'>('photos');

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto: Photo = {
          id: Date.now() + Math.random(),
          url: event.target?.result as string,
          caption: file.name.replace(/\.[^/.]+$/, '')
        };
        onPhotosChange([...photos, newPhoto]);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      onAudioChange(event.target?.result as string);
    };
    reader.readAsDataURL(file);

    e.target.value = '';
  };

  const handleDeletePhoto = (id: number) => {
    onPhotosChange(photos.filter(photo => photo.id !== id));
  };

  const handleCaptionChange = (id: number, newCaption: string) => {
    onPhotosChange(
      photos.map(photo =>
        photo.id === id ? { ...photo, caption: newCaption } : photo
      )
    );
  };

  const handleDeleteAudio = () => {
    onAudioChange(null);
  };

  return (
    <>
      {/* Settings Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-8 left-8 z-50 w-14 h-14 rounded-full bg-white/80 backdrop-blur-md shadow-xl flex items-center justify-center text-foreground hover:bg-white/90 transition-colors"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        aria-label="Настройки"
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Upload Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              className="fixed left-8 top-28 w-96 max-h-[calc(100vh-10rem)] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col"
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-foreground">Управление контентом</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab('photos')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      activeTab === 'photos'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground/60 hover:bg-muted/80'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4 inline mr-2" />
                    Фото
                  </button>
                  <button
                    onClick={() => setActiveTab('music')}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      activeTab === 'music'
                        ? 'bg-primary text-white'
                        : 'bg-muted text-foreground/60 hover:bg-muted/80'
                    }`}
                  >
                    <Music className="w-4 h-4 inline mr-2" />
                    Музыка
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === 'photos' ? (
                  <div className="space-y-4">
                    {/* Upload Button */}
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-foreground/40" />
                        <p className="text-sm text-foreground/60">
                          Нажмите для загрузки фото
                        </p>
                        <p className="text-xs text-foreground/40 mt-1">
                          Можно выбрать несколько
                        </p>
                      </div>
                    </label>

                    {/* Photos List */}
                    {photos.length === 0 ? (
                      <div className="text-center py-8 text-foreground/40">
                        <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Фотографии не загружены</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {photos.map((photo) => (
                          <div
                            key={photo.id}
                            className="bg-muted/30 rounded-lg p-3 flex gap-3"
                          >
                            <img
                              src={photo.url}
                              alt={photo.caption}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1 min-w-0">
                              <input
                                type="text"
                                value={photo.caption}
                                onChange={(e) => handleCaptionChange(photo.id, e.target.value)}
                                className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-sm mb-1 transition-colors"
                                placeholder="Подпись..."
                              />
                              <p className="text-xs text-foreground/40">
                                ID: {photo.id}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDeletePhoto(photo.id)}
                              className="w-8 h-8 rounded-full hover:bg-destructive/10 text-destructive flex items-center justify-center transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Upload Button */}
                    <label className="block">
                      <input
                        type="file"
                        accept="audio/*"
                        onChange={handleAudioUpload}
                        className="hidden"
                      />
                      <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors">
                        <Music className="w-8 h-8 mx-auto mb-2 text-foreground/40" />
                        <p className="text-sm text-foreground/60">
                          Нажмите для загрузки музыки
                        </p>
                        <p className="text-xs text-foreground/40 mt-1">
                          MP3, WAV, OGG
                        </p>
                      </div>
                    </label>

                    {/* Current Audio */}
                    {audioUrl ? (
                      <div className="bg-muted/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <Music className="w-5 h-5 text-primary" />
                            </div>
                            <div>
                              <p className="text-sm">Фоновая музыка</p>
                              <p className="text-xs text-foreground/40">Загружено</p>
                            </div>
                          </div>
                          <button
                            onClick={handleDeleteAudio}
                            className="w-8 h-8 rounded-full hover:bg-destructive/10 text-destructive flex items-center justify-center transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <audio controls className="w-full">
                          <source src={audioUrl} />
                        </audio>
                        <p className="text-xs text-foreground/40 mt-2">
                          ⓘ Музыка сохраняется только до закрытия браузера
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-foreground/40">
                        <Music className="w-12 h-12 mx-auto mb-2 opacity-30" />
                        <p className="text-sm">Музыка не загружена</p>
                        <p className="text-xs mt-1">Файл будет храниться до закрытия браузера</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
