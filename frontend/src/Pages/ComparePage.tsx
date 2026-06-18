import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import type { RootState } from "../Redux/Store";
import { removeFromCompare } from "../Redux/Slices/CompareSlice";
import { CompareProductsAction } from "../Redux/Actions/CompareActions";
import { Icons } from "../components/Icons";

const ComparePage = () => {
    const dispatch = useDispatch<any>();
    const { selectedProducts, comparisonResult, loading } = useSelector(
        (state: RootState) => state.compare
    );

    const handleCompare = () => {
        if (selectedProducts.length > 0) {
            const ids = selectedProducts.map(p => p._id);
            dispatch(CompareProductsAction(ids));
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-[#f8f9fa] font-sans p-10">
            <div className="max-w-6xl mx-auto w-full bg-white rounded-[32px] p-10 shadow-sm border border-gray-100 min-h-[80vh]">
                <div className="flex items-center mb-8">
                    <Link to="/" className="mr-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
                        <Icons.ArrowRight className="rotate-180" size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900">Compare Products</h1>
                </div>

                <p className="text-gray-500 mb-8 text-sm">Select up to 3 products to compare their features side-by-side.</p>

                <div className="flex gap-6 mb-10 justify-center">
                    {[0, 1, 2].map((index) => {
                        const product = selectedProducts[index];

                        return (
                            <div key={index} className="w-64 h-80 border-2 border-dashed border-gray-200 rounded-3xl flex flex-col items-center justify-center p-4 relative bg-[#fcfcfc]">
                                {product ? (
                                    <>
                                        <button
                                            onClick={() => dispatch(removeFromCompare(product._id))}
                                            className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
                                        >
                                            <Icons.Plus className="rotate-45" size={20} />
                                        </button>
                                        <img src={product.imageUrl} className="h-32 w-full object-cover rounded-xl mb-4 mix-blend-multiply" alt={product.name} />
                                        <h3 className="font-bold text-center text-gray-800 line-clamp-2">{product.name}</h3>
                                        <div className="mt-2 font-bold text-lg">${product.price}</div>
                                    </>
                                ) : (
                                    <>
                                        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mb-4 border border-gray-200">
                                            <Icons.Plus size={32} />
                                        </div>
                                        <p className="text-gray-500 font-medium">Add Product</p>
                                        <div className="mt-4 px-4 py-2 bg-gray-100 text-gray-400 text-sm rounded-lg w-full text-center border border-gray-200">
                                            Select Product <Icons.ChevronDown size={14} className="inline ml-1" />
                                        </div>
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-center mb-12">
                    <button
                        onClick={handleCompare}
                        disabled={selectedProducts.length < 2 || loading}
                        className={`px-12 py-3 rounded-full font-bold text-lg shadow-sm transition-all ${selectedProducts.length >= 2
                            ? 'bg-gradient-to-r from-[#4F8AFF] to-[#8F59FF] text-white hover:shadow-md hover:-translate-y-0.5'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {loading ? 'Comparing...' : 'Compare'}
                    </button>
                </div>


                {comparisonResult && (
                    <div className="border border-gray-200 rounded-3xl p-8 bg-gray-50/50">
                        <h2 className="text-xl font-bold mb-6 text-gray-800">Detailed Comparison</h2>

                        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-2">🏆 Winner</h3>
                                    <p className="font-semibold text-lg text-gray-900">{comparisonResult.winner}</p>
                                </div>
                                <div>
                                    <h3 className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-2">💎 Best Value</h3>
                                    <p className="font-semibold text-lg text-[#4F8AFF]">{comparisonResult.bestValue}</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {comparisonResult.comparison && comparisonResult.comparison.map((item: any, idx: number) => (
                                <div key={idx} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col h-full">
                                    <div className="flex justify-between items-start mb-4 gap-2">
                                        <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.productName || item.feature || `Product ${idx + 1}`}</h3>
                                        {item.price && <span className="bg-blue-50 text-blue-600 font-bold px-3 py-1 rounded-full text-sm whitespace-nowrap">{item.price}</span>}
                                    </div>

                                    {item.idealFor && (
                                        <div className="mb-4">
                                            <h4 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">Ideal For</h4>
                                            <p className="text-sm text-gray-700">{item.idealFor}</p>
                                        </div>
                                    )}

                                    {item.keyFeatures && (
                                        <div className="mb-4">
                                            <h4 className="text-xs uppercase tracking-wider font-bold text-gray-500 mb-1">Key Features</h4>
                                            <p className="text-sm text-gray-700">{item.keyFeatures}</p>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 mt-auto pt-4 border-t border-gray-100">
                                        <div>
                                            <h4 className="text-xs uppercase tracking-wider font-bold text-green-600 mb-2">
                                                Pros
                                            </h4>
                                            <ul className="text-xs text-gray-600 space-y-1.5">
                                                {item.pros?.map((pro: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-1.5">
                                                        <span className="text-green-500 font-bold leading-none mt-0.5">✓</span>
                                                        <span className="leading-snug">{pro}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="text-xs uppercase tracking-wider font-bold text-red-600 mb-2">
                                                Cons
                                            </h4>
                                            <ul className="text-xs text-gray-600 space-y-1.5">
                                                {item.cons?.map((con: string, i: number) => (
                                                    <li key={i} className="flex items-start gap-1.5">
                                                        <span className="text-red-500 font-bold leading-none mt-0.5">✕</span>
                                                        <span className="leading-snug">{con}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {(!item.productName && !item.idealFor && !item.pros) && (
                                        <p className="text-gray-600 text-sm mt-auto">{item.details || item.description || JSON.stringify(item)}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComparePage;
