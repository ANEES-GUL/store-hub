import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function Dashboard({ auth, products = [], categories = [], orders = [] }) {
    const [activeTab, setActiveTab] = useState('orders');
    const [orderFilter, setOrderFilter] = useState('all');
    const [imagePreview, setImagePreview] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null); // Track product being edited

    // Form state for Adding/Editing Product
    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        price: '',
        description: '',
        category_id: categories[0]?.id || '',
        image: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Handle Form Submit (Handles BOTH Creating new products AND Updating existing products)
    const handleSubmitProduct = (e) => {
        e.preventDefault();

        if (editingProduct) {
            // Updating Existing Product (Uses Inertia post with _method: 'put' for file uploads)
            router.post(`/products/${editingProduct.id}`, {
                _method: 'put',
                ...data,
            }, {
                onSuccess: () => {
                    cancelEdit();
                },
                preserveScroll: true,
                forceFormData: true,
            });
        } else {
            // Creating New Product
            post('/products', {
                onSuccess: () => {
                    reset();
                    setImagePreview(null);
                },
                preserveScroll: true,
                forceFormData: true,
            });
        }
    };

    // Populate form fields for Editing
    const startEdit = (product) => {
        setEditingProduct(product);
        setData({
            title: product.title,
            price: product.price,
            description: product.description || '',
            category_id: product.category_id || categories[0]?.id || '',
            image: null,
        });
        setImagePreview(product.image || null);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Clear form state back to Create Mode
    const cancelEdit = () => {
        setEditingProduct(null);
        reset();
        setImagePreview(null);
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        router.patch(`/admin/orders/${orderId}/status`, { status: newStatus }, {
            preserveScroll: true,
        });
    };

    const handleClearOrder = (orderId) => {
        if (confirm('Are you sure you want to delete/clear this order?')) {
            router.delete(`/admin/orders/${orderId}`, {
                preserveScroll: true,
            });
        }
    };

    const handleDeleteProduct = (productId) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(`/products/${productId}`, {
                preserveScroll: true,
            });
        }
    };

    const displayedOrders = orders.filter(order => {
        if (orderFilter === 'active') return order.status !== 'completed';
        if (orderFilter === 'completed') return order.status === 'completed';
        return true;
    });

    const totalSales = orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + Number(o.total || 0), 0);

    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500 selection:text-white overflow-x-hidden flex flex-col justify-between">
            <Head title="Admin Dashboard - StoreHub" />
            <Background3D />

            {/* HEADER */}
            <header className="w-full bg-slate-950/80 backdrop-blur-2xl border-b border-indigo-500/20 sticky top-0 z-40 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3">
                        <Link href="/" className="text-2xl font-black text-white tracking-wider flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center font-black text-slate-950 text-base shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                                SH
                            </div>
                            Store<span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">Hub</span>
                        </Link>
                        <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-400 text-xs font-bold border border-indigo-500/30">
                            Admin
                        </span>
                    </div>

                    <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition">
                        &larr; Back to Storefront
                    </Link>
                </div>
            </header>

            {/* DASHBOARD CONTENT */}
            <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full">
                {/* NAVIGATION TABS */}
                <div className="flex items-center gap-3 border-b border-slate-800/80 pb-4 mb-8">
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition ${
                            activeTab === 'orders'
                                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                    >
                        Orders ({orders.length})
                    </button>

                    <button
                        onClick={() => setActiveTab('products')}
                        className={`px-5 py-2.5 rounded-xl text-xs font-extrabold uppercase tracking-wider transition ${
                            activeTab === 'products'
                                ? 'bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30'
                                : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:text-white'
                        }`}
                    >
                        Products & Management ({products.length})
                    </button>
                </div>

                {/* ORDERS TAB */}
                {activeTab === 'orders' && (
                    <div className="space-y-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-black text-white">Manage Customer Orders</h1>
                                <p className="text-xs text-slate-400 mt-0.5">Total Completed Sales: <span className="text-cyan-400 font-bold">${totalSales.toFixed(2)}</span></p>
                            </div>

                            <div className="flex items-center gap-2 bg-slate-950/80 p-1 rounded-xl border border-slate-800 w-fit">
                                <button
                                    onClick={() => setOrderFilter('all')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                        orderFilter === 'all' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    All ({orders.length})
                                </button>
                                <button
                                    onClick={() => setOrderFilter('active')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                        orderFilter === 'active' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Active ({orders.filter(o => o.status !== 'completed').length})
                                </button>
                                <button
                                    onClick={() => setOrderFilter('completed')}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                                        orderFilter === 'completed' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    Completed ({orders.filter(o => o.status === 'completed').length})
                                </button>
                            </div>
                        </div>

                        {displayedOrders.length > 0 ? (
                            <div className="space-y-4">
                                {displayedOrders.map((order) => (
                                    <div key={order.id} className="bg-slate-950/60 backdrop-blur-2xl border border-indigo-500/20 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                                        <div className="space-y-2 flex-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-black text-white">Order #{order.id}</h3>
                                                <span className={`px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider ${
                                                    order.status === 'completed' 
                                                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                                        : order.status === 'on_track' || order.status === 'shipped'
                                                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                                        : order.status === 'cancelled'
                                                        ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                                                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                                }`}>
                                                    {order.status === 'on_track' ? 'On Track' : order.status}
                                                </span>
                                            </div>

                                            <div className="text-xs text-slate-400 space-y-1 font-light">
                                                <p><strong className="text-slate-300">Customer:</strong> {order.user?.name || 'Guest'} ({order.user?.email})</p>
                                                <p><strong className="text-slate-300">Phone:</strong> {order.phone || 'N/A'} | <strong className="text-slate-300">Address:</strong> {order.address || 'N/A'}</p>
                                            </div>

                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {order.items?.map((item, idx) => (
                                                    <span key={idx} className="bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1 text-[11px] font-medium text-slate-300">
                                                        {item.product?.title || 'Item'} (x{item.quantity}) - ${item.price}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end gap-3 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-slate-800">
                                            <span className="text-xl font-black text-white">${order.total}</span>

                                            <div className="flex flex-wrap items-center gap-2">
                                                {order.status !== 'on_track' && order.status !== 'completed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order.id, 'on_track')}
                                                        className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition"
                                                    >
                                                        Set On Track
                                                    </button>
                                                )}

                                                {order.status !== 'completed' && (
                                                    <button
                                                        onClick={() => handleStatusUpdate(order.id, 'completed')}
                                                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-3 py-1.5 rounded-xl text-xs transition"
                                                    >
                                                        Mark Completed
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => handleClearOrder(order.id)}
                                                    className="bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 font-bold px-3 py-1.5 rounded-xl text-xs transition"
                                                >
                                                    Delete Order
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800">
                                <p className="text-slate-400 text-sm">No orders found in this view.</p>
                            </div>
                        )}
                    </div>
                )}

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div className="space-y-10">
                        {/* DYNAMIC FORM: CREATE NEW OR EDIT PRODUCT */}
                        <div className="bg-slate-950/60 backdrop-blur-2xl border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xl font-black text-white">
                                    {editingProduct ? `Edit Product: ${editingProduct.title}` : 'Add New Product'}
                                </h2>
                                {editingProduct && (
                                    <button
                                        type="button"
                                        onClick={cancelEdit}
                                        className="text-xs font-bold text-rose-400 hover:underline"
                                    >
                                        ✕ Cancel Editing
                                    </button>
                                )}
                            </div>

                            <form onSubmit={handleSubmitProduct} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={data.title}
                                        onChange={e => setData('title', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="e.g. Mechanical Gaming Keyboard"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Price ($)</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        required
                                        value={data.price}
                                        onChange={e => setData('price', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="e.g. 149.99"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Category</label>
                                    <select
                                        value={data.category_id}
                                        onChange={e => setData('category_id', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                                    >
                                        {categories.map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">
                                        {editingProduct ? 'Change Image (Optional)' : 'Choose Image From Folder'}
                                    </label>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        required={!editingProduct} // Required only when adding new
                                        onChange={handleImageChange}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-300 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                                    />
                                </div>

                                {imagePreview && (
                                    <div className="sm:col-span-2 flex items-center gap-4 bg-slate-900/80 p-3 rounded-2xl border border-slate-800">
                                        <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-xl border border-indigo-500/30" />
                                        <span className="text-xs text-indigo-400 font-semibold">Image ready for submission.</span>
                                    </div>
                                )}

                                <div className="sm:col-span-2">
                                    <label className="block text-xs font-bold text-slate-300 uppercase mb-2">Description</label>
                                    <textarea
                                        rows="3"
                                        value={data.description}
                                        onChange={e => setData('description', e.target.value)}
                                        className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                                        placeholder="Product specs & description..."
                                    ></textarea>
                                </div>

                                <div className="sm:col-span-2 flex gap-3">
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30"
                                    >
                                        {editingProduct ? '✓ Save Changes' : '+ Create Product'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* EXISTING PRODUCTS LIST WITH EDIT & DELETE BUTTONS */}
                        <div>
                            <h2 className="text-xl font-black text-white mb-6">Existing Catalog Products ({products.length})</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {products.map((product) => (
                                    <div key={product.id} className="bg-slate-950/60 border border-slate-800 rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between">
                                        <div className="aspect-square bg-slate-900 relative">
                                            <img src={product.image || 'https://via.placeholder.com/300'} alt="" className="w-full h-full object-cover" />
                                        </div>

                                        <div className="p-4 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="font-bold text-white text-sm line-clamp-1">{product.title}</h3>
                                                <p className="text-xs text-indigo-400 font-bold mt-1">${product.price}</p>
                                            </div>

                                            {/* EDIT AND DELETE BUTTONS */}
                                            <div className="flex items-center gap-2 mt-4">
                                                <button
                                                    onClick={() => startEdit(product)}
                                                    className="flex-1 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-400 hover:text-white border border-indigo-500/30 font-bold py-2 rounded-xl text-xs transition"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    onClick={() => handleDeleteProduct(product.id)}
                                                    className="flex-1 bg-rose-600/20 hover:bg-rose-600 text-rose-400 hover:text-white border border-rose-500/30 font-bold py-2 rounded-xl text-xs transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}