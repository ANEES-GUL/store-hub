<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display the store homepage with featured products and categories.
     */
    public function index(): Response
    {
        return Inertia::render('Welcome', [
            'featuredProducts' => Product::with('category')
                ->where('is_featured', true)
                ->take(6)
                ->get(),
            'categories' => Category::all(),
        ]);
    }

    /**
     * Display the full product catalog with optional category filtering.
     */
    public function catalog(Request $request): Response
    {
        $query = Product::with('category');

        if ($request->has('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        return Inertia::render('Products/Index', [
            'products' => $query->latest()->get(),
            'categories' => Category::all(),
            'selectedCategory' => $request->category,
        ]);
    }

    /**
     * Display a single product detail page.
     */
    public function show(string $slug): Response
    {
        $product = Product::with('category')
            ->where('slug', $slug)
            ->firstOrFail();

        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);
    }
}