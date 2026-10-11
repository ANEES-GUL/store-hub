import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ShippingPolicy() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col justify-between">
            <Head title="Shipping Policy - StoreHub" />

            {/* Navbar */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <h1 className="text-2xl font-bold">StoreHub</h1>
                <Link href="/" className="text-blue-400 hover:underline text-sm">
                    &larr; Back to Shop
                </Link>
            </div>

            {/* Policy Details */}
            <div className="max-w-2xl mx-auto bg-slate-800 p-8 rounded shadow-lg w-full my-auto space-y-6">
                <span className="text-xs font-bold text-blue-400 uppercase bg-slate-900 px-3 py-1 rounded">
                    Store Policy
                </span>

                <h1 className="text-2xl font-bold">Shipping & Fulfillment Policy</h1>

                <div className="space-y-4 text-sm text-slate-300">
                    <div>
                        <h3 className="font-bold text-white text-base">1. Order Processing Time</h3>
                        <p className="mt-1">All orders are processed within 24 to 48 hours. Orders placed on weekends or holidays will begin processing on the next business day.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-base">2. Express Delivery & Tracking</h3>
                        <p className="mt-1">Once dispatched, tracking details show up in your account dashboard. Delivery usually takes 2 to 5 business days.</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-base">3. Damaged or Missing Packages</h3>
                        <p className="mt-1">If your product arrives damaged or has missing parts, contact customer support right away at contact@storehub.com.</p>
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