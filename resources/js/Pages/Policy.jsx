import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function Policy() {
    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
            <Head title="Store Policy & Terms - StoreHub" />
            <Background3D />

            {/* Header */}
            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between relative z-10">
                    <Link href="/" className="text-2xl font-black text-white tracking-tight flex items-center gap-2 group">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_12px_rgba(99,102,241,0.8)]"></span>
                        Store<span className="text-indigo-400 group-hover:text-indigo-300 transition">Hub</span>
                    </Link>

                    <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60">
                        ← Back to Storefront
                    </Link>
                </div>
            </header>

            {/* Main Policy Content */}
            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10 space-y-8 flex-1">
                <div className="text-center space-y-3">
                    <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                        Store <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Policy & Terms</span>
                    </h1>
                    <p className="text-xs text-slate-400">Last updated: August 2026</p>
                </div>

                <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-8 text-sm text-slate-300 leading-relaxed">
                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-400"></span> 1. Order Processing & Shipping
                        </h2>
                        <p className="text-slate-400 font-light pl-4">
                            All orders placed on StoreHub are processed within 1-2 business days. Customers will receive order status updates directly in their personal Account Dashboard.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-400"></span> 2. Returns & Refunds
                        </h2>
                        <p className="text-slate-400 font-light pl-4">
                            We accept returns on eligible items within 14 days of delivery. Products must be unused and in original packaging. Contact our support team to initiate a return request.
                        </p>
                    </section>

                    <section className="space-y-2">
                        <h2 className="text-lg font-bold text-white flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-indigo-400"></span> 3. Privacy & Data Protection
                        </h2>
                        <p className="text-slate-400 font-light pl-4">
                            Your account information, shipping address, and phone details are stored securely to facilitate order processing and are never sold or distributed to third parties.
                        </p>
                    </section>
                </div>
            </main>

            {/* Compact Footer */}
            <footer className="bg-slate-900/90 backdrop-blur-md border-t border-slate-800/80 py-6 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} StoreHub. All rights reserved.
                </div>
            </footer>
        </div>
    );
}