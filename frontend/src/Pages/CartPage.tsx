import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../Redux/Store";
import { removeFromCart, updateQuantity } from "../Redux/Slices/CartSlice";
import { Link } from "react-router-dom";
import { Icons } from "../components/Icons";

const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const taxes = subtotal * 0.1; // 10% tax
    const total = subtotal + taxes;

    return (
        <div className="min-h-screen bg-[#fcfcfc] p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors">
                        <Icons.ArrowRight className="rotate-180" size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Your Cart</h1>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your cart is empty</h2>
                        <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
                        <Link to="/" className="bg-[#4F8AFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item, index) => (
                                <div key={index} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center gap-6">
                                    <div className="w-32 h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0">
                                        <img src={item.product.imageUrl} alt={item.product.name} className="w-full h-full object-cover mix-blend-multiply" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-xl text-gray-900 mb-1">{item.product.name}</h3>
                                        <p className="text-gray-500 text-sm mb-4">Size: 9 UK</p>
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                                <button 
                                                    onClick={() => dispatch(updateQuantity({ id: item.product._id, quantity: item.quantity - 1 }))}
                                                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                                                >
                                                    -
                                                </button>
                                                <span className="px-4 py-1 font-semibold text-gray-900">{item.quantity}</span>
                                                <button 
                                                    onClick={() => dispatch(updateQuantity({ id: item.product._id, quantity: item.quantity + 1 }))}
                                                    className="px-3 py-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button 
                                                onClick={() => dispatch(removeFromCart(item.product._id))}
                                                className="text-red-500 text-sm font-semibold hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                    <div className="font-bold text-2xl text-gray-900">
                                        ${item.product.price * item.quantity}
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm sticky top-10">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Estimated Tax</span>
                                        <span className="font-semibold text-gray-900">${taxes.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span className="font-semibold text-green-500">Free</span>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 pt-6 mb-8">
                                    <div className="flex justify-between items-center">
                                        <span className="font-bold text-gray-900">Total</span>
                                        <span className="font-bold text-3xl text-gray-900">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                                <button className="w-full py-4 bg-gradient-to-r from-[#4F8AFF] to-[#8F59FF] text-white rounded-2xl font-bold text-lg hover:shadow-lg hover:-translate-y-0.5 transition-all">
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
