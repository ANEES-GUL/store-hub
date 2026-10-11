<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\OrderController;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Str;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Storefront Routes
|--------------------------------------------------------------------------
*/

// Home / Catalog Storefront Page (Shows 5 rows = 20 products per page)
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => Product::with('category')->inRandomOrder()->paginate(20),
        'categories' => Category::whereNotIn('name', [
            'Electronics', 
            'Gaming Peripherals', 
            'Smart Wearables'
        ])->get(),
    ]);
})->name('home');

// Single Product Details Page
Route::get('/products/{id}', function ($id) {
    $product = Product::with('category')->findOrFail($id);
    return Inertia::render('Products/Show', [
        'product' => $product,
    ]);
})->name('products.show');

// About Us Page
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

// Contact Us Page
Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

// Shipping Policy Page
Route::get('/shipping-policy', function () {
    return Inertia::render('ShippingPolicy');
})->name('shipping.policy');

// Store Policy & Terms Page
Route::get('/policy', function () {
    return Inertia::render('Policy');
})->name('policy');

/*
|--------------------------------------------------------------------------
| Authenticated User & Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth'])->group(function () {
    // User Account Page (Order History)
    Route::get('/account', function () {
        return Inertia::render('Account', [
            'orders' => Order::with('items.product')
                ->where('user_id', auth()->id())
                ->latest()
                ->get(),
        ]);
    })->name('account');

    // Checkout Page & Order Creation
    Route::get('/checkout', function () {
        return Inertia::render('Checkout');
    })->name('checkout');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

    // User Cancel Order Endpoint
    Route::patch('/orders/{order}/cancel', function (Order $order) {
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Unauthorized action.');
        }

        if ($order->status !== 'pending') {
            return back()->with('error', 'Only pending orders can be cancelled.');
        }

        $order->update(['status' => 'cancelled']);
        return back()->with('success', 'Order cancelled successfully.');
    })->name('orders.cancel');

    // Protected Admin Dashboard Route
    Route::get('/dashboard', function () {
        if (auth()->user()->email !== 'anees12345@gmail.com') {
            return redirect()->route('home');
        }

        return Inertia::render('Dashboard', [
            'products'   => Product::with('category')->latest()->get(),
            'categories' => Category::all(),
            'orders'     => Order::with(['user', 'items.product'])->latest()->get(),
        ]);
    })->name('dashboard');

    // Admin Order Status Update
    Route::patch('/admin/orders/{order}/status', function (Request $request, Order $order) {
        if (auth()->user()->email !== 'anees12345@gmail.com') {
            abort(403, 'Unauthorized access.');
        }
        return app(OrderController::class)->updateStatus($request, $order);
    })->name('admin.orders.status');

    // Admin Delete / Clear Order Endpoint
    Route::delete('/admin/orders/{order}', function (Order $order) {
        if (auth()->user()->email !== 'anees12345@gmail.com') {
            abort(403, 'Unauthorized access.');
        }

        $order->delete();
        return back()->with('success', 'Order cleared successfully.');
    })->name('admin.orders.destroy');

    // Admin Create Product with File Upload from Folder
    Route::post('/products', function (Request $request) {
        if (auth()->user()->email !== 'anees12345@gmail.com') {
            abort(403, 'Unauthorized access.');
        }

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'price'       => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image'       => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $imagePath = '/storage/' . $path;
        }

        Product::create([
            'title'       => $validated['title'],
            'slug'        => Str::slug($validated['title']) . '-' . time(),
            'price'       => $validated['price'],
            'category_id' => $validated['category_id'],
            'description' => $validated['description'] ?? null,
            'image'       => $imagePath,
        ]);

        return back()->with('success', 'Product created successfully.');
    })->name('products.store');

    // Admin Update (Edit) Product Endpoint
    Route::put('/products/{product}', function (Request $request, Product $product) {
        if (auth()->user()->email !== 'anees12345@gmail.com') {
            abort(403, 'Unauthorized access.');
        }

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'price'       => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5048',
        ]);

        $updateData = [
            'title'       => $validated['title'],
            'slug'        => Str::slug($validated['title']) . '-' . time(),
            'price'       => $validated['price'],
            'category_id' => $validated['category_id'],
            'description' => $validated['description'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('products', 'public');
            $updateData['image'] = '/storage/' . $path;
        }

        $product->update($updateData);

        return back()->with('success', 'Product updated successfully.');
    })->name('products.update');

    // Admin Delete Product Endpoint
    Route::delete('/products/{product}', function (Product $product) {
        if (auth()->user()->email !== 'anees12345@gmail.com') {
            abort(403, 'Unauthorized access.');
        }
        
        $product->delete();
        return back()->with('success', 'Product deleted successfully.');
    })->name('products.destroy');

    // Profile Management
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';