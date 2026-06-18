import { Icons } from "./Icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchproducts } from "../Redux/Actions/ProductsActions";

type Message = {
    role: "user" | "assistant";
    content: string;
};

const MainBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);

    const dispatch = useDispatch<any>();

    const { products, loading, error } = useSelector(
        (state: any) => state.products
    );

    const HandleClicks = () => {
        if (!input.trim()) return;

        setIsOpen(true);

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: input,
            },
        ]);

        dispatch(Searchproducts(input));

        setInput("");
    };

    useEffect(() => {
        if (!loading && products?.length > 0) {
            const responseText = products
                .map((product: any) => product.name)
                .join("\n");

            setMessages((prev) => {
                const last = prev[prev.length - 1];

                if (
                    last &&
                    last.role === "assistant" &&
                    last.content === responseText
                ) {
                    return prev;
                }

                return [
                    ...prev,
                    {
                        role: "assistant",
                        content: responseText,
                    },
                ];
            });
        }
    }, [products, loading]);

    useEffect(() => {
        if (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: error,
                },
            ]);
        }
    }, [error]);

    return (
        <div className="w-full h-auto bg-white p-10 my-3 mr-3 rounded-[32px] relative flex flex-col shadow-sm border border-gray-100 overflow-hidden">


            <div className="flex-1 overflow-y-auto scrollbar-hide">

                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`w-full flex mt-5 ${message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[700px] px-4 py-3 rounded-2xl whitespace-pre-wrap ${message.role === "user"
                                ? "bg-gray-200"
                                : "bg-blue-50 border border-blue-100"
                                }`}
                        >
                            {message.content}
                        </div>
                    </div>
                ))}


                {loading && (
                    <div className="w-full flex justify-start mt-5">
                        <div className="px-4 py-3 rounded-2xl bg-gray-100">
                            <div className="flex gap-1 text-gray-500">
                                <span className="animate-bounce">●</span>
                                <span
                                    className="animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                >
                                    ●
                                </span>
                                <span
                                    className="animate-bounce"
                                    style={{ animationDelay: "0.4s" }}
                                >
                                    ●
                                </span>
                            </div>
                        </div>
                    </div>
                )}

                {!isOpen && (
                    <div className="h-full flex flex-col items-center justify-center px-4">
                        <h1 className="text-[44px] font-semibold bg-gradient-to-r from-[#4F8AFF] to-[#8F59FF] bg-clip-text text-transparent mb-2">
                            Hello Opura
                        </h1>

                        <p className="text-[22px] text-gray-600 mb-12">
                            How can I help you today?
                        </p>
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="mt-5 flex justify-center">
                <div className="w-full max-w-[700px] flex items-center border border-gray-200 rounded-[20px] bg-[#f5f5f5] shadow-sm">

                    <div className="pl-5 pr-2 text-gray-600">
                        <Icons.Plus size={22} />
                    </div>

                    <input
                        type="text"
                        placeholder="Search here"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                HandleClicks();
                            }
                        }}
                        className="flex-1 bg-transparent text-gray-700 py-4 outline-none placeholder:text-gray-500"
                    />

                    <div className="pr-5 pl-2 flex items-center gap-4 text-gray-600">
                        <button
                            onClick={HandleClicks}
                            className="hover:text-gray-900"
                        >
                            <Icons.Send size={20} />
                        </button>

                        <button className="hover:text-gray-900">
                            <Icons.Waveform size={22} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainBar;