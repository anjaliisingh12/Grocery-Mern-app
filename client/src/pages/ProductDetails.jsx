import React, { useEffect, useState } from 'react';
import { useAppContext } from '../context/useAppContext';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductDetails = () => {
    const navigate = useNavigate();
    const { allProducts, currency, addToCart } = useAppContext();
    const { id } = useParams();
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [thumbnail, setThumbnail] = useState(null);

    const product = allProducts.find((item) => item._id === id);

    const formatCategoryPath = (categoryName) => {
        return categoryName.toLowerCase().replace(/\s+/g, '-');
    };

    useEffect(() => {
        if (product && allProducts.length > 0) {
            let productsCopy = allProducts.slice();
            productsCopy = productsCopy.filter((item) => product.category === item.category && item._id !== id);
            setRelatedProducts(productsCopy.slice(0, 5));
        }
    }, [product, allProducts, id]);

    useEffect(() => {
        if (product?.images?.length > 0) {
            setThumbnail(product.images[0]);
        } else {
            setThumbnail(null);
        }
    }, [product]);

    if (!product) {
        return (
            <div className='flex items-center justify-center h-[60vh]'>
                <p>Product not found.</p>
            </div>
        );
    }

    return (
        <div className="mt-12 md:px-16 px-6 lg:px-24 xl:px-32 max-w-[1300px] m-auto">
            {/* Breadcrumb links */}
            <p className="flex items-center gap-1.5 text-gray-500 text-sm">
                <Link to={"/"}>Home</Link> /
                <Link to={"/AllProducts"}>Products</Link> /
                <Link to={`/Products/${formatCategoryPath(product.category)}`}>{product.category}</Link> /
                <span className="text-orange-500">{product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-6 md:gap-16 mt-4">
                <div className="flex flex-col gap-5 md:w-1/2">
                    {/* Main active image */}
                    <div className="flex items-center justify-center border border-gray-300 rounded-md p-6 overflow-hidden">
                        <img className="h-[400px] w-auto object-cover" src={thumbnail || assets.upload_area} alt={product.name} />
                    </div>
                    {/* Thumbnail images */}
                    <div className="flex items-center justify-start gap-4 flex-wrap">
                        {product.images?.map((img, index) => (
                            <div key={index} onClick={() => setThumbnail(img)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer">
                                <img src={img} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="md:w-1/2 space-y-3">
                    <p className="text-gray-500/80 text-sm">{product.category}</p>
                    <h2 className="text-4xl font-semibold">{product.name}</h2>
                    <div className="flex items-center gap-0.5">
                        {Array(5).fill('').map((_, i) => (
                            <img key={i} className='md:w-4 w3' src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                        ))}
                        <p>({4})</p>
                    </div>
                    <p className="text-gray-500/80">{Array.isArray(product.description) ? product.description.join(' ') : product.description}</p>
                    <p className="md:text-4xl text-2xl font-medium text-bg-orange">
                        {currency}{product.offerPrice}{" "}
                        <span className="text-gray-500/60 md:text-xl text-lg line-through">
                            {currency}${product.price}
                        </span>
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                        <button
                            onClick={() => addToCart(product._id)}
                            className="flex items-center gap-3 bg-gray-100 text-gray-800/80 rounded-full py-3 px-6 hover:bg-gray-200 transition"
                        >
                            <img className="w-5" src={assets.bag_icon} alt="" />
                            Add to Cart
                        </button>
                        <button
                            onClick={() => { addToCart(product._id); navigate('/cart'); }}
                            className="w-full md:w-auto py-3 px-6 cursor-pointer font-medium bg-orange-300 text-white rounded-full hover:bg-orange-500 transition"
                        >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-16">
                <h2 className="text-2xl font-medium">Related Products</h2>
                <div className="w-10 h-1 bg-orange-300 rounded-full my-1"></div>
                <div className="flex flex-wrap gap-4 justify-center mt-6">
                    {relatedProducts.length > 0 ? (
                        relatedProducts.map((p) => <ProductCard key={p._id} product={p} />)
                    ) : (
                        <p>No related products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;