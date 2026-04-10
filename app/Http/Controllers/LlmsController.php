<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;

class LlmsController extends Controller
{
    public function serve(string $path): Response
    {
        if (! str_ends_with($path, '.md') && ! str_ends_with($path, '.txt')) {
            $path = $path . '.md';
        }

        $filePath = 'llms/' . $path;

        if (! Storage::disk('local')->exists($filePath)) {
            abort(404, "File not found: {$path}");
        }

        $content = Storage::disk('local')->get($filePath);

        return response($content, 200, [
            'Content-Type' => 'text/plain; charset=utf-8',
            'Cache-Control' => 'public, max-age=3600',
        ]);
    }
}
