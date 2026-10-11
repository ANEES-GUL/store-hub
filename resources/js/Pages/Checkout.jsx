import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';


export default function Checkout({ auth }) {
    const [cart, setCart] = useState([]);
    const [form, setForm] = useState({
        shipping_address: '',
        phone: '',
        payment_method: 'cod',
    });

    // get the cart from the browser
    useEffect(() => {

        const savedCart = JSON.parse(localStorage.getItem('store_cart')) || [];
        setCart(savedCart);
    }, []);
    // update form when user types
    function handleChange(e) {

        setForm({ ...form, [e.target.name]: e.target.value });

    }
    // + and - buttons
    function updateQuantity(id, change) {

        const updatedCart = [];
        for (let i = 0; i < cart.length; i++) {

            const item = cart[i];

            if (item.id === id) {

                const newQty = item.quantity + change;
                // remove the item if quantity becomes 0
                if (newQty > 0) {
                    updatedCart.push({ ...item, quantity: newQty });
                }
            } else {
                updatedCart.push(item);
            }
        }
        setCart(updatedCart);
        localStorage.setItem('store_cart', JSON.stringify(updatedCart));

    }



    // total price
    let subtotal = 0;

    for (let i = 0; i < cart.length; i++) {

        subtotal = subtotal + cart[i].price * cart[i].quantity;

    }

    function getPaymentClass(method) {

        if (form.payment_method === method) {
            return 'border rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition border-indigo-500 bg-indigo-500/10';
        }

        return 'border rounded-2xl p-4 flex items-center gap-3 cursor-pointer transition border-slate-800 bg-slate-950';
    }
    function handleSubmit(e) {
        e.preventDefault();

        router.post('/orders', {
            items: cart,
            shipping_address: form.shipping_address,
            phone: form.phone,
            payment_method: form.payment_method,
        }, {
            onSuccess: () => {
                localStorage.removeItem('store_cart');
            }
        });

    }
    return (
        <div className="min-h-screen bg-transparent text-slate-100 font-sans relative selection:bg-indigo-500">

            <Head title="Secure Checkout - StoreHub" />
            <Background3D />
            <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link href="/" className="text-2xl font-black text-white">Store<span className="text-indigo-400">Hub</span></Link>
                    <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white transition">← Continue Shopping</Link>

                </div>

            </header>


            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">

                <h1 className="text-3xl font-black text-white mb-8 tracking-tight">Secure Checkout Journey</h1>
                {cart.length === 0 ? (
                    <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-12 text-center shadow-xl">

                        <p className="text-slate-300 mb-6 font-medium">Your shopping bag is empty.</p>

                        <Link href="/" className="inline-block bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-8 py-3 rounded-xl text-xs transition shadow-lg shadow-indigo-600/30">
                            Explore Catalog
                        </Link>
                    </div>

                ) : (

                    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* address and payment */}
                        <div className="lg:col-span-2 space-y-6">

                            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-xl">
                                <h2 className="text-lg font-bold text-white mb-4">1. Shipping Address & Contact</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Delivery Address</label>

                                        <input
                                            type="text"
                                            name="shipping_address"
                                            required
                                            value={form.shipping_address}
                                            onChange={handleChange}
                                            placeholder="Street address, apartment, city"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Phone Number</label>

                                        <input
                                            type="text"
                                            name="phone"
                                            required
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="+92 300 0000000"
                                            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-indigo-500 transition"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-xl">

                                <h2 className="text-lg font-bold text-white mb-4">2. Select Payment Method</h2>


                                <div className="grid grid-cols-2 gap-4">

                                    <label className={getPaymentClass('cod')}>

                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="cod"
                                            checked={form.payment_method === 'cod'}
                                            onChange={handleChange}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />

                                        <div>
                                            <p className="font-bold text-white text-sm">Cash on Delivery</p>
                                            <p className="text-xs text-slate-400">Pay when you receive</p>
                                        </div>

                                    </label>
                                    <label className={getPaymentClass('card')}>

                                        <input
                                            type="radio"
                                            name="payment_method"
                                            value="card"
                                            checked={form.payment_method === 'card'}
                                            onChange={handleChange}
                                            className="text-indigo-600 focus:ring-indigo-500"
                                        />

                                        <div>
                                            <p className="font-bold text-white text-sm">Credit / Debit Card</p>
                                            <p className="text-xs text-slate-400">Secure online payment</p>
                                        </div>

                                    </label>
                                </div>
                            </div>
                        </div>


                        {/* order summary */}
                        <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 h-fit shadow-xl space-y-6">

                            <h2 className="text-lg font-bold text-white">Order Summary</h2>


                            <div className="divide-y divide-slate-800 max-h-60 overflow-y-auto pr-2">

                                {cart.map(item => (

                                    <div key={item.id} className="py-3 flex items-center justify-between gap-4">

                                        <div>
                                            <h4 className="font-bold text-xs text-white">{item.title}</h4>
                                            <p className="text-[10px] text-slate-400">${item.price} × {item.quantity}</p>
                                        </div>


                                        <div className="flex items-center gap-2">

                                            <button type="button" onClick={() => updateQuantity(item.id, -1)} className="px-2 bg-slate-800 rounded text-xs">-</button>

                                            <span className="text-xs font-bold">{item.quantity}</span>

                                            <button type="button" onClick={() => updateQuantity(item.id, 1)} className="px-2 bg-slate-800 rounded text-xs">+</button>

                                        </div>
                                    </div>
                                ))}
                            </div>


                            <div className="pt-4 border-t border-slate-800 space-y-2">

                                <div className="flex justify-between text-sm text-slate-400">
                                    <span>Subtotal</span>
                                    <span className="font-bold text-white">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm text-slate-400">
                                    <span>Shipping</span>
                                    <span className="text-emerald-400 font-bold">Free</span>
                                </div>

                                <div className="flex justify-between text-lg font-black text-white pt-2 border-t border-slate-800">
                                    <span>Total</span>
                                    <span className="text-indigo-400">${subtotal.toFixed(2)}</span>
                                </div>


                            </div>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold py-4 rounded-2xl text-xs uppercase tracking-wider shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
                            >
                                Place Order Now
                            </button>
                        </div>
                    </form>
                )}

            </main>
        </div>
    );

}
