<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ChatController;

Route::get('/', function () {
    return Inertia::render('Chat');
})->name('Chat');

Route::get('/chat', [ChatController::class, 'index']);

Route::post('/send-message', [ChatController::class, 'sendMessage']);
