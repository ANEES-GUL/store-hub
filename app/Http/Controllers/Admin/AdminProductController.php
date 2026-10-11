<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;


class AdminProductController extends Controller
{

    // dashboard with stats
    public function index()
    {

        return Inertia::render('Dashboard', [
            'products'   => Product::with('category')->latest()->get(),
            'categories' => Category::all(),
            'stats'      => [
                'totalProducts'       => Product::count(),
                'totalInventoryValue' => Product::selectRaw('SUM(price * stock) as total')->value('total') ?? 0,
                'totalCategories'     => Category::count(),
                'totalOrders'         => Order::count(),
            ],
        ]);

    }


    // add new product
    public function store(Request $request)
    {

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_featured' => 'nullable|boolean',
        ]);


        $validated['is_featured'] = $request->boolean( 'is_featured' );
        $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);


        if ($request->hasFile('image_file')) {

            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = Storage::url($path);

        }


        Product::create($validated);


        return redirect()->back()->with('message', 'Product added successfully!');

    }


    // update product
    public function update(Request $request, Product $product)
    {

        $validated = $request->validate([
            'title'       => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price'       => 'required|numeric|min:0',
            'stock'       => 'required|integer|min:0',
            'description' => 'nullable|string',
            'image_file'  => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
            'is_featured' => 'nullable|boolean',
        ]);


        $validated['is_featured'] = $request->boolean('is_featured');


        // new slug only if title changed
        if ($product->title !== $validated['title']) {

            $validated['slug'] = Str::slug($validated['title']) . '-' . Str::random(5);

        }


        if ($request->hasFile('image_file')) {

            $path = $request->file('image_file')->store('products', 'public');
            $validated['image'] = Storage::url($path);

        }


        $product->update($validated);


        return redirect()->back()->with('message', 'Product updated successfully!');

    }


    // delete product
    public function destroy(Product $product)
    {

        $product->delete();


        return redirect()->back()->with('message', 'Product deleted successfully!');

    }

}