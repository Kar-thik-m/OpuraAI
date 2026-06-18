import { Icons } from "../components/Icons"
import { Link, useLocation } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "../Redux/Store"

const SideBar = () => {
    const location = useLocation();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const wishlistItems = useSelector((state: RootState) => state.wishlist.wishlistItems);

    const navItems = [
        { name: "Search", path: "/", icon: <Icons.Search size={20} /> },
        { name: "Compare", path: "/compare", icon: <Icons.Waveform size={20} /> },
        {
            name: "Cart",
            path: "/cart",
            icon: <div className="relative">
                <Icons.OpuraBrandIcon size={20} />
                {cartItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{cartItems.length}</span>}
            </div>
        },
        {
            name: "Wishlist",
            path: "/wishlist",
            icon: <div className="relative">
                <Icons.Heart size={20} />
                {wishlistItems.length > 0 && <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">{wishlistItems.length}</span>}
            </div>
        },
    ];

    return (
        <>
            <div className="w-[240px] flex flex-col py-8 px-6">
                <Link to="/" className="flex items-center gap-3 mb-12 hover:opacity-80 transition-opacity">
                    <Icons.OpuraBrandIcon size={32} />
                    <span className="font-semibold text-[19px] text-gray-900 tracking-tight">Opura AI</span>
                </Link>

                <div className="flex flex-col gap-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-medium ${location.pathname === item.path
                                    ? "bg-blue-50 text-[#4F8AFF]"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                }`}
                        >
                            {item.icon}
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-4 px-4 py-3 text-gray-500 hover:text-gray-900 cursor-pointer rounded-xl hover:bg-gray-50 transition-colors">
                    <div className="w-[24px] h-[24px] rounded-full bg-gradient-to-r from-[#4F8AFF] to-[#8F59FF]"></div>
                    <span className="font-medium">Settings</span>
                </div>
            </div>
        </>

    )
}
export default SideBar