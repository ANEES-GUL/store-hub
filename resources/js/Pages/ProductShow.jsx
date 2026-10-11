import React, { useState } from 'react';
import { Head, Link } from '@inertiajs/react';

export default function ProductShow({ product }) {
    const [added, setAdded] = useState(false);


    const handleAddToCart = () => {
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    
    return (
        <div className="min-h-screen bg-slate-900 text-white p-6 flex flex-col justify-between">
            <Head title={product.title} />

            {/* Navbar */}
            <div className="flex justify-between items-center mb-8 border-b border-slate-700 pb-4">
                <h1 className="text-2xl font-bold">StoreHub</h1>
                <Link href="/" className="text-blue-400 hover:underline text-sm">
                    &larr; Back to Catalog
                </Link>
            </div>

            {/* Product Details Section */}
            <div className="max-w-4xl mx-auto bg-slate-800 p-8 rounded-lg shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8 w-full my-auto">
                <div className="bg-slate-900 rounded overflow-hidden border border-slate-700 flex items-center justify-center">
                    <img
                        src={product.image || 'https://via.placeholder.com/400'}
                        alt={product.title}
                        className="w-full h-72 object-cover"
                    />
                </div>

                <div className="flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-bold text-blue-400 uppercase">
                            {product.category?.name || 'Uncategorized'}
                        </span>
                        <h1 className="text-2xl font-bold text-white mt-1 mb-2">{product.title}</h1>
                        <p className="text-2xl font-bold text-blue-400 mb-4">${product.price}</p>
                        <p className="text-slate-300 text-sm mb-4">
                            {product.description || 'No description provided.'}
                        </p>
                        <div className="text-sm text-slate-400 mb-6">
                            Stock: <span className="text-green-400 font-semibold">{product.stock} available</span>
                        </div>
                    </div>

                    <button
                        onClick={handleAddToCart}
                        className={`w-full font-bold py-3 rounded text-sm transition ${
                            added
                                ? 'bg-green-600 text-white'
                                : 'bg-blue-600 hover:bg-blue-500 text-white'
                        }`}
                    >
                        {added ? '✓ Added to Cart!' : 'Add to Cart'}
                    </button>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-slate-500 mt-8 border-t border-slate-800 pt-4">
                &copy; 2026 StoreHub. All rights reserved.
            </div>
        </div>
    );
}