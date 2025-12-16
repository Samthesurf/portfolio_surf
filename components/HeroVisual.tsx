'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function HeroVisual() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];

        // Configuration
        const particleCount = 40;
        const connectionDistance = 100;
        const mouseDistance = 150;

        let mouse = { x: 0, y: 0 };

        // Handle Resize
        const resize = () => {
            if (canvas.parentElement) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }
        };

        // Track mouse
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        window.addEventListener('resize', resize);
        window.addEventListener('mousemove', handleMouseMove);

        // Initial resize
        resize();

        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            size: number;

            constructor() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                // Random velocity between -0.5 and 0.5
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce off edges
                if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;

                // Mouse interaction (gentle repulsion)
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < mouseDistance) {
                    const forceDirectionX = dx / distance;
                    const forceDirectionY = dy / distance;
                    const force = (mouseDistance - distance) / mouseDistance;
                    const repulsionStrength = 0.05;

                    this.vx -= forceDirectionX * force * repulsionStrength;
                    this.vy -= forceDirectionY * force * repulsionStrength;
                }
            }

            draw(context: CanvasRenderingContext2D) {
                context.beginPath();
                context.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                context.fillStyle = 'rgba(59, 130, 246, 0.6)'; // Blue-500
                context.fill();
            }
        }

        // Initialize particles
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Standard clear

            // Check theme for line color (simple check)
            const isDark = document.documentElement.classList.contains('dark');
            const lineColor = isDark ? 'rgba(59, 130, 246,' : 'rgba(96, 165, 250,'; // Blue-500 vs Blue-400

            // Update and draw particles
            particles.forEach((particle, index) => {
                particle.update();
                particle.draw(ctx);

                // Draw connections
                for (let j = index; j < particles.length; j++) {
                    const dx = particles[j].x - particle.x;
                    const dy = particles[j].y - particle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < connectionDistance) {
                        ctx.beginPath();
                        const opacity = 1 - (distance / connectionDistance);
                        ctx.strokeStyle = `${lineColor} ${opacity * 0.4})`; // Dynamic opacity
                        ctx.lineWidth = 1;
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center perspective-1000 overflow-hidden rounded-3xl">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-blue-400/10 blur-[80px] rounded-full opacity-40 mix-blend-screen pointer-events-none" />

            {/* AI Neural Network Canvas */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full z-0"
            />

            {/* Content Wrapper - Keeps the Code Card positioned correctly */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-64 h-64 md:w-96 md:h-96 pointer-events-none" // pointer-events-none to let mouse pass through to canvas
            >
                {/* Code Snippet Card Floating */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -right-12 top-1/2 -translate-y-1/2 bg-white dark:bg-[#0A0A0A]/90 border border-slate-200 dark:border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md w-64 hidden md:block pointer-events-auto"
                >
                    <div className="flex gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-2 font-mono text-xs text-slate-500 dark:text-gray-400">
                        <div className="flex">
                            <span className="text-blue-400">const</span>
                            <span className="text-blue-400 ml-2">developer</span>
                            <span className="text-slate-900 dark:text-white ml-2">=</span>
                            <span className="text-slate-900 dark:text-white ml-2">{`{`}</span>
                        </div>
                        <div className="pl-4">
                            <span className="text-slate-900 dark:text-white">name:</span>
                            <span className="text-green-400 ml-2">'Samuel'</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-slate-900 dark:text-white">role:</span>
                            <span className="text-green-400 ml-2">'Mobile Dev'</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-slate-900 dark:text-white">passion:</span>
                            <span className="text-green-400 ml-2">'Building'</span>
                        </div>
                        <div>{`}`}</div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
