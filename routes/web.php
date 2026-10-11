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

// Home page route
Route::get('/', function () {
    $allProducts = Product::with('category')->inRandomOrder()->paginate(20);
    
    $ignoredCategories = [
        'Electronics', 
        'Gaming Peripherals', 
        'Smart Wearables'
    ];
    
    $allowedCategories = Category::whereNotIn('name', $ignoredCategories)->get();

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'products' => $allProducts,
        'categories' => $allowedCategories,
    ]);
})->name('home');

// View single product
Route::get('/products/{id}', function ($id) {
    $singleProduct = Product::with('category')->findOrFail($id);
    
    return Inertia::render('Products/Show', [
        'product' => $singleProduct,
    ]);
})->name('products.show');

// Static info pages
Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('Contact');
})->name('contact');

Route::get('/shipping-policy', function () {
    return Inertia::render('ShippingPolicy');
})->name('shipping.policy');

Route::get('/policy', function () {
    return Inertia::render('Policy');
})->name('policy');


// Protected routes for logged in users and admin
Route::middleware(['auth'])->group(function () {

    // User dashboard order history
    Route::get('/account', function () {
        $userId = auth()->id();
        $userOrders = Order::with('items.product')
            ->where('user_id', $userId)
            ->latest()
            ->get();

        return Inertia::render('Account', [
            'orders' => $userOrders,
        ]);
    })->name('account');

    // Checkout page
    Route::get('/checkout', function () {
        return Inertia::render('Checkout');
    })->name('checkout');

    Route::post('/orders', [OrderController::class, 'store'])->name('orders.store');

    // Cancel my order
    Route::patch('/orders/{order}/cancel', function (Order $order) {
        if ($order->user_id !== auth()->id()) {
            abort(403, 'Not allowed.');
        }

        if ($order->status !== 'pending') {
            return back()->with('error', 'Only pending orders can be cancelled.');
        }

        $order->update(['status' => 'cancelled']);
        return back()->with('success', 'Order cancelled.');
    })->name('orders.cancel');

    // Admin Panel Route
    Route::get('/dashboard', function () {
        $adminEmail = 'anees12345@gmail.com';
        
        if (auth()->user()->email !== $adminEmail) {
            return redirect()->route('home');
        }

        $allProductsAdmin = Product::with('category')->latest()->get();
        $allCategoriesAdmin = Category::all();
        $allOrdersAdmin = Order::with(['user', 'items.product'])->latest()->get();

        return Inertia::render('Dashboard', [
            'products'   => $allProductsAdmin,
            'categories' => $allCategoriesAdmin,
            'orders'     => $allOrdersAdmin,
        ]);
    })->name('dashboard');

    // Update order status (Admin)
    Route::patch('/admin/orders/{order}/status', function (Request $request, Order $order) {
        $adminEmail = 'anees12345@gmail.com';
        if (auth()->user()->email !== $adminEmail) {
            abort(403, 'Unauthorized.');
        }
        
        return app(OrderController::class)->updateStatus($request, $order);
    })->name('admin.orders.status');

    // Delete order (Admin)
    Route::delete('/admin/orders/{order}', function (Order $order) {
        $adminEmail = 'anees12345@gmail.com';
        if (auth()->user()->email !== $adminEmail) {
            abort(403, 'Unauthorized.');
        }

        $order->delete();
        return back()->with('success', 'Order deleted.');
    })->name('admin.orders.destroy');

    // Add new product (Admin)
    Route::post('/products', function (Request $request) {
        $adminEmail = 'anees12345@gmail.com';
        if (auth()->user()->email !== $adminEmail) {
            abort(403, 'Unauthorized.');
        }

        $formFields = $request->validate([
            'title'       => 'required|string|max:255',
            'price'       => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image'       => 'required|image|mimes:jpeg,png,jpg,webp,gif|max:5048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image')->store('products', 'public');
            $imagePath = '/storage/' . $uploadedFile;
        }

        Product::create([
            'title'       => $formFields['title'],
            'slug'        => Str::slug($formFields['title']) . '-' . time(),
            'price'       => $formFields['price'],
            'category_id' => $formFields['category_id'],
            'description' => $formFields['description'] ?? null,
            'image'       => $imagePath,
        ]);

        return back()->with('success', 'Product added successfully.');
    })->name('products.store');

    // Edit product (Admin)
    Route::put('/products/{product}', function (Request $request, Product $product) {
        $adminEmail = 'anees12345@gmail.com';
        if (auth()->user()->email !== $adminEmail) {
            abort(403, 'Unauthorized.');
        }

        $formFields = $request->validate([
            'title'       => 'required|string|max:255',
            'price'       => 'required|numeric',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'image'       => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:5048',
        ]);

        $updateData = [
            'title'       => $formFields['title'],
            'slug'        => Str::slug($formFields['title']) . '-' . time(),
            'price'       => $formFields['price'],
            'category_id' => $formFields['category_id'],
            'description' => $formFields['description'] ?? null,
        ];

        if ($request->hasFile('image')) {
            $uploadedFile = $request->file('image')->store('products', 'public');
            $updateData['image'] = '/storage/' . $uploadedFile;
        }

        $product->update($updateData);

        return back()->with('success', 'Product updated successfully.');
    })->name('products.update');

    // Delete product (Admin)
    Route::delete('/products/{product}', function (Product $product) {
        $adminEmail = 'anees12345@gmail.com';
        if (auth()->user()->email !== $adminEmail) {
            abort(403, 'Unauthorized.');
        }
        
        $product->delete();
        return back()->with('success', 'Product deleted.');
    })->name('products.destroy');

    // User Profile Routes
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';