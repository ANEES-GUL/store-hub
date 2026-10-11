<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;


class ProductController extends Controller
{

    public function index()
    {

        $featuredProducts = Product::with('category')
            ->where('is_featured', true)
            ->take(6)
            ->get();


        $categories = Category::all();


        return Inertia::render('Welcome', [
            'featuredProducts' => $featuredProducts,
            'categories'       => $categories,
        ]);

    }


    public function catalog(Request $request)
    {

        $category = $request->category;


        $query = Product::with('category');


        if ($category) {

            $query->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            });

        }


        $products   = $query->latest()->get();
        $categories = Category::all();


        return Inertia::render('Products/Index', [
            'products'         => $products,
            'categories'       => $categories,
            'selectedCategory' => $category,
        ]);

    }


    public function show($slug)
    {

        $product = Product::with('category')
            ->where('slug', $slug)
            ->firstOrFail();


        return Inertia::render('Products/Show', [
            'product' => $product,
        ]);

    }

}