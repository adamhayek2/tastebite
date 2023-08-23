<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;
use App\Models\Ingredient;
use Auth;

class RecipeController extends Controller
{
    public function create(Request $request) {

        try {
            $user = Auth::user();
            
            // Validate the input data
            $request->validate([
                'name' => 'required|string',
                'cuisine' => 'required|string',
                'ingredients' => 'required|array',
                'ingredients.*.name' => 'required|string',
                'ingredients.*.quantity' => 'required|string',
                'picture' => 'required|string',
            ]);
    
            $recipe = new Recipe([
                'user_id' => $user->id,
                'name' => $request->name,
                'cuisine' => $request->cuisine,
            ]);
            
            if (!$recipe->save()) {
                throw new \Exception("Recipe could not be saved.");
            }

            foreach ($request->ingredients as $ingredientData) {
                $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);
                $recipe->ingredients()->attach($ingredient->id, ['quantity' => $ingredientData['quantity']]);
            }

            $image = $recipe->image()->create([
                'path' => $request->picture,
            ]);
            
            if (!$image) {
                throw new \Exception("Image record could not be created.");
            }
    
            return response()->json([
                "status" => "success", 
                "data" => $recipe
            ]);
    
        } catch (\Exception $e) {
            return response()->json([
                "status" => "error", 
                "message" => $e->getMessage()
            ], 500);
        }
    }
}