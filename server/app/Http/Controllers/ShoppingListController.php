<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShoppingList;
use App\Models\ShoppingListItem;
use App\Models\User;
use App\Models\Recipe;
use App\Models\Ingredient;
use Auth;

class ShoppingListController extends Controller
{
    public function create(Request $request) {
        $user = Auth::user()->id;
        $request->validate([
            'name' => 'required|string',
            'ingredients' => 'required|array',
            'ingredients.*.name' => 'required|string',
            'ingredients.*.quantity' => 'required|string',
        ]);

        $shoppingList = new ShoppingList([
            'name' => $request->name,
            'user_id' => $user,
        ]);
        $shoppingList->save();

        foreach ($request->ingredients as $ingredientData) {
            $ingredient = Ingredient::firstOrCreate(['name' => $ingredientData['name']]);
            $shoppingList->ingredients()->attach($ingredient->id, ['quantity' => $ingredientData['quantity']]);
        }

        return response()->json([
            "status" => "added to shopping list successfully", 
        ],201);
    }
    public function getAll() {
        $user = Auth::user()->id;
        $AllLists  = ShoppingList::where('user_id', $user)
                    ->with('items')
                    ->get();
        
        if(!$AllLists ){
            return response()->json([
                "status" => "success", 
                "message" => "No Lists to show"
            ]);
        }
        return response()->json([
            "status" => "success", 
            "data" => $AllLists
        ]);
    }
}

