"use client";

import { useState } from "react";

export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");

        try {
            // Using Web3Forms - free and no backend needed
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    access_key: "3c861b69-13e2-4311-b491-11fd80dbff50", // Get this from web3forms.com
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    to: "ukpsamuel67@gmail.com",
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
                setTimeout(() => setStatus("idle"), 5000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Form submission error:", error);
            setStatus("error");
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section id="contact" className="relative py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-white to-slate-50 dark:from-[#030303] dark:to-[#0a0a0a] transition-colors duration-300">
            <div className="container mx-auto max-w-5xl">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-300">
                            Let's Work Together
                        </span>
                    </h2>
                    <p className="text-slate-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                        Have a project in mind or want to discuss opportunities? I'd love to hear from you.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

                    {/* Left: Contact Info */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Email Card */}
                        <div className="group p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-blue-400 dark:hover:border-blue-400/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                            <div className="flex items-start gap-4">
                                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-slate-900 dark:text-white mb-1">Email</h3>
                                    <a
                                        href="mailto:ukpsamuel67@gmail.com"
                                        className="text-blue-600 dark:text-blue-400 hover:underline break-all"
                                    >
                                        ukpsamuel67@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact Button */}
                        <a
                            href="mailto:ukpsamuel67@gmail.com?subject=Project Inquiry&body=Hi Samuel,%0D%0A%0D%0AI'd like to discuss..."
                            className="block w-full px-6 py-4 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-black font-semibold text-center hover:bg-slate-700 dark:hover:bg-gray-200 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95"
                        >
                            Quick Email →
                        </a>

                        {/* Availability Note */}
                        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20">
                            <p className="text-sm text-blue-900 dark:text-blue-300">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                                Currently available for freelance projects
                            </p>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="lg:col-span-3">
                        <form onSubmit={handleSubmit} className="space-y-6 p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 shadow-xl">

                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                                    Your Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={5}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                    placeholder="Tell me about your project..."
                                />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={status === "loading"}
                                className="w-full px-6 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-bold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {status === "loading" ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Sending...
                                    </span>
                                ) : (
                                    "Send Message"
                                )}
                            </button>

                            {/* Status Messages */}
                            {status === "success" && (
                                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20">
                                    <p className="text-green-800 dark:text-green-300 text-sm font-medium">
                                        ✓ Message sent successfully! I'll get back to you soon.
                                    </p>
                                </div>
                            )}

                            {status === "error" && (
                                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                    <p className="text-red-800 dark:text-red-300 text-sm font-medium">
                                        ✗ Something went wrong. Please try again or email me directly.
                                    </p>
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
