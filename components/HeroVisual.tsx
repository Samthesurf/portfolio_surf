"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "./ThemeContext";
import birdPortraitSource from "../assets/hero/sam-surf-bird-source.webp";

const portraitSourceUrl =
  typeof birdPortraitSource === "string" ? birdPortraitSource : birdPortraitSource.src;

const CONFIG = {
  SOURCE_ALPHA_THRESHOLD: 38,
  DETAIL_CONTRAST_THRESHOLD: 15,
  BASE_SPACING: 4.4,
  DETAIL_SPACING: 2.45,
  MAX_PARTICLES: 18000,
  BIRD_SIZE: 1.68,
  PORTRAIT_WIDTH_RATIO: 0.86,
  PORTRAIT_HEIGHT_RATIO: 0.86,
  MOUSE_RADIUS: 162,
  REPULSION: 9.8,
  POINTER_IMPULSE: 8.7,
  POINTER_DISPLACEMENT: 1.6,
  RETURN_SPEED: 0.078,
  FRICTION: 0.74,
  WANDER: 0.052,
  FLAP_SPEED: 0.18,
  FLAP_AMOUNT: 0.32,
  INTRO_FORM_MS: 1250,
  INTRO_SPAWN_MIN: 10,
  INTRO_SPAWN_SPREAD: 118,
  INTRO_WOBBLE: 12,
  INTRO_GHOST_BOOST: 0.05,
  DRAW_SHADOWS: false,
  GHOST_OPACITY: 0.014,
} as const;

type SourceBounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

type PortraitCanvas = SourceBounds & {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
};

type PointerState = {
  x: number;
  y: number;
  radius: number;
};

type ParticlePoint = {
  x: number;
  y: number;
  color: string;
  shadowColor: string;
  opacity: number;
  size: number;
  homeAngle: number;
};

