'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Pause } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'

interface SpotifyPlayerProps {
    trackUrl?: string
    albumArt?: string
    songName?: string
    artists?: string
    audioSrc?: string
}

export default function SpotifyPlayer({
    trackUrl = 'https://open.spotify.com/track/56Rdvp163gJ4Bn9v1UqMC2',
    albumArt = 'https://i.scdn.co/image/ab67616d0000b273cac307725b8259603f35b615',
    songName = 'Blush',
    artists = 'Prateek Kuhad',
    audioSrc = '/Blush.mp3'
}: SpotifyPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(302) // 5:02 = 302 seconds
    const [isExpanded, setIsExpanded] = useState(false)
    const audioRef = useRef<HTMLAudioElement>(null)
    const progressRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const audio = audioRef.current
        if (!audio) return

        const handleTimeUpdate = () => {
            setCurrentTime(audio.currentTime)
        }

        const handleLoadedMetadata = () => {
            if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
                setDuration(audio.duration)
            }
        }

        const handleDurationChange = () => {
            if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
                setDuration(audio.duration)
            }
        }

        const handleEnded = () => {
            setIsPlaying(false)
            setCurrentTime(0)
            setIsExpanded(false)
        }

        audio.addEventListener('timeupdate', handleTimeUpdate)
        audio.addEventListener('loadedmetadata', handleLoadedMetadata)
        audio.addEventListener('durationchange', handleDurationChange)
        audio.addEventListener('ended', handleEnded)

        // Try to get duration on mount
        if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
            setDuration(audio.duration)
        }

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate)
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
            audio.removeEventListener('durationchange', handleDurationChange)
            audio.removeEventListener('ended', handleEnded)
        }
    }, [])

    const togglePlay = async () => {
        const audio = audioRef.current
        if (!audio) return

        if (isPlaying) {
            audio.pause()
            setIsPlaying(false)
        } else {
            setIsExpanded(true)
            try {
                await audio.play()
                setIsPlaying(true)
                // Update duration after play starts
                if (audio.duration && !isNaN(audio.duration) && audio.duration > 0) {
                    setDuration(audio.duration)
                }
            } catch (error) {
                console.error('Error playing audio:', error)
            }
        }
    }

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current
        const progressBar = progressRef.current
        if (!audio || !progressBar) return

        const rect = progressBar.getBoundingClientRect()
        const clickX = e.clientX - rect.left
        const width = rect.width
        const percentage = clickX / width
        const newTime = percentage * duration

        audio.currentTime = newTime
        setCurrentTime(newTime)
    }

    const formatTime = (time: number) => {
        if (!time || isNaN(time) || time <= 0) return '0:00'
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

    return (
        <div className="w-full">
            <audio ref={audioRef} src={audioSrc} preload="auto" />

            {/* Main Card */}
            
            <div className="bg-neutral-50/80 dark:bg-neutral-900/80 backdrop-blur-md rounded-2xl border border-neutral-200/60 dark:border-neutral-800 p-4 transition-[background-color,border-color,box-shadow] duration-300 hover:shadow-sm">
                {/* Top Row - Album art, info, and play button */}
                <div className="flex items-center gap-3.5">
                    {/* Album Art */}
                    <div className="shrink-0 w-13 h-13 sm:w-15 sm:h-15 rounded-lg overflow-hidden shadow-sm relative group">
                        <Image
                            src={albumArt}
                            alt={songName}
                            width={60}
                            height={60}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            unoptimized
                        />
                        {isPlaying && (
                            <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                                <div className="flex gap-0.5 items-end h-3">
                                    <span className="w-0.5 bg-[#1DB954] rounded-full animate-[pulse_1s_infinite_alternate]" style={{ height: '60%' }} />
                                    <span className="w-0.5 bg-[#1DB954] rounded-full animate-[pulse_0.8s_infinite_alternate_0.2s]" style={{ height: '100%' }} />
                                    <span className="w-0.5 bg-[#1DB954] rounded-full animate-[pulse_1.2s_infinite_alternate_0.1s]" style={{ height: '40%' }} />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Song Info */}
                    <div className="flex-1 min-w-0">
                        {/* Spotify Label */}
                        <div className="flex items-center gap-1.5 mb-0.5">
                            <svg
                                viewBox="0 0 24 24"
                                className={`w-3.5 h-3.5 text-[#1DB954] ${isPlaying ? 'animate-pulse' : ''}`}
                                fill="currentColor"
                            >
                                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                            </svg>
                            <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                                {isPlaying ? 'Playing' : 'Last played'}
                            </span>
                        </div>

                        {/* Song Title - Clickable */}
                        <a
                            href={trackUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold text-neutral-800 dark:text-neutral-200 text-sm hover:text-[#1DB954] dark:hover:text-[#1DB954] transition-colors cursor-pointer block truncate"
                        >
                            {songName}
                        </a>

                        {/* Artists */}
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                            {artists}
                        </p>
                    </div>

                    {/* Play/Pause Button */}
                    <button
                        onClick={togglePlay}
                        className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-850 transition-all bg-white dark:bg-neutral-900 cursor-pointer active:scale-95 shadow-sm"
                        aria-label={isPlaying ? 'Pause' : 'Play'}
                    >
                        {isPlaying ? (
                            <Pause className="w-4 h-4 text-neutral-850 dark:text-neutral-100" fill="currentColor" />
                        ) : (
                            <Play className="w-4 h-4 text-neutral-850 dark:text-neutral-100 ml-0.5" fill="currentColor" />
                        )}
                    </button>
                </div>

                {/* Expanded Player - Progress Bar */}
                <AnimatePresence initial={false}>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                                height: 'auto',
                                opacity: 1,
                                transition: {
                                    height: {
                                        type: 'spring',
                                        stiffness: 120,
                                        damping: 20,
                                    },
                                    opacity: {
                                        duration: 0.22,
                                        ease: 'easeOut',
                                    },
                                },
                            }}
                            exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                    height: {
                                        type: 'spring',
                                        stiffness: 120,
                                        damping: 20,
                                    },
                                    opacity: {
                                        duration: 0.15,
                                        ease: 'easeIn',
                                    },
                                },
                            }}
                            className="overflow-hidden"
                        >
                            <div className="mt-3.5 pt-3.5 border-t border-neutral-150 dark:border-neutral-850">
                                {/* Progress Bar */}
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 w-8 text-right tabular-nums">
                                        {formatTime(currentTime)}
                                    </span>

                                    {/* Clickable Progress Bar */}
                                    <div
                                        ref={progressRef}
                                        onClick={handleProgressClick}
                                        className="flex-1 relative h-1 cursor-pointer group"
                                    >
                                        {/* Track background */}
                                        <div className="absolute inset-0 bg-neutral-200/80 dark:bg-neutral-800 rounded-full" />

                                        {/* Progress fill */}
                                        <div
                                            className="absolute left-0 top-0 bottom-0 bg-[#1DB954] rounded-full transition-all"
                                            style={{ width: `${progressPercent}%` }}
                                        />

                                        {/* Thumb */}
                                        <div
                                            className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-neutral-850 dark:bg-[#1DB954] rounded-full shadow transition-all scale-0 group-hover:scale-100"
                                            style={{
                                                left: `calc(${Math.min(Math.max(progressPercent, 0), 100)}% - 5px)`,
                                                boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
                                            }}
                                        />
                                    </div>

                                    <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 w-8 tabular-nums">
                                        {formatTime(duration)}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}