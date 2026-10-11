import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function Contact() {
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
    };
    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col justify-between">
            <Head title="Contact Us - StoreHub" />
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
                            <Link href="/about" className="hover:text-cyan-400 transition">About Us</Link>
                            <Link href="/contact" className="text-cyan-400">Contact Us</Link>
                        </nav>
                    </div>

                    <Link href="/" className="text-xs font-bold text-indigo-400 hover:text-white transition">
                        &larr; Back to Shop
                    </Link>
                </div>
            </header>





            {/* Form Content */}
            <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 w-full">
                <div className="bg-slate-950/60 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                        Get In Touch
                    </div>

                    <h1 className="text-3xl sm:text-4xl font-black text-white">Contact Our Team</h1>
                    <p className="text-slate-400 text-sm font-light">
                        Have questions about hardware specifications, orders, or custom setups? Drop us a message below.
                    </p>

                    {submitted ? (
                        <div className="p-6 bg-indigo-950/80 border border-indigo-500/50 rounded-2xl text-center space-y-2">
                            <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
                            <p className="text-xs text-slate-300">Thank you for contacting StoreHub. Our team will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Name</label>
                                <input required type="text" placeholder="Your Full Name" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Email Address</label>
                                <input required type="email" placeholder="name@domain.com" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500" />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Message</label>
                                <textarea required rows="4" placeholder="How can we assist you?" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500"></textarea>
                            </div>

                            <button type="submit" className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 hover:opacity-95 transition">
                                Send Message
                            </button>
                        </form>
                    )}
                </div>
            </main>






            {/* Footer */}
            <footer className="bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 relative z-20 py-8 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} StoreHub Inc. All rights reserved.
            </footer>
        </div>
    );
}