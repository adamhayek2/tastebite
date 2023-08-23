<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;
use App\Models\Ingredient;
use App\Models\Like;
use App\Models\Comment;
use Auth;

class RecipeController extends Controller
{
    public function create(Request $request) {

        try {
            $user = Auth::user();

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

    public function feed() {
        $latestRecipes  = Recipe::latest()->take(16)->get();
        
        if(!$latestRecipes ){
            return response()->json([
                "status" => "success", 
                "message" => "No recipies are added yet, would you like to be the firs on?"
            ]);
        }
        return response()->json([
            "status" => "success", 
            "data" => $randomRecipes
        ]);
    }

    public function singleRecipe(Recipe $recipe) {
        if (!$recipe) {
            return response()->json(['message' => 'Recipe not found'], 404);
        }

        try {
            $recipe->load('ingredients', 'likes', 'comments.user');
            
            return response()->json($recipe);
        } catch (\Exception $e) {
            return response()->json(['message' => 'An error occurred'], 500);
        }
    }

    public function likeRecipe(Recipe $recipe) {
        $user = Auth::user()->id;

        if ($recipe->likes()->where('user_id', $user)->exists()) {
            return response()->json(['message' => 'Recipe already liked'], 400);
        }

        $like = new Like(['user_id' => $user]);
        $recipe->likes()->save($like);

        return response()->json([
            "status" => "Recipe liked",
        ],201);
    }

    public function addComment(Request $request, Recipe $recipe) {
        $user = Auth::user()->id;
        $request->validate([
            'comment' => 'required|string',
        ]);

        $comment = new Comment([
            'user_id' => $user,
            'recipe' => $recipe,
            'comment' => $request->comment,
        ]);

        $recipe->comments()->save($comment);

        return response()->json([
            "status" => "Comment added",
        ],201);
    }
}