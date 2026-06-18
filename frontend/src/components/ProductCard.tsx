type Props = {
    product: any;
};

const ProductCard = ({ product }: Props) => {
    return (
        <div className="w-72 border rounded-xl p-4 bg-white">

            <img
                src={product.imageUrl}
                className="h-40 w-full object-cover rounded"
            />

            <h2 className="font-bold mt-2">{product.name}</h2>

            <p className="text-sm text-gray-500">
                {product.description}
            </p>

            <div className="mt-2 font-semibold">
                ₹ {product.price}
            </div>

        </div>
    );
};

export default ProductCard;