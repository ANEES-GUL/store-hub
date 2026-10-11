<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(Request $request): Response
    {
        $query = Product::with('category')->latest();

        if ($request->has('category') && $request->category !== 'all') {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        return Inertia::render('Welcome', [
            'products' => $query->get(),
            'categories' => Category::all(),
        ]);
    }

    public function show(Product $product): Response
    {
        $product->load('category');

        return Inertia::render('ProductShow', [
            'product' => $product,
        ]);
    }
}