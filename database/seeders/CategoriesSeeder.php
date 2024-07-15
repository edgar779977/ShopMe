<?php

// database/seeders/CategoriesSeeder.php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    public function run()
    {
        Category::factory()->create([
            'name' => 'Electronics',
            'parent_id' => null,
        ]);

        Category::factory()->create([
            'name' => 'TV',
            'parent_id' => 1,
        ]);

        Category::factory()->create([
            'name' => 'Smart',
            'parent_id' => 2,
        ]);

        Category::factory()->create([
            'name' => 'Phone',
            'parent_id' => 1,
        ]);

        Category::factory()->create([
            'name' => 'Android',
            'parent_id' => 2,
        ]);
    }
}

