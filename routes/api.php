<?php

use Illuminate\Support\Facades\Route;

Route::prefix('designer')->group(function () {

    Route::get('/license/restore', function () {
        return response()->json([
            'valid' => false,
            'csrfToken' => csrf_token(),
            'themeLimit' => 0,
        ]);
    });

});