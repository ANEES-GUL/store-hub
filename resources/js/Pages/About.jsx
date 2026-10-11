import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function About() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col justify-between">
            <Head title="About Us - StoreHub" />

            {/* Navbar */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <h1 className="text-2xl font-bold">StoreHub</h1>
                <Link href="/" className="text-blue-400 hover:underline text-sm">
                    &larr; Back to Shop
                </Link>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded shadow-lg w-full my-auto space-y-6">
                <span className="text-xs font-bold text-blue-400 uppercase bg-slate-900 px-3 py-1 rounded">
                    Our Mission & Vision
                </span>

                <h1 className="text-3xl font-bold">Powering Next-Gen Hardware Workstations.</h1>

                <p className="text-slate-300 text-sm leading-relaxed">
                    StoreHub is built for enthusiasts and creators who want quality tech gear and hardware components. We provide reliable products and a simple shopping experience.
                </p>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-700 text-center">
                    <div className="bg-slate-900 p-3 rounded">
                        <h3 className="font-bold text-blue-400 text-lg">100%</h3>
                        <p className="text-xs text-slate-400">Authentic Gear</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded">
                        <h3 className="font-bold text-blue-400 text-lg">24/7</h3>
                        <p className="text-xs text-slate-400">Support</p>
                    </div>
                    <div className="bg-slate-900 p-3 rounded">
                        <h3 className="font-bold text-blue-400 text-lg">Express</h3>
                        <p className="text-xs text-slate-400">Shipping</p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-500 mt-8 border-t border-slate-800 pt-4">
                &copy; 2026 StoreHub Inc. All rights reserved.
            </div>
        </div>
    );
}