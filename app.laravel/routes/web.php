<?php

use App\Http\Controllers\LlmsController;
use Illuminate\Support\Facades\Route;

// LLM documentation endpoint (serves raw markdown files)
Route::get('/llms/{path}', [LlmsController::class, 'serve'])
    ->where('path', '.*\.(md|txt)');

// Serve the Vue SPA for all other routes
Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');
