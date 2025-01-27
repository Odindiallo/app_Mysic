"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Song {
  title: string;
  description: string;
  src: string;
  audioUrl: string;
  ctaText: string;
  content: () => React.ReactNode;
}

interface AudioPlayerProps {
  audioUrl: string;
  onPlay?: () => void;
  onPause?: () => void;
  minimal?: boolean;
}

function AudioPlayer({ audioUrl, onPlay, onPause, minimal = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(audioRef.current?.duration || 0);
      });

      audioRef.current.addEventListener('timeupdate', () => {
        const progress = (audioRef.current?.currentTime || 0) / (audioRef.current?.duration || 1) * 100;
        setProgress(progress);
      });

      audioRef.current.addEventListener('ended', () => {
        setIsPlaying(false);
        setProgress(0);
        onPause?.();
      });
    }
  }, [onPause]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        onPause?.();
      } else {
        audioRef.current.play();
        onPlay?.();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (minimal) {
    return (
      <div className="flex items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          onClick={togglePlay}
          className="h-8 w-8 rounded-full bg-rose-500 hover:bg-rose-600 text-white"
        >
          {isPlaying ? (
            <Pause className="h-4 w-4" />
          ) : (
            <Play className="h-4 w-4 ml-0.5" />
          )}
        </Button>
        <div className="flex-1 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-rose-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 tabular-nums">
          {formatTime((progress / 100) * duration)}
        </span>
        <audio
          ref={audioRef}
          src={audioUrl}
          preload="metadata"
          onError={(e) => console.error("Error loading audio:", e)}
        />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          aria-label={isMuted ? "Unmute" : "Mute"}
          className="hover:bg-rose-100 dark:hover:bg-rose-900"
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause" : "Play"}
          className="hover:bg-rose-100 dark:hover:bg-rose-900"
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <div className="flex-1 relative h-2 bg-gray-100 dark:bg-neutral-800 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-rose-500 transition-all duration-100"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums w-12 text-right">
          {formatTime((progress / 100) * duration)}
        </span>
      </div>

      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onError={(e) => console.error("Error loading audio:", e)}
      />
    </div>
  );
}

const sampleSongs: Song[] = [
  {
    description: "R&B / Soul",
    title: "Love Song To Rebekah",
    src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1000",
    ctaText: "Play",
    audioUrl: "/samples/love-song-to-rebekah.mp3",
    content: () => (
      <p>
        A soulful R&B ballad crafted with love and emotion. This custom song was created
        for Rebekah as a heartfelt expression of love. The smooth melody and romantic
        lyrics perfectly capture the essence of their relationship. <br /> <br />
        Features include rich harmonies, gentle piano accompaniment, and passionate vocals
        that create an intimate atmosphere perfect for special moments together.
      </p>
    ),
  },
  {
    description: "Pop Rock",
    title: "Happy Birthday Dad",
    src: "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?q=80&w=1000",
    ctaText: "Play",
    audioUrl: "/samples/happy-bday-dad.mp3",
    content: () => (
      <p>
        An upbeat pop-rock celebration song created for a special father's birthday.
        This energetic track combines catchy melodies with heartfelt lyrics that express
        gratitude and love for dad. <br /> <br />
        The song features dynamic guitar riffs, uplifting drums, and memorable chorus
        that makes it perfect for birthday celebrations and family gatherings.
      </p>
    ),
  },
  {
    description: "Classical",
    title: "Our Wedding Day",
    src: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?q=80&w=1000",
    ctaText: "Play",
    audioUrl: "/samples/wedding-song.mp3",
    content: () => (
      <p>
        A beautiful classical composition created for a couple's special day. This elegant
        piece combines traditional wedding elements with modern arrangements to create
        a timeless masterpiece. <br /> <br />
        The song features orchestral instruments, including strings and piano, creating
        a romantic atmosphere perfect for walking down the aisle or the first dance.
      </p>
    ),
  },
];

export default function SampleSongs() {
  const [active, setActive] = useState<Song | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative py-32 overflow-hidden bg-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black,transparent)]" />
      </div>

      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-rose-100 text-rose-700 mb-4 inline-block">
            Sample Library
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-rose-500 to-purple-600">
            Listen to Our Sample Songs
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each song is uniquely crafted to capture the essence of special moments and emotions.
            Explore our collection of custom-made songs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {sampleSongs.map((song, index) => {
            const isActive = active?.title === song.title;
            
            return (
              <motion.div
                key={song.title}
                onClick={() => setActive(isActive ? null : song)}
                className={cn(
                  "relative h-full w-full cursor-pointer group",
                  isActive ? "md:col-span-2 lg:col-span-3 lg:max-w-3xl lg:mx-auto" : ""
                )}
                layout
              >
                <motion.div
                  className={cn(
                    "relative h-full w-full overflow-hidden rounded-2xl",
                    "bg-white shadow-lg hover:shadow-xl transition-shadow duration-300",
                    "border border-neutral-200 dark:border-neutral-800"
                  )}
                  layout
                >
                  <motion.div
                    className={cn(
                      "relative",
                      isActive ? "aspect-[21/9]" : "aspect-[4/3]"
                    )}
                    layout
                  >
                    <Image
                      src={song.src}
                      alt={song.title}
                      width={isActive ? 1200 : 400}
                      height={isActive ? 500 : 300}
                      className="object-cover w-full h-full"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/0" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <motion.h3 
                        className="text-xl font-semibold text-white"
                        layout="position"
                      >
                        {song.title}
                      </motion.h3>
                      <motion.p 
                        className="text-white/90 text-sm"
                        layout="position"
                      >
                        {song.description}
                      </motion.p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="p-4"
                    layout="position"
                  >
                    <AudioPlayer audioUrl={song.audioUrl} minimal />
                  </motion.div>

                  <motion.div
                    className="overflow-hidden"
                    layout
                  >
                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="px-4 pb-4 prose prose-sm dark:prose-invert"
                        >
                          {typeof song.content === "function"
                            ? song.content()
                            : song.content}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
