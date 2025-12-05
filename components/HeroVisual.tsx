'use client';

import { motion } from 'framer-motion';

export default function HeroVisual() {
    return (
        <div className="relative w-full h-full min-h-[400px] flex items-center justify-center perspective-1000">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-blue-400/20 blur-[100px] rounded-full opacity-50" />

            {/* Main Abstract Shape Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative z-10 w-64 h-64 md:w-96 md:h-96"
            >
                {/* Floating Cube-like structures */}
                <motion.div
                    animate={{
                        rotateY: [0, 360],
                        rotateX: [10, 30, 10]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 border border-white/10 rounded-3xl backdrop-blur-sm bg-white/5 shadow-2xl"
                />

                <motion.div
                    animate={{
                        rotateY: [360, 0],
                        rotateX: [-10, -30, -10]
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-8 border border-blue-500/30 rounded-full border-dashed"
                />

                {/* Code Snippet Card Floating */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="absolute -right-12 top-1/2 -translate-y-1/2 bg-[#0A0A0A]/90 border border-white/10 p-4 rounded-xl shadow-xl backdrop-blur-md w-64 hidden md:block"
                >
                    <div className="flex gap-2 mb-3">
                        <div className="w-3 h-3 rounded-full bg-red-500/50" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                        <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <div className="space-y-2 font-mono text-xs text-gray-400">
                        <div className="flex">
                            <span className="text-blue-400">const</span>
                            <span className="text-blue-400 ml-2">developer</span>
                            <span className="text-white ml-2">=</span>
                            <span className="text-white ml-2">{`{`}</span>
                        </div>
                        <div className="pl-4">
                            <span className="text-white">name:</span>
                            <span className="text-green-400 ml-2">'Samuel'</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-white">role:</span>
                            <span className="text-green-400 ml-2">'Mobile Dev'</span>,
                        </div>
                        <div className="pl-4">
                            <span className="text-white">passion:</span>
                            <span className="text-green-400 ml-2">'Building'</span>
                        </div>
                        <div>{`}`}</div>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