export default function HeroVisual() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const canvasElement = canvas;
    const containerElement = container;
    const drawingContext = ctx;

    let width = 1;
    let height = 1;
    let pixelRatio = 1;
    let particles: Bird[] = [];
    let portrait: PortraitCanvas | null = null;
    let sourceBounds: SourceBounds | null = null;
    let animationStarted = false;
    let introStartTime = 0;
    let frameId = 0;
    let isVisible = true;
    let isCancelled = false;
    let imageReady = false;
    let imageReadyFallback = 0;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer: PointerState = {
      x: -10000,
      y: -10000,
      radius: CONFIG.MOUSE_RADIUS,
    };
    const sourceImage = new window.Image();

    // eslint-disable-next-line react-hooks/unsupported-syntax -- The canvas particle engine is intentionally imperative and scoped to this effect lifecycle.
    class Bird {
      startX: number;
      startY: number;
      x: number;
      y: number;
      homeX: number;
      homeY: number;
      vx: number;
      vy: number;
      color: string;
      shadowColor: string;
      opacity: number;
      size: number;
      angle: number;
      homeAngle: number;
      wanderOffset: number;
      wanderStrength: number;
      flapPhase: number;
      flapSpeed: number;
      introDelay: number;
      introDone: boolean;

      constructor(point: ParticlePoint) {
        const spawn = getIntroSpawnPoint(point.x, point.y);

        this.startX = spawn.x;
        this.startY = spawn.y;
        this.x = spawn.x;
        this.y = spawn.y;
        this.homeX = point.x;
        this.homeY = point.y;
        this.vx = 0;
        this.vy = 0;
        this.color = point.color;
        this.shadowColor = point.shadowColor;
        this.opacity = point.opacity;
        this.size = point.size;
        this.angle = point.homeAngle + (Math.random() - 0.5) * 1.2;
        this.homeAngle = point.homeAngle;
        this.wanderOffset = Math.random() * Math.PI * 2;
        this.wanderStrength = CONFIG.WANDER * (0.45 + Math.random() * 0.8);
        this.flapPhase = Math.random() * Math.PI * 2;
        this.flapSpeed = CONFIG.FLAP_SPEED * (0.72 + Math.random() * 0.56);
        this.introDelay = Math.random() * 90;
        this.introDone = false;
      }

      completeIntro() {
        this.x = this.homeX;
        this.y = this.homeY;
        this.vx = 0;
        this.vy = 0;
        this.introDone = true;
      }

      update(now: number) {
        if (!this.introDone) {
          this.updateIntro(now);
          return;
        }

        const dx = this.homeX - this.x;
        const dy = this.homeY - this.y;
        let forceX = dx * CONFIG.RETURN_SPEED;
        let forceY = dy * CONFIG.RETURN_SPEED;

        const mdx = this.x - pointer.x;
        const mdy = this.y - pointer.y;
        const pointerDistance = Math.hypot(mdx, mdy);

        if (pointerDistance < pointer.radius) {
          const angle =
            pointerDistance > 0.001
              ? Math.atan2(mdy, mdx)
              : Math.random() * Math.PI * 2;
          const normalX = Math.cos(angle);
          const normalY = Math.sin(angle);
          const force = (pointer.radius - pointerDistance) / pointer.radius;
          const snap = Math.pow(force, 1.35);

          forceX += normalX * snap * CONFIG.REPULSION;
          forceY += normalY * snap * CONFIG.REPULSION;
          this.vx += normalX * snap * CONFIG.POINTER_IMPULSE;
          this.vy += normalY * snap * CONFIG.POINTER_IMPULSE;
          this.x += normalX * snap * CONFIG.POINTER_DISPLACEMENT;
          this.y += normalY * snap * CONFIG.POINTER_DISPLACEMENT;
        }

        const homeDistance = Math.hypot(dx, dy);
        const idleStrength = clamp(1 - homeDistance / 90, 0, 1);
        this.wanderOffset += 0.052;
        forceX +=
          Math.sin(this.wanderOffset * 1.35 + this.homeY * 0.018) *
          this.wanderStrength *
          (0.35 + idleStrength);
        forceY +=
          Math.cos(this.wanderOffset * 1.08 + this.homeX * 0.016) *
          this.wanderStrength *
          (0.28 + idleStrength * 0.72);

        this.vx = (this.vx + forceX) * CONFIG.FRICTION;
        this.vy = (this.vy + forceY) * CONFIG.FRICTION;
        this.x += this.vx;
        this.y += this.vy;

        const speed = Math.hypot(this.vx, this.vy);
        this.flapPhase += this.flapSpeed + Math.min(speed, 12) * 0.018;
        const movementAngle = Math.atan2(this.vy, this.vx) + Math.PI / 2;
        const targetAngle =
          speed > 0.32
            ? movementAngle
            : this.homeAngle + Math.sin(this.wanderOffset * 1.2) * 0.13;
        this.angle = lerpAngle(this.angle, targetAngle, speed > 0.32 ? 0.22 : 0.082);
      }

      updateIntro(now: number) {
        const elapsed = now - introStartTime - this.introDelay;
        const t = clamp(elapsed / CONFIG.INTRO_FORM_MS, 0, 1);
        const eased = easeOutQuint(t);
        const remaining = 1 - eased;
        const dx = this.homeX - this.startX;
        const dy = this.homeY - this.startY;
        const distance = Math.hypot(dx, dy) || 1;
        const normalX = -dy / distance;
        const normalY = dx / distance;
        const wobble =
          Math.sin(this.wanderOffset + t * Math.PI * 4) *
          CONFIG.INTRO_WOBBLE *
          remaining *
          remaining;

        this.flapPhase += this.flapSpeed * 1.45;
        this.x = lerp(this.startX, this.homeX, eased) + normalX * wobble;
        this.y = lerp(this.startY, this.homeY, eased) + normalY * wobble;
        this.angle = lerpAngle(
          this.angle,
          this.homeAngle + Math.sin(this.flapPhase) * 0.08 * remaining,
          0.28 + eased * 0.42,
        );

        if (t >= 1) this.completeIntro();
      }

      draw() {
        const size = this.size;
        const flap = Math.sin(this.flapPhase) * CONFIG.FLAP_AMOUNT;

        drawingContext.save();
        drawingContext.translate(this.x, this.y);
        drawingContext.rotate(this.angle);
        drawingContext.globalAlpha = this.opacity;

        if (CONFIG.DRAW_SHADOWS) {
          drawingContext.fillStyle = this.shadowColor;
          drawBirdShape(size * 1.06, 0.28, 0.42, flap);
        }

        drawingContext.fillStyle = this.color;
        drawBirdShape(size, 0, 0, flap);
        drawingContext.restore();
      }
    }

    function resize() {
      const rect = containerElement.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, 1.75);

      canvasElement.width = Math.round(width * pixelRatio);
      canvasElement.height = Math.round(height * pixelRatio);
      canvasElement.style.width = `${width}px`;
      canvasElement.style.height = `${height}px`;
      drawingContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function resetPointer() {
      pointer.x = -10000;
      pointer.y = -10000;
    }

    function updatePointer(event: PointerEvent) {
      const rect = canvasElement.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
    }

    function drawBirdShape(size: number, xOffset: number, yOffset: number, flap: number) {
      const wingReach = 1.38 + Math.abs(flap) * 0.42;
      const wingDrop = 0.78 - flap * 0.38;
      const shoulderLift = 0.48 + flap * 0.16;

      drawingContext.beginPath();
      drawingContext.moveTo(xOffset, yOffset - size * 0.72);
      drawingContext.quadraticCurveTo(
        xOffset + size * 0.46,
        yOffset - size * shoulderLift,
        xOffset + size * wingReach,
        yOffset + size * wingDrop,
      );
      drawingContext.lineTo(xOffset + size * 0.22, yOffset + size * 0.32);
      drawingContext.quadraticCurveTo(
        xOffset,
        yOffset + size * 0.2,
        xOffset - size * 0.22,
        yOffset + size * 0.32,
      );
      drawingContext.lineTo(xOffset - size * wingReach, yOffset + size * wingDrop);
      drawingContext.quadraticCurveTo(
        xOffset - size * 0.46,
        yOffset - size * shoulderLift,
        xOffset,
        yOffset - size * 0.72,
      );
      drawingContext.closePath();
      drawingContext.fill();
    }

    function getIntroSpawnPoint(homeX: number, homeY: number) {
      const angle = Math.random() * Math.PI * 2;
      const distance =
        CONFIG.INTRO_SPAWN_MIN +
        Math.pow(Math.random(), 0.72) * CONFIG.INTRO_SPAWN_SPREAD;

      return {
        x: clamp(homeX + Math.cos(angle) * distance, -60, width + 60),
        y: clamp(homeY + Math.sin(angle) * distance, -60, height + 60),
      };
    }

    function initParticles() {
      if (!sourceImage.complete || sourceImage.naturalWidth === 0) return;

      particles = [];
      sourceBounds = sourceBounds || findSourceBounds(sourceImage);
      const nextPortrait = buildPortraitCanvas(sourceImage, sourceBounds);
      if (!nextPortrait) return;

      portrait = nextPortrait;
      const points = extractPortraitPoints(portrait.canvas, portrait.ctx);
      const limitedPoints = points.slice(0, CONFIG.MAX_PARTICLES);
      shuffle(limitedPoints);
      particles = limitedPoints.map((point) => new Bird(point));
      introStartTime = performance.now();

      if (prefersReducedMotion) {
        particles.forEach((particle) => particle.completeIntro());
        drawFrame(performance.now(), false);
      }
    }

    function findSourceBounds(img: HTMLImageElement): SourceBounds {
      const scanCanvas = document.createElement("canvas");
      const scanCtx = scanCanvas.getContext("2d", { willReadFrequently: true });
      scanCanvas.width = img.naturalWidth;
      scanCanvas.height = img.naturalHeight;

      if (!scanCtx) {
        return { x: 0, y: 0, width: img.naturalWidth, height: img.naturalHeight };
      }

      scanCtx.drawImage(img, 0, 0);
      const pixels = scanCtx.getImageData(0, 0, scanCanvas.width, scanCanvas.height).data;
      let minX = scanCanvas.width;
      let minY = scanCanvas.height;
      let maxX = 0;
      let maxY = 0;

      for (let y = 0; y < scanCanvas.height; y += 2) {
        for (let x = 0; x < scanCanvas.width; x += 2) {
          const alpha = pixels[(y * scanCanvas.width + x) * 4 + 3];
          if (alpha < CONFIG.SOURCE_ALPHA_THRESHOLD) continue;
          minX = Math.min(minX, x);
          minY = Math.min(minY, y);
          maxX = Math.max(maxX, x);
          maxY = Math.max(maxY, y);
        }
      }

      if (minX > maxX || minY > maxY) {
        return { x: 0, y: 0, width: img.naturalWidth, height: img.naturalHeight };
      }

      const pad = 18;
      minX = Math.max(0, minX - pad);
      minY = Math.max(0, minY - pad);
      maxX = Math.min(scanCanvas.width, maxX + pad);
      maxY = Math.min(scanCanvas.height, maxY + pad);

      return {
        x: minX,
        y: minY,
        width: maxX - minX,
        height: maxY - minY,
      };
    }

    function buildPortraitCanvas(
      img: HTMLImageElement,
      bounds: SourceBounds,
    ): PortraitCanvas | null {
      const targetMaxWidth = Math.max(280, width * CONFIG.PORTRAIT_WIDTH_RATIO);
      const targetMaxHeight = Math.max(360, height * CONFIG.PORTRAIT_HEIGHT_RATIO);
      const scale = Math.min(targetMaxWidth / bounds.width, targetMaxHeight / bounds.height);
      const targetWidth = Math.max(1, Math.round(bounds.width * scale));
      const targetHeight = Math.max(1, Math.round(bounds.height * scale));
      const targetCanvas = document.createElement("canvas");
      const targetCtx = targetCanvas.getContext("2d", { willReadFrequently: true });

      if (!targetCtx) return null;

      targetCanvas.width = targetWidth;
      targetCanvas.height = targetHeight;
      targetCtx.imageSmoothingEnabled = true;
      targetCtx.imageSmoothingQuality = "high";
      targetCtx.drawImage(
        img,
        bounds.x,
        bounds.y,
        bounds.width,
        bounds.height,
        0,
        0,
        targetWidth,
        targetHeight,
      );

      return {
        canvas: targetCanvas,
        ctx: targetCtx,
        x: (width - targetWidth) / 2,
        y: (height - targetHeight) / 2 + height * 0.012,
        width: targetWidth,
        height: targetHeight,
      };
    }

    function extractPortraitPoints(targetCanvas: HTMLCanvasElement, targetCtx: CanvasRenderingContext2D) {
      const pixels = targetCtx.getImageData(0, 0, targetCanvas.width, targetCanvas.height).data;
      const basePoints: ParticlePoint[] = [];
      const detailPoints: ParticlePoint[] = [];
      const baseSpacing = spacingForViewport(CONFIG.BASE_SPACING);
      const detailSpacing = spacingForViewport(CONFIG.DETAIL_SPACING);

      samplePass(basePoints, pixels, targetCanvas.width, targetCanvas.height, baseSpacing, false);
      samplePass(detailPoints, pixels, targetCanvas.width, targetCanvas.height, detailSpacing, true);
      shuffle(detailPoints);
      shuffle(basePoints);

      return detailPoints.concat(basePoints);
    }

    function samplePass(
      points: ParticlePoint[],
      pixels: Uint8ClampedArray,
      canvasWidth: number,
      canvasHeight: number,
      spacing: number,
      detailsOnly: boolean,
    ) {
      const jitter = spacing * (detailsOnly ? 0.42 : 0.34);
      const start = Math.max(1, Math.floor(spacing / 2));

      for (let y = start; y < canvasHeight - 1; y += spacing) {
        for (let x = start; x < canvasWidth - 1; x += spacing) {
          const index = (Math.floor(y) * canvasWidth + Math.floor(x)) * 4;
          const alpha = pixels[index + 3];
          if (alpha < CONFIG.SOURCE_ALPHA_THRESHOLD) continue;

          const contrast = localContrast(
            pixels,
            canvasWidth,
            canvasHeight,
            Math.floor(x),
            Math.floor(y),
          );
          const isDetail = contrast > CONFIG.DETAIL_CONTRAST_THRESHOLD;
          if (detailsOnly && !isDetail) continue;

          const nx = x / canvasWidth;
          const ny = y / canvasHeight;
          const portraitFocus = nx > 0.28 && nx < 0.84 && ny > 0.02 && ny < 0.48;
          if (
            detailsOnly &&
            !portraitFocus &&
            contrast < CONFIG.DETAIL_CONTRAST_THRESHOLD * 1.7
          ) {
            continue;
          }

          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          const luminance = getLuminance(r, g, b);
          const color = enhanceColor(r, g, b, alpha, contrast);
          const opacityBoost = isDarkMode() ? 0.08 : 0.18;
          const pointJitter = detailsOnly ? jitter * 0.72 : jitter;
          const edgeAngle = contourAngle(
            pixels,
            canvasWidth,
            canvasHeight,
            Math.floor(x),
            Math.floor(y),
          );

          if (!portrait) continue;

          points.push({
            x: portrait.x + x + (Math.random() - 0.5) * pointJitter,
            y: portrait.y + y + (Math.random() - 0.5) * pointJitter,
            color: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
            shadowColor: `rgba(${Math.max(0, color.r - 35)}, ${Math.max(
              0,
              color.g - 35,
            )}, ${Math.max(0, color.b - 35)}, 0.1)`,
            opacity: clamp(
              0.7 + alpha / 255 * 0.22 + Math.min(contrast, 70) / 650 + opacityBoost,
              0.68,
              0.99,
            ),
            size: CONFIG.BIRD_SIZE * sizeForPixel(luminance, alpha, contrast, detailsOnly),
            homeAngle: edgeAngle + (Math.random() - 0.5) * 0.55,
          });
        }
      }
    }

    function spacingForViewport(base: number) {
      const smallSide = Math.min(width, height);
      if (smallSide < 520) return base * 1.35;
      if (smallSide < 760) return base * 1.12;
      return base;
    }

    function localContrast(
      pixels: Uint8ClampedArray,
      canvasWidth: number,
      canvasHeight: number,
      x: number,
      y: number,
    ) {
      const center = luminanceAt(pixels, canvasWidth, x, y);
      const radius = 3;
      const left = luminanceAt(pixels, canvasWidth, Math.max(0, x - radius), y);
      const right = luminanceAt(
        pixels,
        canvasWidth,
        Math.min(canvasWidth - 1, x + radius),
        y,
      );
      const top = luminanceAt(pixels, canvasWidth, x, Math.max(0, y - radius));
      const bottom = luminanceAt(
        pixels,
        canvasWidth,
        x,
        Math.min(canvasHeight - 1, y + radius),
      );
      return Math.max(
        Math.abs(center - left),
        Math.abs(center - right),
        Math.abs(center - top),
        Math.abs(center - bottom),
      );
    }

    function contourAngle(
      pixels: Uint8ClampedArray,
      canvasWidth: number,
      canvasHeight: number,
      x: number,
      y: number,
    ) {
      const radius = 4;
      const left = luminanceAt(pixels, canvasWidth, Math.max(0, x - radius), y);
      const right = luminanceAt(
        pixels,
        canvasWidth,
        Math.min(canvasWidth - 1, x + radius),
        y,
      );
      const top = luminanceAt(pixels, canvasWidth, x, Math.max(0, y - radius));
      const bottom = luminanceAt(
        pixels,
        canvasWidth,
        x,
        Math.min(canvasHeight - 1, y + radius),
      );
      const gradient = Math.atan2(bottom - top, right - left);
      return gradient + Math.PI / 2;
    }

    function luminanceAt(pixels: Uint8ClampedArray, canvasWidth: number, x: number, y: number) {
      const index = (y * canvasWidth + x) * 4;
      return getLuminance(pixels[index], pixels[index + 1], pixels[index + 2]);
    }

    function getLuminance(r: number, g: number, b: number) {
      return r * 0.2126 + g * 0.7152 + b * 0.0722;
    }

    function enhanceColor(r: number, g: number, b: number, alpha: number, contrast: number) {
      const alphaBoost = alpha / 255;
      const contrastBoost = 1.1 + Math.min(contrast, 70) / 260;
      const saturation = 1.04 + Math.min(contrast, 60) / 360;
      const color = saturate(r, g, b, saturation);

      color.r = clamp(Math.round((color.r - 122) * contrastBoost + 122), 0, 255);
      color.g = clamp(Math.round((color.g - 122) * contrastBoost + 122), 0, 255);
      color.b = clamp(Math.round((color.b - 122) * contrastBoost + 122), 0, 255);

      if (alphaBoost < 0.62) {
        color.r = Math.round(color.r * 0.86 + 238 * 0.14);
        color.g = Math.round(color.g * 0.86 + 241 * 0.14);
        color.b = Math.round(color.b * 0.86 + 237 * 0.14);
      }

      return isDarkMode()
        ? adaptColorForDarkMode(color, r, g, b, contrast)
        : adaptColorForLightMode(color, r, g, b, contrast);
    }

    function adaptColorForLightMode(
      color: { r: number; g: number; b: number },
      sourceR: number,
      sourceG: number,
      sourceB: number,
      contrast: number,
    ) {
      const sourceLum = getLuminance(sourceR, sourceG, sourceB);
      const isWarmPixel = sourceR > sourceB * 1.12 && sourceR > sourceG * 0.78;
      const target = isWarmPixel ? { r: 135, g: 76, b: 48 } : { r: 38, g: 56, b: 70 };
      const lightLift = clamp(sourceLum / 255, 0, 1);
      const detailLift = Math.min(contrast, 80) / 80;
      const mixAmount = clamp(0.18 + lightLift * 0.34 + detailLift * 0.06, 0.2, 0.58);
      let adjusted = mixColor(color, target, mixAmount);
      const adjustedLum = getLuminance(adjusted.r, adjusted.g, adjusted.b);

      if (adjustedLum > 176) {
        adjusted = mixColor(adjusted, target, clamp((adjustedLum - 176) / 176, 0, 0.42));
      }

      return adjusted;
    }

    function adaptColorForDarkMode(
      color: { r: number; g: number; b: number },
      sourceR: number,
      sourceG: number,
      sourceB: number,
      contrast: number,
    ) {
      const sourceLum = getLuminance(sourceR, sourceG, sourceB);
      const colorLum = getLuminance(color.r, color.g, color.b);
      const isWarmPixel = sourceR > sourceB * 1.12 && sourceR > sourceG * 0.78;
      const darkLift = clamp((112 - sourceLum) / 112, 0, 1);
      const detailLift = Math.min(contrast, 80) / 80;
      const target = isWarmPixel
        ? { r: 226, g: 151, b: 106 }
        : sourceLum < 145
          ? { r: 164, g: 181, b: 187 }
          : { r: 232, g: 230, b: 215 };
      const mixAmount = clamp(0.16 + darkLift * 0.64 + detailLift * 0.08, 0.18, 0.82);
      let adjusted = mixColor(color, target, mixAmount);
      const minLum = isWarmPixel ? 94 : 86;
      const adjustedLum = getLuminance(adjusted.r, adjusted.g, adjusted.b);

      if (adjustedLum < minLum) {
        adjusted = mixColor(adjusted, target, clamp((minLum - adjustedLum) / minLum, 0, 0.42));
      }

      if (colorLum > 205) adjusted = mixColor(adjusted, { r: 255, g: 246, b: 221 }, 0.22);

      return adjusted;
    }

    function saturate(r: number, g: number, b: number, amount: number) {
      const gray = getLuminance(r, g, b);
      return {
        r: clamp(Math.round(gray + (r - gray) * amount), 0, 255),
        g: clamp(Math.round(gray + (g - gray) * amount), 0, 255),
        b: clamp(Math.round(gray + (b - gray) * amount), 0, 255),
      };
    }

    function mixColor(
      from: { r: number; g: number; b: number },
      to: { r: number; g: number; b: number },
      amount: number,
    ) {
      return {
        r: clamp(Math.round(lerp(from.r, to.r, amount)), 0, 255),
        g: clamp(Math.round(lerp(from.g, to.g, amount)), 0, 255),
        b: clamp(Math.round(lerp(from.b, to.b, amount)), 0, 255),
      };
    }

    function isDarkMode() {
      return theme === "dark";
    }

    function sizeForPixel(luminance: number, alpha: number, contrast: number, detailsOnly: boolean) {
      const density = detailsOnly ? 0.78 : 1;
      const alphaWeight = 0.82 + (alpha / 255) * 0.22;
      const darkWeight = 0.92 + (1 - luminance / 255) * 0.22;
      const detailWeight = 1 + Math.min(contrast, 90) / 520;
      return density * alphaWeight * darkWeight * detailWeight * (0.88 + Math.random() * 0.28);
    }

    function drawFrame(now = performance.now(), shouldUpdate = true) {
      drawingContext.clearRect(0, 0, width, height);
      const introProgress = introStartTime
        ? clamp((now - introStartTime) / (CONFIG.INTRO_FORM_MS + 90), 0, 1)
        : 1;

      if (portrait && CONFIG.GHOST_OPACITY > 0) {
        const ghostOpacity = isDarkMode() ? CONFIG.GHOST_OPACITY : 0.06;
        const ghostIntroBoost = isDarkMode() ? CONFIG.INTRO_GHOST_BOOST : 0.075;
        drawingContext.save();
        drawingContext.globalAlpha =
          ghostOpacity + (1 - easeOutCubic(introProgress)) * ghostIntroBoost;
        drawingContext.drawImage(portrait.canvas, portrait.x, portrait.y, portrait.width, portrait.height);
        drawingContext.restore();
      }

      for (let i = 0; i < particles.length; i++) {
        if (shouldUpdate) particles[i].update(now);
        particles[i].draw();
      }
    }

    function animate(now = performance.now()) {
      if (isCancelled || prefersReducedMotion) return;

      if (!isVisible) {
        frameId = 0;
        return;
      }

      drawFrame(now);
      frameId = requestAnimationFrame(animate);
    }

    function boot() {
      resize();
      initParticles();

      if (!prefersReducedMotion) drawFrame(performance.now());

      if (!animationStarted && !prefersReducedMotion) {
        animationStarted = true;
        frameId = requestAnimationFrame(animate);
      }
    }

    function handleResize() {
      resize();
      initParticles();
    }

    function lerpAngle(current: number, target: number, amount: number) {
      const delta = ((target - current + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      return current + delta * amount;
    }

    function lerp(start: number, end: number, amount: number) {
      return start + (end - start) * amount;
    }

    function easeOutCubic(value: number) {
      return 1 - Math.pow(1 - value, 3);
    }

    function easeOutQuint(value: number) {
      return 1 - Math.pow(1 - value, 5);
    }

    function shuffle<T>(items: T[]) {
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
      }
    }

    function clamp(value: number, min: number, max: number) {
      return Math.min(max, Math.max(min, value));
    }

    canvasElement.addEventListener("pointermove", updatePointer);
    canvasElement.addEventListener("pointerleave", resetPointer);
    canvasElement.addEventListener("pointercancel", resetPointer);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(containerElement);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry?.isIntersecting ?? true;
      if (isVisible && animationStarted && !frameId && !prefersReducedMotion) {
        frameId = requestAnimationFrame(animate);
      }
    });
    intersectionObserver.observe(containerElement);

    const handleImageReady = () => {
      if (imageReady) return;
      imageReady = true;
      if (!isCancelled) boot();
    };

    const handleImageError = () => {
      resize();
      if (!animationStarted && !prefersReducedMotion) {
        animationStarted = true;
        frameId = requestAnimationFrame(animate);
      }
    };

    sourceImage.decoding = "async";
    sourceImage.addEventListener("load", handleImageReady);
    sourceImage.addEventListener("error", handleImageError);
    sourceImage.src = portraitSourceUrl;
    void sourceImage.decode?.().then(handleImageReady).catch(() => {
      if (sourceImage.complete && sourceImage.naturalWidth > 0) handleImageReady();
    });
    imageReadyFallback = window.setTimeout(() => {
      if (sourceImage.complete && sourceImage.naturalWidth > 0) handleImageReady();
    }, 150);

    if (sourceImage.complete && sourceImage.naturalWidth > 0) {
      handleImageReady();
    }

    return () => {
      isCancelled = true;
      canvasElement.removeEventListener("pointermove", updatePointer);
      canvasElement.removeEventListener("pointerleave", resetPointer);
      canvasElement.removeEventListener("pointercancel", resetPointer);
      sourceImage.removeEventListener("load", handleImageReady);
      sourceImage.removeEventListener("error", handleImageError);
      window.clearTimeout(imageReadyFallback);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [theme]);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full min-h-[500px] flex items-center justify-center"
      role="img"
      aria-label="Interactive bird silhouette portrait of Samuel Ukpai"
    >
      <motion.div
        initial={{ opacity: 0, scale: 1.02 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative w-full max-w-[640px] aspect-[4/5] overflow-hidden rounded-3xl border border-slate-300/70 bg-[#e7ece8] shadow-2xl shadow-blue-500/10 dark:border-white/10 dark:bg-[#08090b] dark:shadow-blue-500/20"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.62),rgba(229,235,232,0.26)_45%,rgba(157,176,184,0.42)_100%)] dark:bg-[radial-gradient(circle_at_50%_42%,rgba(38,45,45,0.58),rgba(13,16,18,0.28)_45%,rgba(3,5,7,0.92)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.12),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(14,165,233,0.14),transparent_32%)] dark:bg-[radial-gradient(circle_at_18%_20%,rgba(59,130,246,0.18),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(14,165,233,0.16),transparent_32%)]" />
        <canvas ref={canvasRef} className="relative z-10 block h-full w-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/20 dark:ring-white/10" />
      </motion.div>
    </div>
  );
}
