import React from 'react';
import { Head, Link } from '@inertiajs/react';

export default function Index({ products, categories, selectedCategory }) {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-900">
            <Head title="Store Marketplace - Catalog" />

            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold tracking-tight text-indigo-600">
                        StoreHub
                    </Link>
                    <nav className="flex space-x-4">
                        <Link href="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
                        <Link href="/products" className="text-indigo-600 font-bold">Catalog</Link>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Product Catalog</h1>

                {/* Category Filters */}
                <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 border-b border-gray-200">
                    <Link
                        href="/products"
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                            !selectedCategory
                                ? 'bg-indigo-600 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                    >
                        All Categories
                    </Link>
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/products?category=${cat.slug}`}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                                selectedCategory === cat.slug
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                        >
                            {cat.name}
                        </Link>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                            <img
                                src={product.image || 'https://via.placeholder.com/300'}
                                alt={product.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <span className="text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                                    {product.category?.name}
                                </span>
                                <h3 className="text-lg font-bold text-gray-900 mt-1 line-clamp-1">{product.title}</h3>
                                <p className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <span className="text-xl font-extrabold text-gray-900">${product.price}</span>
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="px-3 py-1.5 text-sm bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}