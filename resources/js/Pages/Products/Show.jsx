// resources/js/Pages/Products/Show.jsx
import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function Show({ auth, product }) {
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        const existingCart = JSON.parse(localStorage.getItem('store_cart')) || [];
        const existingIndex = existingCart.findIndex(item => item.id === product.id);

        let updatedCart;
        if (existingIndex > -1) {
            existingCart[existingIndex].quantity += quantity;
            updatedCart = [...existingCart];
        } else {
            updatedCart = [
                ...existingCart,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: quantity
                }
            ];
        }

        localStorage.setItem('store_cart', JSON.stringify(updatedCart));
        setAdded(true);
        setTimeout(() => setAdded(false), 3000);
    };

    if (!product) return null;

    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white">
            <Head title={`${product.title} - StoreHub`} />
            <Background3D />

            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></span>
                        Store<span className="text-indigo-400">Hub</span>
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/checkout" className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl border border-slate-700 transition flex items-center gap-2 text-xs font-bold">
                            <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                            View Cart & Checkout
                        </Link>
                        <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition bg-slate-800/60 px-3.5 py-2 rounded-xl border border-slate-700/60">
                            ← Back to Catalog
                        </Link>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-slate-900/75 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(79,70,229,0.15)]">
                    <div className="relative overflow-hidden bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl">
                        <img src={product.image || 'https://via.placeholder.com/600x400'} alt={product.title} className="w-full h-96 object-cover" />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight">{product.title}</h1>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">${product.price}</span>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed font-light mb-8">{product.description || 'Experience premium performance and sleek craftsmanship.'}</p>
                        </div>

                        <div className="space-y-4 pt-6 border-t border-slate-800">
                            <div className="flex items-center gap-4">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quantity:</span>
                                <div className="flex items-center bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-700 transition">-</button>
                                    <span className="px-4 py-1.5 text-sm font-bold text-white">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-1.5 text-slate-300 hover:text-white hover:bg-slate-700 transition">+</button>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-xs uppercase tracking-wider rounded-xl shadow-lg shadow-indigo-600/30 transition"
                            >
                                {added ? '✓ Added to Cart Successfully!' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}