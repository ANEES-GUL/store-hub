import React, { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import Background3D from '@/Components/Background3D';
import '../../css/welcome.css';

export default function Welcome({
    auth,
    products = { data: [], links: [] },
    categories = [],
}) {
    // ---------------------------
    // states
   
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    
    // admin email (only this user can see the dashboard button)
   
    const adminEmail = 'anees12345@gmail.com';

    
    // get products list and pagination links from the paginated object
    
    const productList = products.data || [];
    const paginationLinks = products.links || [];

    
    // load cart from localStorage when page opens
    
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('store_cart')) || [];
        setCart(saved);
    }, []);

    
    // save cart in state and localStorage
  
    const saveCart = (updatedCart) => {
        setCart(updatedCart);
        localStorage.setItem('store_cart', JSON.stringify(updatedCart));
    };

  
    // total items and subtotal
    
    const totalCartItems = cart.reduce((sum, item) => {
        return sum + item.quantity;
    }, 0);

    const subtotal = cart.reduce((sum, item) => {
        return sum + item.price * item.quantity;
    }, 0);

   
    // add product to cart and open the cart drawer
  
    const handleBuyNow = (e, product) => {
        e.preventDefault();
        e.stopPropagation();

        const existingIndex = cart.findIndex((item) => {
            return item.id === product.id;
        });

        let updatedCart;

        if (existingIndex > -1) {
           
            updatedCart = [...cart];

            updatedCart[existingIndex] = {
                ...updatedCart[existingIndex],
                quantity: updatedCart[existingIndex].quantity + 1,
            };
        } else {
           
            updatedCart = [
                ...cart,
                {
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                    quantity: 1,
                },
            ];
        }

        saveCart(updatedCart);
        setIsCartOpen(true);
    };

   
    
    const updateQuantity = (id, delta) => {
        const updated = cart
            .map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity + delta;

                    if (newQty > 0) {
                        return { ...item, quantity: newQty };
                    } else {
                        return null;
                    }
                }

                return item;
            })
            .filter(Boolean);

        saveCart(updated);
    };

    
    // scroll down to the catalog
   
    const scrollToCatalog = () => {
        const section = document.getElementById('catalog-section');

        section?.scrollIntoView({ behavior: 'smooth' });
    };

   
    // hide the electronics category
    
    const filteredCategories = categories.filter((c) => {
        return c.name.toLowerCase() !== 'electronics';
    });

  
    // filter products by selected category
    
    const filteredProducts = selectedCategory
        ? productList.filter((p) => {
              return (
                  p.category_id === selectedCategory ||
                  p.category?.id === selectedCategory
              );
          })
        : productList;

    // check if the logged in user is admin
    
    const isAdmin = auth?.user && auth.user.email === adminEmail;

    return (
        <div className="store-page">
            <Head title="StoreHub - Find Your Gear" />
            <Background3D />

            {/* HEADER / NAVBAR */}
            <header className="header">
                <div className="header-inner">
                    <div className="header-left">
                        <Link
                            href="/"
                            className="logo"
                        >
                            <div className="logo-box">
                                SH
                            </div>
                            <span>
                                Store
                                <span className="logo-gradient-text">
                                    Hub
                                </span>
                            </span>
                        </Link>

                        <nav className="nav-links">
                            <Link
                                href="/about"
                                className="nav-link"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="nav-link"
                            >
                                Contact Us
                            </Link>
                        </nav>
                    </div>

                    <div className="header-right">
                        {isAdmin && (
                            <Link
                                href="/dashboard"
                                className="admin-btn"
                            >
                                👑 Admin Dashboard
                            </Link>
                        )}

                        {/* cart button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="cart-btn"
                        >
                            <svg
                                className="cart-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                />
                            </svg>

                            {totalCartItems > 0 && (
                                <span className="cart-badge">
                                    {totalCartItems}
                                </span>
                            )}
                        </button>

                        {/* user menu (desktop) */}
                        <div className="desktop-user-area">
                            {auth?.user ? (
                                <div className="user-menu">
                                    <button className="user-btn">
                                        <svg
                                            className="user-icon"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                            />
                                        </svg>

                                        <span>
                                            Hi, {auth.user.name}
                                        </span>

                                        <svg
                                            className="arrow-icon"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    <div className="dropdown">
                                        <div className="dropdown-box">
                                            <Link
                                                href="/account"
                                                className="dropdown-link"
                                            >
                                                My Account
                                            </Link>

                                            {isAdmin && (
                                                <Link
                                                    href="/dashboard"
                                                    className="dropdown-link dropdown-admin"
                                                >
                                                    👑 Admin Dashboard
                                                </Link>
                                            )}

                                            <Link
                                                href="/logout"
                                                method="post"
                                                as="button"
                                                className="dropdown-link dropdown-logout"
                                            >
                                                Log Out
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="login-area">
                                    <Link
                                        href={route('login')}
                                        className="login-link"
                                    >
                                        Log In
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="signup-link"
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                        </div>

                        {/* hamburger button (mobile) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="menu-toggle"
                        >
                            <svg
                                className="menu-icon"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d={
                                        isMobileMenuOpen
                                            ? 'M6 18L18 6M6 6l12 12'
                                            : 'M4 6h16M4 12h16M4 18h16'
                                    }
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* MOBILE MENU */}
                {isMobileMenuOpen && (
                    <div className="mobile-menu">
                        <Link
                            href="/about"
                            className="mobile-link"
                        >
                            About Us
                        </Link>
                        <Link
                            href="/contact"
                            className="mobile-link"
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/shipping-policy"
                            className="mobile-link"
                        >
                            Shipping Policy
                        </Link>

                        {auth?.user ? (
                            <div className="mobile-user">
                                <span className="mobile-user-name">
                                    Logged in as {auth.user.name}
                                </span>

                                <Link
                                    href="/account"
                                    className="mobile-account"
                                >
                                    My Account
                                </Link>

                                {isAdmin && (
                                    <Link
                                        href="/dashboard"
                                        className="mobile-admin"
                                    >
                                        👑 Admin Dashboard
                                    </Link>
                                )}

                                <Link
                                    href="/logout"
                                    method="post"
                                    as="button"
                                    className="mobile-logout"
                                >
                                    Log Out
                                </Link>
                            </div>
                        ) : (
                            <div className="mobile-auth">
                                <Link
                                    href={route('login')}
                                    className="mobile-login"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="mobile-signup"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
                    </div>
                )}
            </header>

            <div className="content-wrap">
                {/* HERO SECTION */}
                <section className="hero">
                    <div className="hero-card">
                        <div className="glow-top-left" />
                        <div className="glow-bottom-right" />

                        <div className="hero-grid">
                            <div className="hero-text">
                                <div className="hero-badge">
                                    <span className="badge-dot"></span>
                                    Ultimate Performance Gear
                                </div>

                                <h1 className="hero-title">
                                    Power Your Setup With <br />
                                    <span className="hero-title-gradient">
                                        Futuristic Innovation.
                                    </span>
                                </h1>

                                <p className="hero-desc">
                                    Discover premium high-performance hardware,
                                    desktop computing, precision audio, and custom
                                    gear engineered to elevate your experience.
                                </p>

                                <div className="hero-buttons">
                                    <button
                                        onClick={scrollToCatalog}
                                        className="explore-btn"
                                    >
                                        <span>Explore Catalog</span>

                                        <svg
                                            className="arrow-svg"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2.5"
                                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div className="hero-image-box">
                                <div className="hero-image-card">
                                    <img
                                        src="https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1200&q=80"
                                        alt="Modern Gaming Setup"
                                        className="hero-image"
                                    />
                                    <div className="hero-image-fade"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CATEGORY BAR */}
                <div
                    id="catalog-section"
                    className="category-section"
                >
                    <div className="category-bar">
                        <button
                            onClick={() => setSelectedCategory(null)}
                            className={
                                selectedCategory === null
                                    ? 'category-btn category-btn-active'
                                    : 'category-btn'
                            }
                        >
                            All Products
                        </button>

                        {filteredCategories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={
                                    selectedCategory === cat.id
                                        ? 'category-btn category-btn-active'
                                        : 'category-btn'
                                }
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* PRODUCT GRID */}
                <main className="catalog">
                    {filteredProducts.length > 0 ? (
                        <div className="product-grid">
                            {filteredProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className="product-card"
                                >
                                    <div>
                                        <Link
                                            href={`/products/${product.id}`}
                                            className="product-image-link"
                                        >
                                            <img
                                                src={product.image || 'https://via.placeholder.com/300x200'}
                                                alt={product.title}
                                                className="product-image"
                                            />

                                            {product.category && (
                                                <span className="category-tag">
                                                    {product.category.name}
                                                </span>
                                            )}
                                        </Link>

                                        <div className="product-info">
                                            <Link href={`/products/${product.id}`}>
                                                <h3 className="product-title">
                                                    {product.title}
                                                </h3>
                                            </Link>

                                            <p className="product-desc">
                                                {product.description || 'No description provided.'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="product-bottom">
                                        <div className="price-row">
                                            <span className="product-price">
                                                ${product.price}
                                            </span>
                                        </div>

                                        <button
                                            onClick={(e) => handleBuyNow(e, product)}
                                            className="buy-btn"
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="no-products">
                            <p className="no-products-text">
                                No products found in this view.
                            </p>
                        </div>
                    )}

                    {/* PAGINATION NUMBERS1, 2, 3... */}
                    {paginationLinks.length > 3 && (
                        <div className="pagination">
                            {paginationLinks.map((link, idx) => {
                                // choose the style of the page button
                                let pageClass = 'page-link ';

                                if (link.active) {
                                    pageClass += 'page-active';
                                } else if (link.url) {
                                    pageClass += 'page-normal';
                                } else {
                                    pageClass += 'page-disabled';
                                }

                                return (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        preserveScroll
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={pageClass}
                                    />
                                );
                            })}
                        </div>
                    )}
                </main>
            </div>

            {/* FOOTER */}
            <footer className="footer">
                <div className="footer-inner">
                    <div className="footer-left">
                        <span className="footer-logo">
                            Store
                            <span className="footer-logo-hub">
                                Hub
                            </span>
                        </span>

                        <span className="footer-divider">
                            |
                        </span>

                        <div className="footer-links">
                            <Link
                                href="/about"
                                className="footer-link"
                            >
                                About Us
                            </Link>
                            <Link
                                href="/contact"
                                className="footer-link"
                            >
                                Contact Us
                            </Link>
                            <Link
                                href="/shipping-policy"
                                className="footer-link"
                            >
                                Shipping Policy
                            </Link>
                        </div>
                    </div>

                    <span className="copyright">
                        © {new Date().getFullYear()} StoreHub Inc. All rights reserved.
                    </span>
                </div>
            </footer>

            {/* CART DRAWER */}
            {isCartOpen && (
                <div className="cart-overlay">
                    <div
                        className="cart-backdrop"
                        onClick={() => setIsCartOpen(false)}
                    ></div>

                    <div className="cart-panel-wrap">
                        <div className="cart-panel">
                            <div>
                                <div className="cart-header">
                                    <h2 className="cart-title">
                                        Your Cart
                                    </h2>

                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="cart-close"
                                    >
                                        ✕
                                    </button>
                                </div>

                                {cart.length === 0 ? (
                                    <p className="cart-empty">
                                        Your cart is empty.
                                    </p>
                                ) : (
                                    <div className="cart-items">
                                        {cart.map((item) => (
                                            <div
                                                key={item.id}
                                                className="cart-item"
                                            >
                                                <img
                                                    src={item.image || 'https://via.placeholder.com/60'}
                                                    alt=""
                                                    className="cart-item-image"
                                                />

                                                <div className="cart-item-info">
                                                    <h4 className="cart-item-title">
                                                        {item.title}
                                                    </h4>
                                                    <p className="cart-item-price">
                                                        ${item.price}
                                                    </p>
                                                </div>

                                                <div className="qty-box">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, -1)}
                                                        className="qty-btn"
                                                    >
                                                        -
                                                    </button>

                                                    <span className="qty-number">
                                                        {item.quantity}
                                                    </span>

                                                    <button
                                                        onClick={() => updateQuantity(item.id, 1)}
                                                        className="qty-btn"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="cart-footer">
                                    <div className="subtotal-row">
                                        <span className="subtotal-label">
                                            Subtotal
                                        </span>
                                        <span className="subtotal-value">
                                            ${subtotal.toFixed(2)}
                                        </span>
                                    </div>

                                    <Link
                                        href="/checkout"
                                        className="checkout-btn"
                                    >
                                        Checkout →
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
