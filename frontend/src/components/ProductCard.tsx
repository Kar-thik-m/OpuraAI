import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCompare } from "../Redux/Slices/CompareSlice";
import { addToCart } from "../Redux/Slices/CartSlice";
import { toggleWishlist } from "../Redux/Slices/WishlistSlice";
import type { RootState } from "../Redux/Store";
import { Icons } from "./Icons";
import { useState } from "react";

type Props = {
    product: any;
};

const ProductCard = ({ product }: Props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);
    const isWishlisted = wishlistItems.some((item: any) => item._id === product._id);

    const handleCompare = () => {
        dispatch(addToCompare(product));
        navigate("/compare");
    };

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    };

    const handleToggleWishlist = () => {
        dispatch(toggleWishlist(product));
    };

    return (
        <div 
            className="w-72 border border-gray-200 rounded-2xl p-4 bg-white relative shrink-0 transition-all hover:shadow-xl hover:-translate-y-1"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div 
                className={`absolute top-6 right-6 z-10 cursor-pointer transition-colors ${isWishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
                onClick={handleToggleWishlist}
            >
                <Icons.Heart size={20} filled={isWishlisted} />
            </div>

            <div className="bg-gray-100 rounded-xl mb-3 overflow-hidden">
                <img
                    src={product.imageUrl}
                    className="h-48 w-full object-cover mix-blend-multiply"
                    alt={product.name}
                />
            </div>

            <div className="flex justify-between items-start mb-1">
                <h2 className="font-bold text-gray-900 text-lg">{product.name}</h2>
                <div className="flex items-center gap-1 text-xs font-semibold bg-gray-100 px-2 py-1 rounded">
                    4.5 <Icons.Star size={12} className="text-yellow-500" filled />
                </div>
            </div>

            <div className="flex items-center justify-between font-bold text-lg mb-2">
                <span>${product.price} <span className="line-through text-gray-400 text-sm font-normal ml-1">${product.price + 50}</span></span>
                <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-black border border-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400 border border-gray-300"></div>
                    <div className="w-3 h-3 rounded-full bg-blue-500 border border-gray-300"></div>
                </div>
            </div>
            
            <div className="text-xs text-gray-500 mb-2">
                Size: <span className="font-medium text-gray-700">8 UK | 9 UK | 10 UK | 11 UK</span>
            </div>

            {isHovered ? (
                <div className="mt-4 flex flex-col gap-2">
                    <button 
                        onClick={handleAddToCart}
                        className={`w-full py-2 border rounded-xl text-sm font-semibold transition-colors ${addedToCart ? "bg-green-50 text-green-600 border-green-200" : "border-gray-300 hover:bg-gray-50"}`}
                    >
                        {addedToCart ? "✓ Added to cart" : "Add to cart"}
                    </button>
                    <button 
                        onClick={handleCompare}
                        className="w-full py-2 bg-[#4F8AFF] text-white rounded-xl text-sm font-semibold hover:bg-blue-600 transition-colors"
                    >
                        Add to compare list
                    </button>
                </div>
            ) : (
                <div className="mt-4 flex justify-end gap-3 text-gray-400 py-2">
                    <Icons.ThumbsDown size={18} className="cursor-pointer hover:text-gray-700 transition-colors" />
                    <Icons.Share size={18} className="cursor-pointer hover:text-gray-700 transition-colors" />
                </div>
            )}
        </div>
    );
};

export default ProductCard;