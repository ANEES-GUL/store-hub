import React from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function Policy() {
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col justify-between">
            <Head title="Store Policy - StoreHub" />
            <Background3D />

            {/* Header */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <h1 className="text-2xl font-bold">StoreHub</h1>
                <Link href="/" className="text-blue-400 hover:underline text-sm">
                    Back to Store
                </Link>
            </div>

            {/* Main Content */}
            <div className="max-w-2xl mx-auto bg-slate-800 p-6 rounded shadow-lg w-full my-auto space-y-6">
                <h2 className="text-2xl font-bold text-center border-b border-slate-700 pb-2">
                    Store Policy & Terms
                </h2>

                <div className="space-y-4 text-sm text-slate-300">
                    <div>
                        <h3 className="font-bold text-white text-base">1. Order Processing & Shipping</h3>
                        <p className="mt-1">
                            All orders placed on StoreHub are processed within 1-2 business days. Customers will receive order status updates directly in their account dashboard.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-base">2. Returns & Refunds</h3>
                        <p className="mt-1">
                            We accept returns on eligible items within 14 days of delivery. Products must be unused and in original packaging. Contact our support team to start a return.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-white text-base">3. Privacy & Data Protection</h3>
                        <p className="mt-1">
                            Your account information, address, and phone details are stored securely for order processing and are never shared with third parties.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-500 mt-8 border-t border-slate-800 pt-4">
                &copy; 2026 StoreHub. All rights reserved.
            </div>
        </div>
    );
}