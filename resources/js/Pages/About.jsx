import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function About({ auth }) {
    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col justify-between">
            <Head title="About Us - StoreHub" />
            <Background3D />

            {/* Navbar */}
            <header className="w-full bg-slate-950/80 backdrop-blur-2xl border-b border-indigo-500/20 sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-2xl font-black text-white tracking-wider flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-base">
                                SH
                            </div>
                            Store<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
                        </Link>

                        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
                            <Link href="/about" className="text-cyan-400">About Us</Link>
                            <Link href="/contact" className="hover:text-cyan-400 transition">Contact Us</Link>
                        </nav>
                    </div>

                    <Link href="/" className="text-xs font-bold text-indigo-400 hover:text-white transition">
                        &larr; Back to Shop
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
                <div className="bg-slate-950/60 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                        Our Mission & Vision
                    </div>

                    <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                        Powering Next-Gen <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-indigo-200 bg-clip-text text-transparent">
                            Digital Hardware Workstations.
                        </span>
                    </h1>

                    <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                        StoreHub is engineered for enthusiasts, creators, and power users who demand uncompromising quality in their tech ecosystem. From high-grade gaming peripherals to audiophile acoustics and flagship desktop hardware, we curate equipment that pushes the boundaries of performance.
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-slate-800">
                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                            <h3 className="text-2xl font-black text-indigo-400">100%</h3>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Authentic Gear</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                            <h3 className="text-2xl font-black text-cyan-400">24/7</h3>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Technical Support</p>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
                            <h3 className="text-2xl font-black text-white">Express</h3>
                            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-1">Worldwide Shipping</p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 relative z-20 py-8 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} StoreHub Inc. All rights reserved.
            </footer>
        </div>
    );
}