import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function Account({ auth, orders = [] }) {
    const handleCancelOrder = (orderId) => {
        if (confirm('Are you sure you want to cancel this order?')) {
            router.patch(`/orders/${orderId}/cancel`, {}, {
                preserveScroll: true,
            });
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col justify-between">
            <Head title="My Account - StoreHub" />
            <Background3D />

            {/* HEADER */}
            <header className="w-full bg-slate-950/80 backdrop-blur-2xl border-b border-indigo-500/20 sticky top-0 z-40 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
                    <Link href="/" className="text-2xl font-black text-white tracking-wider flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-base shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                            SH
                        </div>
                        Store<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
                    </Link>

                    <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition">
                        &larr; Back to Storefront
                    </Link>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full space-y-8">
                <div className="bg-slate-950/60 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-8 shadow-2xl space-y-4">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold tracking-widest uppercase">
                        Customer Portal
                    </div>
                    <h1 className="text-3xl font-black text-white">Welcome, {auth.user.name}</h1>
                    <p className="text-xs text-slate-400">Email: <span className="text-slate-200 font-semibold">{auth.user.email}</span></p>
                </div>

                {/* ORDER HISTORY SECTION */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-white">Your Order History</h2>

                    {orders.length > 0 ? (
                        <div className="space-y-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-slate-950/60 backdrop-blur-2xl border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                                    <div className="space-y-2 flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-base font-black text-white">Order #{order.id}</h3>
                                            <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                                order.status === 'completed' 
                                                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                    : order.status === 'cancelled'
                                                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                            }`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <p className="text-xs text-slate-400 font-light">
                                            Shipping To: <span className="text-slate-200">{order.address || 'N/A'}</span> ({order.phone || 'N/A'})
                                        </p>

                                        {/* ITEMS */}
                                        <div className="flex flex-wrap gap-2 pt-1">
                                            {order.items?.map((item, idx) => (
                                                <span key={idx} className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-300">
                                                    {item.product?.title || 'Item'} (x{item.quantity}) - ${item.price}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:items-end gap-3 w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-slate-800">
                                        <span className="text-xl font-black text-white">${order.total}</span>

                                        {order.status === 'pending' && (
                                            <button
                                                onClick={() => handleCancelOrder(order.id)}
                                                className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 font-bold px-4 py-2 rounded-xl text-xs transition"
                                            >
                                                Cancel Order
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
                            <p className="text-slate-400 text-sm">You haven't placed any orders yet.</p>
                        </div>
                    )}
                </div>
            </main>

            {/* FOOTER */}
            <footer className="bg-slate-950/90 backdrop-blur-xl border-t border-slate-800/80 relative z-20 py-8 text-center text-xs text-slate-500">
                &copy; {new Date().getFullYear()} StoreHub Inc. All rights reserved.
            </footer>
        </div>
    );
}