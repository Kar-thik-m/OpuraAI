import { useSelector } from "react-redux";
import type { RootState } from "../Redux/Store";
import { Link } from "react-router-dom";
import { Icons } from "../components/Icons";
import ProductCard from "../components/ProductCard";

const WishlistPage = () => {
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);

    return (
        <div className="min-h-screen bg-[#fcfcfc] p-10 font-sans">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center gap-4 mb-8">
                    <Link to="/" className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-gray-500 hover:text-gray-900 transition-colors">
                        <Icons.ArrowRight className="rotate-180" size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Your Wishlist</h1>
                </div>

                {wishlistItems.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-sm">
                        <Icons.Heart size={48} className="mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-bold text-gray-700 mb-4">Your wishlist is empty</h2>
                        <p className="text-gray-500 mb-8">Save items you love here to easily find them later.</p>
                        <Link to="/" className="bg-[#4F8AFF] text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-colors">
                            Discover Products
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        {wishlistItems.map((item, index) => (
                            <ProductCard key={index} product={item} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishlistPage;
