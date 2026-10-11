<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Define Tech & Electronics categories
        $categories = [
            
            'Audio & Speakers',
            'Computing & Laptops',
            'Gaming Peripherals',
            'Smart Wearables',
            'Car Electronics',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate(
                ['name' => $category],
                ['slug' => Str::slug($category)]
            );
        }
    }
}