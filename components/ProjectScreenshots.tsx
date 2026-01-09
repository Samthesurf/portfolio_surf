"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useState } from "react";

export type ScreenshotItem = {
    src: StaticImageData;
    alt: string;
    imageClassName?: string;
};

export type ScreenshotGroup = {
    id: string;
    label: string;
    items: ScreenshotItem[];
    previewAspectClass: string;
    thumbAspectClass: string;
    previewMaxWidthClass?: string;
};

export default function ProjectScreenshots({
    title,
    groups,
}: {
    title: string;
    groups: ScreenshotGroup[];
}) {
    const safeGroups = useMemo(() => groups.filter((g) => g.items.length > 0), [groups]);
    const defaultGroupId = safeGroups[0]?.id ?? "";

    const [activeGroupId, setActiveGroupId] = useState(defaultGroupId);
    const activeGroup = useMemo(
        () => safeGroups.find((g) => g.id === activeGroupId) ?? safeGroups[0],
        [activeGroupId, safeGroups]
    );

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        setActiveGroupId(defaultGroupId);
    }, [defaultGroupId]);

    useEffect(() => {
        setActiveIndex(0);
    }, [activeGroupId]);

    const items = activeGroup?.items ?? [];
    const clampedIndex = Math.min(activeIndex, Math.max(items.length - 1, 0));
    const activeItem = items[clampedIndex];

    const [lightbox, setLightbox] = useState<null | { index: number }>(null);

    useEffect(() => {
        if (!lightbox) return;

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setLightbox(null);
                return;
            }

            if (items.length < 2) return;

            if (e.key === "ArrowLeft") {
                setLightbox((prev) => {
                    if (!prev) return prev;
                    const nextIndex = (prev.index - 1 + items.length) % items.length;
                    return { index: nextIndex };
                });
            }

            if (e.key === "ArrowRight") {
                setLightbox((prev) => {
                    if (!prev) return prev;
                    const nextIndex = (prev.index + 1) % items.length;
                    return { index: nextIndex };
                });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.body.style.overflow = previousOverflow;
        };
    }, [items.length, lightbox]);

    if (!activeGroup || items.length === 0 || !activeItem) return null;

    const lightboxIndex = lightbox ? Math.min(lightbox.index, items.length - 1) : 0;
    const lightboxItem = lightbox ? items[lightboxIndex] : null;

    return (
        <div className="space-y-4">
            {/* Tabs */}
            {safeGroups.length > 1 && (
                <div className="flex flex-wrap gap-2">
                    {safeGroups.map((g) => (
                        <button
                            key={g.id}
                            type="button"
                            onClick={() => setActiveGroupId(g.id)}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${g.id === activeGroupId
                                ? "bg-slate-900 text-white dark:bg-white dark:text-black border-transparent"
                                : "bg-white/60 dark:bg-white/5 text-slate-700 dark:text-gray-300 border-slate-200/70 dark:border-white/10 hover:border-blue-500/40"
                                }`}
                        >
                            {g.label}
                        </button>
                    ))}
                </div>
            )}

            {/* Preview */}
            <button
                type="button"
                onClick={() => setLightbox({ index: clampedIndex })}
                className={`group w-full ${activeGroup.previewMaxWidthClass ?? "max-w-5xl"} mx-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70 rounded-3xl`}
                aria-label={`Open ${title} screenshots`}
            >
                <div
                    className={`relative w-full ${activeGroup.previewAspectClass} rounded-3xl overflow-hidden bg-slate-100 dark:bg-white/5 border border-slate-200/70 dark:border-white/10 shadow-lg`}
                >
                    <Image
                        src={activeItem.src}
                        alt={activeItem.alt}
                        fill
                        className={activeItem.imageClassName ?? "object-contain"}
                        priority
                    />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1 rounded-full bg-black/60 text-white text-xs font-semibold border border-white/10 backdrop-blur-md">
                        Click to zoom
                    </div>
                </div>
            </button>

            {/* Thumbnails */}
            {items.length > 1 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {items.map((item, idx) => (
                        <button
                            key={`${activeGroup.id}-${idx}`}
                            type="button"
                            onClick={() => setActiveIndex(idx)}
                            className={`relative ${activeGroup.thumbAspectClass} rounded-2xl overflow-hidden border transition-all ${idx === clampedIndex
                                ? "border-blue-500/60 ring-2 ring-blue-500/30"
                                : "border-slate-200/70 dark:border-white/10 hover:border-blue-500/40"
                                }`}
                            aria-label={`Show screenshot ${idx + 1}`}
                        >
                            <Image
                                src={item.src}
                                alt={item.alt}
                                fill
                                className={item.imageClassName ?? "object-cover"}
                            />
                        </button>
                    ))}
                </div>
            )}

            {/* Lightbox */}
            {lightbox && lightboxItem && (
                <div
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
                    role="dialog"
                    aria-modal="true"
                    aria-label={`${title} screenshots`}
                    onClick={() => setLightbox(null)}
                >
                    <div
                        className="relative w-full max-w-6xl h-[85vh] rounded-2xl overflow-hidden bg-black/30 border border-white/10 shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={lightboxItem.src}
                            alt={lightboxItem.alt}
                            fill
                            className="object-contain"
                            priority
                        />

                        {/* Top bar */}
                        <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 bg-gradient-to-b from-black/70 to-transparent">
                            <div className="text-xs md:text-sm text-white/90">
                                <span className="font-semibold">{title}</span>
                                <span className="text-white/60"> • </span>
                                <span className="text-white/70">{activeGroup.label}</span>
                                <span className="text-white/60"> • </span>
                                <span className="text-white/70">
                                    {lightboxIndex + 1} / {items.length}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() => setLightbox(null)}
                                className="px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-sm font-semibold transition-colors"
                                aria-label="Close screenshots"
                            >
                                Close
                            </button>
                        </div>

                        {/* Navigation */}
                        {items.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setLightbox((prev) => {
                                            if (!prev) return prev;
                                            const nextIndex = (prev.index - 1 + items.length) % items.length;
                                            return { index: nextIndex };
                                        })
                                    }
                                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                                    aria-label="Previous screenshot"
                                >
                                    <span className="text-xl leading-none">‹</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() =>
                                        setLightbox((prev) => {
                                            if (!prev) return prev;
                                            const nextIndex = (prev.index + 1) % items.length;
                                            return { index: nextIndex };
                                        })
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                                    aria-label="Next screenshot"
                                >
                                    <span className="text-xl leading-none">›</span>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
