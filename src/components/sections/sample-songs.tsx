"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
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
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

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

        <div className="max-w-2xl mx-auto space-y-3">
          {sampleSongs.map((song) => {
            const isActive = active?.title === song.title;
            
            return (
              <motion.div
                key={song.title}
                layout
                onClick={() => setActive(isActive ? null : song)}
                className={cn(
                  "flex items-center px-4 py-3 rounded-xl cursor-pointer",
                  "bg-white",
                  "border border-gray-100",
                  "group relative",
                  "hover:border-rose-200",
                  "hover:shadow-md hover:scale-[1.02]",
                  "transition-all duration-300 ease-out"
                )}
              >
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-rose-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative w-14 h-14 shrink-0 mr-4 z-10">
                  <Image
                    src={song.src}
                    alt={song.title}
                    width={56}
                    height={56}
                    className="object-cover rounded-lg shadow-sm group-hover:scale-110 transition-transform duration-300"
                    priority={true}
                  />
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-rose-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                
                <div className="flex-1 min-w-0 z-10">
                  <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-rose-600 transition-colors duration-300">
                    {song.title}
                  </h3>
                  <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors duration-300">
                    {song.description}
                  </p>
                </div>

                <div className="shrink-0 ml-4 z-10">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "h-9 px-4 overflow-hidden relative",
                      "bg-gray-50",
                      "group-hover:bg-rose-500",
                      "text-gray-600",
                      "group-hover:text-white",
                      "transition-all duration-300"
                    )}
                  >
                    <span className="relative z-10 flex items-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="currentColor" 
                        className="w-5 h-5 group-hover:scale-110 transition-transform duration-300"
                      >
                        <path d="M8 5.14v14l11-7-11-7z" />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setActive(null)}
            >
              <motion.div
                className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl overflow-hidden"
                onClick={e => e.stopPropagation()}
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={active.src}
                    alt={active.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                  <button
                    onClick={() => setActive(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/30 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                
                <div className="p-6">
                  <h2 className="text-2xl font-bold mb-2">{active.title}</h2>
                  <p className="text-gray-600 mb-6">{active.description}</p>
                  
                  <AudioPlayer audioUrl={active.audioUrl} />
                  
                  <div className="mt-6 prose prose-sm">
                    {typeof active.content === "function" ? active.content() : active.content}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
