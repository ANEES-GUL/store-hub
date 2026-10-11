import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ProductShow({ product }) {
    const [added, setAdded] = useState(false);

    const handleAddToCart = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            <Head title={product.title} />

            {/* Navbar */}
            <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black text-white tracking-tight">
                        Store<span className="text-indigo-500">Hub</span>
                    </Link>
                    <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white transition">
                        ← Back to Catalog
                    </Link>
                </div>
            </header>

            {/* Product Details Section */}
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-2xl">
                    <div className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center">
                        <img
                            src={product.image || 'https://via.placeholder.com/400'}
                            alt={product.title}
                            className="w-full h-80 object-cover"
                        />
                    </div>

                    <div className="flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                                {product.category?.name || 'Uncategorized'}
                            </span>
                            <h1 className="text-3xl font-black text-white mt-1 mb-4">{product.title}</h1>
                            <p className="text-3xl font-black text-indigo-400 mb-6">${product.price}</p>
                            <p className="text-slate-300 text-sm leading-relaxed mb-6">
                                {product.description || 'No description provided for this item.'}
                            </p>
                            <div className="text-sm text-slate-400 mb-6">
                                Availability: <span className="text-emerald-400 font-semibold">{product.stock} units in stock</span>
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={handleAddToCart}
                                className={`w-full font-bold py-3.5 rounded-xl transition shadow-lg text-sm ${
                                    added
                                        ? 'bg-emerald-600 text-white shadow-emerald-600/30'
                                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                                }`}
                            >
                                {added ? '✓ Added to Cart!' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}