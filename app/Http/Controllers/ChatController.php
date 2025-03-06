<?php

namespace App\Http\Controllers;

use App\Events\MessageSent;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ChatController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Chat');
    }

    public function sendMessage(Request $request)
    {
        $message = $request->input('message');

        // イベントをブロードキャスト
        broadcast(new MessageSent($message))->toOthers();

        return response()->json(['message' => 'Message sent']);
    }
}