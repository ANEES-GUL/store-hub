import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col justify-between">
            <Head title="Shipping Policy - StoreHub" />
            <Background3D />

            {/* Navbar */}
            <header className="w-full bg-slate-950/80 backdrop-blur-2xl border-b border-indigo-500/20 sticky top-0 z-40 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
                    <Link href="/" className="text-2xl font-black text-white tracking-wider flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-base">
                            SH
                        </div>
                        Store<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
                    </Link>

                    <Link href="/" className="text-xs font-bold text-indigo-400 hover:text-white transition">
                        &larr; Back to Shop
                    </Link>
                </div>
            </header>

            {/* Policy Details */}
            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
                <div className="bg-slate-950/60 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                        Store Policy
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-white">Shipping & Fulfillment Policy</h1>

                    <div className="space-y-4 text-slate-300 text-sm leading-relaxed font-light">
                        <h3 className="text-base font-bold text-white pt-2">1. Order Processing Time</h3>
                        <p>All hardware and gear orders are processed within 24 to 48 hours. Orders placed on weekends or holidays will begin processing on the following business day.</p>

                        <h3 className="text-base font-bold text-white pt-2">2. Express Delivery & Tracking</h3>
                        <p>Once dispatched, tracking details are automatically synced to your StoreHub account dashboard. Express delivery typically takes 2 to 5 business days depending on location.</p>

                        <h3 className="text-base font-bold text-white pt-2">3. Damaged or Missing Packages</h3>
                        <p>All shipments are fully insured. If your product arrives with package damage or missing components, contact our technical support immediately at contact@storehub.com.</p>
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