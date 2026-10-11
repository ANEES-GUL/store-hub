import React, { useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';

export default function Dashboard({ auth, products = [], categories = [], orders = [] }) {
    const [activeTab, setActiveTab] = useState('orders');
    const [orderFilter, setOrderFilter] = useState('all');
    const [imagePreview, setImagePreview] = useState(null);
    const [editingProduct, setEditingProduct] = useState(null);

    // Form handling with Inertia
    const { data, setData, post, processing, reset } = useForm({
        title: '',
        price: '',
        description: '',
        category_id: categories.length > 0 ? categories[0].id : '',
        image: null,
    });

    // Handle image file selection
    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    // Submit form for adding or updating products
    function handleSubmitProduct(e) {
        e.preventDefault();

        if (editingProduct) {
            router.post('/products/' + editingProduct.id, {
                _method: 'put',
                ...data,
            }, {
                onSuccess: () => cancelEdit(),
                preserveScroll: true,
            });
        } else {
            post('/products', {
                onSuccess: () => {
                    reset();
                    setImagePreview(null);
                },
                preserveScroll: true,
            });
        }
    }

    // Start editing a product
    function startEdit(product) {
        setEditingProduct(product);
        setData({
            title: product.title,
            price: product.price,
            description: product.description || '',
            category_id: product.category_id || (categories[0] ? categories[0].id : ''),
            image: null,
        });
        setImagePreview(product.image || null);
    }

    // Cancel edit mode
    function cancelEdit() {
        setEditingProduct(null);
        reset();
        setImagePreview(null);
    }

    // Update order status
    function handleStatusUpdate(orderId, newStatus) {
        router.patch('/admin/orders/' + orderId + '/status', { status: newStatus }, {
            preserveScroll: true,
        });
    }

    // Delete order
    function handleClearOrder(orderId) {
        if (confirm('Delete this order?')) {
            router.delete('/admin/orders/' + orderId, { preserveScroll: true });
        }
    }

    // Delete product
    function handleDeleteProduct(productId) {
        if (confirm('Delete this product?')) {
            router.delete('/products/' + productId, { preserveScroll: true });
        }
    }

    // Filter orders using basic javascript filter
    const displayedOrders = orders.filter(order => {
        if (orderFilter === 'active') return order.status !== 'completed';
        if (orderFilter === 'completed') return order.status === 'completed';
        return true;
    });

    // Calculate totals simply
    const completedOrders = orders.filter(o => o.status === 'completed');
    const totalSales = completedOrders.reduce((sum, o) => sum + Number(o.total || 0), 0);
    const activeCount = orders.filter(o => o.status !== 'completed').length;

    return (
        <div className="min-h-screen bg-slate-900 text-white p-6">
            <Head title="Admin Dashboard" />
            <Background3D />

            {/* Header */}
            <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                <h1 className="text-2xl font-bold">StoreHub Admin Dashboard</h1>
                <Link href="/" className="text-blue-400 hover:underline">Back to Store</Link>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-6">
                <button 
                    onClick={() => setActiveTab('orders')} 
                    className={`px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-blue-600' : 'bg-slate-800'}`}
                >
                    Orders ({orders.length})
                </button>
                <button 
                    onClick={() => setActiveTab('products')} 
                    className={`px-4 py-2 rounded ${activeTab === 'products' ? 'bg-blue-600' : 'bg-slate-800'}`}
                >
                    Products ({products.length})
                </button>
            </div>

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
                <div>
                    <p className="mb-4 text-slate-300">Total Sales: ${totalSales.toFixed(2)}</p>
                    
                    <div className="flex gap-2 mb-4">
                        <button onClick={() => setOrderFilter('all')} className="px-3 py-1 bg-slate-800 rounded">All</button>
                        <button onClick={() => setOrderFilter('active')} className="px-3 py-1 bg-slate-800 rounded">Active ({activeCount})</button>
                        <button onClick={() => setOrderFilter('completed')} className="px-3 py-1 bg-slate-800 rounded">Completed ({completedOrders.length})</button>
                    </div>

                    <div className="space-y-4">
                        {displayedOrders.map(order => (
                            <div key={order.id} className="bg-slate-800 p-4 rounded flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold">Order #{order.id} - Status: {order.status}</h3>
                                    <p className="text-sm text-slate-300">Total: ${order.total}</p>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => handleStatusUpdate(order.id, 'completed')} className="px-3 py-1 bg-green-600 text-sm rounded">Complete</button>
                                    <button onClick={() => handleClearOrder(order.id)} className="px-3 py-1 bg-red-600 text-sm rounded">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
                <div>
                    {/* Product Form */}
                    <form onSubmit={handleSubmitProduct} className="bg-slate-800 p-6 rounded mb-8 space-y-4">
                        <h2 className="text-xl font-bold">{editingProduct ? 'Edit Product' : 'Add New Product'}</h2>
                        
                        <div>
                            <label className="block text-sm mb-1">Title</label>
                            <input 
                                type="text" 
                                value={data.title} 
                                onChange={e => setData('title', e.target.value)} 
                                className="w-full p-2 bg-slate-900 rounded border border-slate-700" 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Price</label>
                            <input 
                                type="number" 
                                step="0.01" 
                                value={data.price} 
                                onChange={e => setData('price', e.target.value)} 
                                className="w-full p-2 bg-slate-900 rounded border border-slate-700" 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Category</label>
                            <select 
                                value={data.category_id} 
                                onChange={e => setData('category_id', e.target.value)} 
                                className="w-full p-2 bg-slate-900 rounded border border-slate-700"
                            >
                                {categories.map(c => (
                                    <option key={c.id} value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm mb-1">Product Image</label>
                            <input type="file" onChange={handleImageChange} className="w-full text-sm" />
                        </div>

                        {imagePreview && <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded" />}

                        <div>
                            <label className="block text-sm mb-1">Description</label>
                            <textarea 
                                value={data.description} 
                                onChange={e => setData('description', e.target.value)} 
                                className="w-full p-2 bg-slate-900 rounded border border-slate-700"
                            ></textarea>
                        </div>

                        <div className="flex gap-2">
                            <button type="submit" disabled={processing} className="px-4 py-2 bg-blue-600 rounded font-bold">
                                {editingProduct ? 'Update Product' : 'Save Product'}
                            </button>
                            {editingProduct && (
                                <button type="button" onClick={cancelEdit} className="px-4 py-2 bg-gray-600 rounded">Cancel</button>
                            )}
                        </div>
                    </form>

                    {/* Product List */}
                    <div className="grid grid-cols-4 gap-4">
                        {products.map(product => (
                            <div key={product.id} className="bg-slate-800 p-4 rounded flex flex-col justify-between">
                                <div>
                                    <img src={product.image || 'https://via.placeholder.com/150'} alt="" className="w-full h-32 object-cover rounded mb-2" />
                                    <h3 className="font-bold">{product.title}</h3>
                                    <p className="text-blue-400">${product.price}</p>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    <button onClick={() => startEdit(product)} className="flex-1 py-1 bg-yellow-600 rounded text-sm">Edit</button>
                                    <button onClick={() => handleDeleteProduct(product.id)} className="flex-1 py-1 bg-red-600 rounded text-sm">Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}