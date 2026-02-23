import { motion } from 'motion/react';
import { PhotoGallery } from './components/PhotoGallery';
import { MusicPlayer } from './components/MusicPlayer';

interface Photo {
  id: number;
  url: string;
  caption: string;
}

// Photos from public folder
const photos: Photo[] = [
  {
    id: 1,
    url: '/photos/1.jpg',
    caption: 'Мои первые дни'
  },
  {
    id: 2,
    url: '/photos/2.jpg',
    caption: 'Я с мамой'
  },
  {
    id: 3,
    url: '/photos/3.jpg',
    caption: 'Я с папой'
  },
  {
    id: 4,
    url: '/photos/4.jpg',
    caption: 'Семейные моменты'
  },
  {
    id: 5,
    url: '/photos/5.jpg',
    caption: 'Опять с папой'
  },
  {
    id: 6,
    url: '/photos/6.jpg',
    caption: 'Острый козырёк'
  },
  {
    id: 7,
    url: '/photos/7.jpg',
    caption: 'Мне один месяц'
  },
  {
    id: 8,
    url: '/photos/8.jpg',
    caption: 'Тут мне два месяца'
  },
  {
    id: 9,
    url: '/photos/9.jpg',
    caption: 'А тут три месяца'
  },
  {
    id: 10,
    url: '/photos/10.jpg',
    caption: 'Отметка в четыре месяца пройдена))'
  },
  {
    id: 11,
    url: '/photos/11.jpg',
    caption: 'Пять месяцев'
  },
  {
    id: 12,
    url: '/photos/12.jpg',
    caption: 'Ура! Мне пол года'
  },
  {
    id: 13,
    url: '/photos/13.jpg',
    caption: 'Семь месяцев'
  },
  {
    id: 14,
    url: '/photos/14.jpg',
    caption: 'Восемь месяцев'
  },
  {
    id: 15,
    url: '/photos/15.jpg',
    caption: 'Восемь месяцев позади'
  },
  {
    id: 16,
    url: '/photos/16.jpg',
    caption: 'Ура! Десять месяцев'
  },
  {
    id: 17,
    url: '/photos/17.jpg',
    caption: 'Одиннадцать месяцев'
  },
  {
    id: 18,
    url: '/photos/18.jpg',
    caption: 'Мне один годик'
  },
  {
    id: 19,
    url: '/photos/19.jpg',
    caption: 'Би-Би'
  },
  {
    id: 20,
    url: '/photos/20.jpg',
    caption: 'Кормлю голубей'
  },
  {
    id: 21,
    url: '/photos/21.jpg',
    caption: 'Учимся улыбаться'
  },
  {
    id: 22,
    url: '/photos/22.jpg',
    caption: 'Пью водичку'
  },
  {
    id: 23,
    url: '/photos/23.jpg',
    caption: 'Что они от меня хотят ?!'
  },
  {
    id: 24,
    url: '/photos/24.jpg',
    caption: 'Это моя подружка Теона'
  },
  {
    id: 25,
    url: '/photos/25.jpg',
    caption: 'Тут я балдею'
  },
  {
    id: 26,
    url: '/photos/26.jpg',
    caption: 'Улыбаемся )))'
  },
  {
    id: 27,
    url: '/photos/27.jpg',
    caption: 'Собираюсь на прогулку'
  },
  {
    id: 28,
    url: '/photos/28.jpg',
    caption: 'Устал...'
  },
  {
    id: 29,
    url: '/photos/29.jpg',
    caption: 'У бабушки на работе'
  },
  {
    id: 30,
    url: '/photos/30.jpg',
    caption: 'Работу работаем'
  },
  {
    id: 31,
    url: '/photos/31.jpg',
    caption: 'С бабушкой'
  },
  {
    id: 32,
    url: '/photos/32.jpg',
    caption: 'Это я на самокате'
  },
  {
    id: 33,
    url: '/photos/33.jpg',
    caption: 'Я с бабушкой и папой'
  },
  {
    id: 34,
    url: '/photos/34.jpg',
    caption: 'Мои кулинарные таланты'
  },
  {
    id: 35,
    url: '/photos/35.jpg',
    caption: 'С любимой бабушкой'
  },
];

export default function App() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#fef9f5] via-[#f5ebe0] to-[#e8d5c4] overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-accent/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [-40, 40, -40],
            y: [-20, 20, -20],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        className="relative z-30 pt-16 pb-6 text-center px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="inline-block mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <div className="text-6xl">👶</div>
        </motion.div>

        <h1 className="text-4xl md:text-6xl mb-4 text-foreground tracking-tight font-light">
          Страница посвящена сыну Ванюшке
        </h1>

        <motion.div
          className="max-w-2xl mx-auto space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="text-foreground/70 text-lg md:text-xl leading-relaxed">
            Воспоминания, которые мы храним
          </p>
          <p className="text-foreground/60 text-base md:text-lg leading-relaxed">
            Рад видеть Вас на этой странице, меня зовут Ваня. Моя история началась 10.01.2022 года. В этот день я появился на свет...
          </p>
        </motion.div>
      </motion.header>

      {/* Music Player */}
      <MusicPlayer />

      {/* Photo Gallery */}
      <PhotoGallery photos={photos} />

      {/* Footer */}
      <motion.footer
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-center text-foreground/40 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <p className="font-light">Coded by Bondarenko Kirill</p>
      </motion.footer>
    </div>
  );
}