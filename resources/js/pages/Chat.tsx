import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import { router } from "@inertiajs/react";

export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState<string>("");

    useEffect(() => {
        // Pusher のセットアップ
        const pusher = new Pusher("reverb", {
            wsHost: "localhost",
            wsPort: 8080,
            forceTLS: false,
            disableStats: true,
            cluster: "mt1",
        });

        // "chat" チャンネルを購読
        const channel = pusher.subscribe("chat");

        // イベントをリッスン
        channel.bind("App\\Events\\MessageSent", (data: { message: string }) => {
            setMessages((prev) => [...prev, data.message]);
        });

        return () => {
            pusher.unsubscribe("chat");
        };
    }, []);

    const sendMessage = async () => {
        router.post("/send-message", { message: input });
        setInput("");
    };

    return (
        <div className="container">
            <h1>Chat</h1>
            <div>
                {messages.map((msg, index) => (
                    <p key={index}>{msg}</p>
                ))}
            </div>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}
