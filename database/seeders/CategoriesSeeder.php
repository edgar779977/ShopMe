<?php

// database/seeders/CategoriesSeeder.php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategoriesSeeder extends Seeder
{
    public function run()
    {
        // Create parent categories
        $electronics = Category::factory()->create([
            'name' => 'Electronics',
            'parent_id' => null,
        ]);

        $vehicles = Category::factory()->create([
            'name' => 'Vehicles',
            'parent_id' => null,
        ]);

        $homeAndGarden = Category::factory()->create([
            'name' => 'Home and Garden',
            'parent_id' => null,
        ]);

        $foodAndBeverages = Category::factory()->create([
            'name' => 'Food and Beverages',
            'parent_id' => null,
        ]);

        // Create subcategories for Electronics
        $tv = Category::factory()->create([
            'name' => 'TV',
            'parent_id' => $electronics->id,
        ]);

        $smart = Category::factory()->create([
            'name' => 'Smart TV',
            'parent_id' => $tv->id,
        ]);

        $phone = Category::factory()->create([
            'name' => 'Phone',
            'parent_id' => $electronics->id,
        ]);

        $android = Category::factory()->create([
            'name' => 'Android Phone',
            'parent_id' => $phone->id,
        ]);

        $laptop = Category::factory()->create([
            'name' => 'Laptop',
            'parent_id' => $electronics->id,
        ]);

        $gamingLaptop = Category::factory()->create([
            'name' => 'Gaming Laptop',
            'parent_id' => $laptop->id,
        ]);

        // Create subcategories for Vehicles
        $cars = Category::factory()->create([
            'name' => 'Cars',
            'parent_id' => $vehicles->id,
        ]);

        $motorcycles = Category::factory()->create([
            'name' => 'Motorcycles',
            'parent_id' => $vehicles->id,
        ]);

        $carParts = Category::factory()->create([
            'name' => 'Car Parts',
            'parent_id' => $vehicles->id,
        ]);

        $engines = Category::factory()->create([
            'name' => 'Engines',
            'parent_id' => $carParts->id,
        ]);

        $tires = Category::factory()->create([
            'name' => 'Tires',
            'parent_id' => $carParts->id,
        ]);

        // Create subcategories for Home and Garden
        $furniture = Category::factory()->create([
            'name' => 'Furniture',
            'parent_id' => $homeAndGarden->id,
        ]);

        $sofa = Category::factory()->create([
            'name' => 'Sofa',
            'parent_id' => $furniture->id,
        ]);

        $bed = Category::factory()->create([
            'name' => 'Bed',
            'parent_id' => $furniture->id,
        ]);

        $garden = Category::factory()->create([
            'name' => 'Garden',
            'parent_id' => $homeAndGarden->id,
        ]);

        $tools = Category::factory()->create([
            'name' => 'Tools',
            'parent_id' => $garden->id,
        ]);

        $planters = Category::factory()->create([
            'name' => 'Planters',
            'parent_id' => $garden->id,
        ]);

        // Create subcategories for Food and Beverages
        $snacks = Category::factory()->create([
            'name' => 'Snacks',
            'parent_id' => $foodAndBeverages->id,
        ]);

        $beverages = Category::factory()->create([
            'name' => 'Beverages',
            'parent_id' => $foodAndBeverages->id,
        ]);

        $fruitJuices = Category::factory()->create([
            'name' => 'Fruit Juices',
            'parent_id' => $beverages->id,
        ]);

        $sodas = Category::factory()->create([
            'name' => 'Sodas',
            'parent_id' => $beverages->id,
        ]);

        $candy = Category::factory()->create([
            'name' => 'Candy',
            'parent_id' => $snacks->id,
        ]);

        $chips = Category::factory()->create([
            'name' => 'Chips',
            'parent_id' => $snacks->id,
        ]);
    }
}


