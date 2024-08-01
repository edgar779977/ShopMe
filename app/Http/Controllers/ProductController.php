<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class ProductController extends Controller
{


    public function index ()

    {
        $category = Category::with('subCategories')->get();

        return response()->json([
            'success'=>1,
            'product'=>$category
        ],200);
    }

}
