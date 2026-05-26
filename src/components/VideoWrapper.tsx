"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

interface VideoWrapperProps {
    videoUrl?: string | null;
    title?: string;
    className?: string;
    showTitle?: boolean;
    showBorder?: boolean;
}

const youtubeRegexes = [
    /youtu\.be\/([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/watch\?v=([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/i,
    /youtube\.com\/shorts\/([A-Za-z0-9_-]{6,})/i,
];

const getYouTubeId = (url: string) => {
    for (const regex of youtubeRegexes) {
        const match = url.match(regex);
        if (match?.[1]) return match[1];
    }

    return null;
};

const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const totalSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const PlayIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M8 5.6v12.8c0 .8.9 1.3 1.6.9l10.4-6.4c.7-.4.7-1.4 0-1.8L9.6 4.7A1.1 1.1 0 0 0 8 5.6Z" />
    </svg>
);

const PauseIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M7 5.5A1.5 1.5 0 0 1 8.5 4h1A1.5 1.5 0 0 1 11 5.5v13A1.5 1.5 0 0 1 9.5 20h-1A1.5 1.5 0 0 1 7 18.5v-13Zm6 0A1.5 1.5 0 0 1 14.5 4h1A1.5 1.5 0 0 1 17 5.5v13A1.5 1.5 0 0 1 15.5 20h-1A1.5 1.5 0 0 1 13 18.5v-13Z" />
    </svg>
);

const VolumeIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
            d="M11 5 7.5 8.5H4v7h3.5L11 19V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M15 9a4 4 0 0 1 0 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
        />
        <path
            d="M17.5 6.5a8 8 0 0 1 0 11"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity=".7"
        />
    </svg>
);

const MuteIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
            d="M11 5 7.5 8.5H4v7h3.5L11 19V5Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path d="m16 9 4 4m0-4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const FullscreenIcon = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <path
            d="M8 4H4v4m12-4h4v4M8 20H4v-4m12 4h4v-4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const VideoWrapper = ({
    videoUrl,
    title = "Video",
    className = "",
    showTitle = true,
    showBorder = true,
}: VideoWrapperProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);
    const youtubeId = videoUrl ? getYouTubeId(videoUrl) : null;

    useEffect(() => {
        const video = videoRef.current;
        if (!video || youtubeId) return;

        const handleTimeUpdate = () => setCurrentTime(video.currentTime);
        const handleDurationChange = () => setDuration(video.duration || 0);
        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);
        const handleVolumeChange = () => setVolume(video.volume);

        video.addEventListener("timeupdate", handleTimeUpdate);
        video.addEventListener("loadedmetadata", handleDurationChange);
        video.addEventListener("durationchange", handleDurationChange);
        video.addEventListener("play", handlePlay);
        video.addEventListener("pause", handlePause);
        video.addEventListener("volumechange", handleVolumeChange);

        handleDurationChange();
        handleVolumeChange();

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate);
            video.removeEventListener("loadedmetadata", handleDurationChange);
            video.removeEventListener("durationchange", handleDurationChange);
            video.removeEventListener("play", handlePlay);
            video.removeEventListener("pause", handlePause);
            video.removeEventListener("volumechange", handleVolumeChange);
        };
    }, [youtubeId, videoUrl]);

    const progress = useMemo(() => {
        if (!duration) return 0;
        return Math.min(100, Math.max(0, (currentTime / duration) * 100));
    }, [currentTime, duration]);

    const togglePlay = async () => {
        const video = videoRef.current;
        if (!video || youtubeId) return;

        if (video.paused) {
            await video.play();
        } else {
            video.pause();
        }
    };

    const handleVideoClick = () => {
        void togglePlay();
    };

    const seek = (value: number) => {
        const video = videoRef.current;
        if (!video || youtubeId || !duration) return;

        const nextTime = (value / 100) * duration;
        video.currentTime = nextTime;
        setCurrentTime(nextTime);
    };

    const changeVolume = (value: number) => {
        const video = videoRef.current;
        if (!video || youtubeId) return;

        const nextVolume = Math.max(0, Math.min(1, value));
        video.volume = nextVolume;
        video.muted = nextVolume === 0;
        setVolume(nextVolume);
    };

    const toggleMute = () => {
        const video = videoRef.current;
        if (!video || youtubeId) return;

        video.muted = !video.muted;
        setVolume(video.muted ? 0 : video.volume || 1);
    };

    const enterFullscreen = async () => {
        const video = videoRef.current;
        if (!video || youtubeId) return;

        if (video.requestFullscreen) {
            await video.requestFullscreen();
        }
    };

    if (!videoUrl) return null;

    return (
        <div className={`${showBorder ? "overflow-hidden rounded-md border border-base-300 bg-base-100" : ""} ${className}`}>
            {showTitle && (
                <div className="border-b border-base-300 px-4 py-2 text-sm font-medium text-base-content/70">
                    {title}
                </div>
            )}

            {youtubeId ? (
                <div className="aspect-video w-full">
                    <iframe
                        className="h-full w-full"
                        src={`https://www.youtube.com/embed/${youtubeId}`}
                        title={title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
            ) : (
                <div className="overflow-hidden bg-black">
                    <div
                        className="group relative aspect-video w-full bg-black"
                        role="button"
                        tabIndex={0}
                        onClick={handleVideoClick}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleVideoClick();
                            }
                        }}
                    >
                        <video
                            ref={videoRef}
                            className="h-full w-full bg-black"
                            playsInline
                            preload="metadata"
                            controls={false}
                            controlsList="nodownload noplaybackrate"
                            disablePictureInPicture
                            onContextMenu={(event) => event.preventDefault()}
                        >
                            <source src={videoUrl} />
                            Your browser does not support the video tag.
                        </video>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/5 opacity-100 transition-opacity group-hover:from-black/40" />

                        {!isPlaying && (
                            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
                                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/15 text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
                                    <PlayIcon className="h-7 w-7 -translate-x-[1px]" />
                                </span>
                            </div>
                        )}

                        <div
                            className="absolute inset-x-3 bottom-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                            onClick={(event) => event.stopPropagation()}
                        >
                            <div className="rounded-2xl border border-white/10 bg-white/8 p-3 backdrop-blur-xl shadow-[0_16px_35px_rgba(0,0,0,0.28)]">
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-center gap-3">
                                        <span className="text-[11px] font-semibold tracking-wide text-white/75">
                                            {formatTime(currentTime)}
                                        </span>

                                        <div className="relative h-[6px] flex-1 overflow-hidden rounded-full bg-white/15">
                                            <div
                                                className="absolute inset-y-0 left-0 rounded-full bg-white/90"
                                                style={{ width: `${progress}%` }}
                                            />
                                            <input
                                                type="range"
                                                min="0"
                                                max="100"
                                                value={progress}
                                                onChange={(event) => seek(Number(event.target.value))}
                                                onClick={(event) => event.stopPropagation()}
                                                className="absolute inset-0 h-full w-full cursor-pointer appearance-none bg-transparent"
                                                aria-label="Seek video"
                                            />
                                        </div>

                                        <span className="text-[11px] font-semibold tracking-wide text-white/75">
                                            {formatTime(duration)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                void togglePlay();
                                            }}
                                            className="btn btn-sm btn-circle shrink-0 border border-white/10 bg-white/10 text-white shadow-[0_8px_24px_rgba(0,0,0,0.25)] hover:bg-white/15"
                                            aria-label={isPlaying ? "Pause video" : "Play video"}
                                        >
                                            {isPlaying ? (
                                                <PauseIcon className="h-5 w-5" />
                                            ) : (
                                                <PlayIcon className="h-5 w-5 translate-x-0.5" />
                                            )}
                                        </button>

                                        <div className="flex flex-1 items-center gap-2">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        toggleMute();
                                                    }}
                                                    className="peer btn btn-xs btn-ghost btn-circle text-white/85 hover:bg-white/10 hover:text-white"
                                                    aria-label={volume === 0 ? "Unmute video" : "Mute video"}
                                                >
                                                    {volume === 0 ? (
                                                        <MuteIcon className="h-4 w-4" />
                                                    ) : (
                                                        <VolumeIcon className="h-4 w-4" />
                                                    )}
                                                </button>

                                                <div className="flex w-0 items-center overflow-hidden opacity-0 transition-all duration-200 peer-hover:w-24 peer-hover:opacity-100">
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.01"
                                                        value={volume}
                                                        onChange={(event) => changeVolume(Number(event.target.value))}
                                                        onClick={(event) => event.stopPropagation()}
                                                        className="range range-neutral range-xs h-[6px] w-full"
                                                        aria-label="Video volume"
                                                    />
                                                </div>
                                            </div>

                                            <div className="ml-auto flex items-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        void enterFullscreen();
                                                    }}
                                                    className="btn btn-xs btn-ghost btn-circle text-white/85 hover:bg-white/10 hover:text-white"
                                                    aria-label="Fullscreen video"
                                                >
                                                    <FullscreenIcon className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default VideoWrapper;
