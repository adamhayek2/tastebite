<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RecipeController;
use App\Http\Controllers\ShoppingListController;



Route::group(["prefix" => "guest"], function() {
    Route::get('unauthorized', [AuthController::class, 'unauthorized']) -> name("unauthorized");
    Route::post('login', [AuthController::class,'login']);
    Route::post('register', [AuthController::class,'register']);
});


Route::group(["middleware" => "auth:api"], function() {
    Route::group(["prefix" => "user"], function () {
        Route::post('logout', [AuthController::class,'logout']);
        Route::post('refresh', [AuthController::class,'refresh']);
    }); 

    Route::group(["prefix" => "recipes"], function () {
        Route::post('/create', [RecipeController::class,'create']);
        Route::get('/feed', [RecipeController::class,'feed']);
        Route::get('/singleRecipe/{recipe}', [RecipeController::class,'singleRecipe']);
        Route::post('/addlike/{recipe}', [RecipeController::class,'likeRecipe']);
        Route::post('/addComment/{recipe}', [RecipeController::class,'addComment']);
        Route::get('/search', [RecipeController::class,'search']);
    }); 

    Route::group(["prefix" => "shoppingList"], function () {
        Route::post('/create', [ShoppingListController::class,'create']);
        Route::get('/getall', [ShoppingListController::class,'getAll']);
    }); 
});