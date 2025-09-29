import React from 'react';
import { assets } from '../assets/assets';
import { useAppContext } from '../context/useAppContext';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    const { currency, addToCart, removeFromCart, cartItems } = useAppContext();

    return product && (
        <div onClick={() => { navigate(`/product-details/${product._id}`); scrollTo(0, 0) }} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white min-w-56 max-w-56 w-full">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img
                    className="group-hover:scale-105 transition max-w-26 md:max-w-36"
                    src={product.images && product.images.length > 0 ? product.images[0] : assets.upload_area}
                    alt={product.name}
                />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        <img key={i} className='md:w-3.5 w3' src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="" />
                    ))}
                    <p>({4})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium text-bg-orange">
                        {currency}{product.offerPrice}{" "} <span className="text-gray-500/60 md:text-sm text-xs line-through">{currency}{product.price}</span>
                    </p>
                    <div onClick={(e) => { e.stopPropagation(); }} className="text-orange">
                        {cartItems[product._id] > 0 ? (
                            <div className="flex items-center justify-center gap-1 bg-orange/10 border-orange/40 md:w-[80px] w-[64px] h-[34px] rounded cursor pointer">
                                <button onClick={(e) => { e.stopPropagation(); removeFromCart(product._id); }}>
                                    <span>-</span>
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={(e) => { e.stopPropagation(); addToCart(product._id); }}>
                                    <span>+</span>
                                </button>
                            </div>
                        ) : (
                            <button onClick={(e) => { e.stopPropagation(); addToCart(product._id); }} className="flex items-center gap-2 bg-orange/10 border-orange/40 md:w-[80px] w-[64px] h-[34px] rounded-full">
                                <img src={assets.cart_icon} alt='cart_icon' />
                                <span>Add</span>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ProductCard;