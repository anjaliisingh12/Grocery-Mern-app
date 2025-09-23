import { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../context/useAppContext";
import { assets, dummyAddress } from "../assets/assets";

const Cart = () => {
    const [showAddress, setShowAddress] = useState(false);
    const [cartArray, setCartArray] = useState([]);
    const [addresses] = useState(dummyAddress); 
    const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
    const [paymentOption, setPaymentOption] = useState('COD');

    // CORRECTED: The useNavigate function is now correctly destructured with a standard name 'navigate'
    const { allProducts, currency, cartItems, removeFromCart, updateCartItem, navigate, getCartAmount } = useAppContext();

    const getCart = useCallback(() => {
        let tempArray = [];
        for (const key in cartItems) {
            const product = allProducts.find((item) => item._id === key);
            if (product) { 
                const tempProduct = { ...product, quantity: cartItems[key] };
                tempArray.push(tempProduct);
            }
        }
        setCartArray(tempArray);
    }, [allProducts, cartItems]);

    useEffect(() => {
        if (allProducts.length > 0 && cartItems) {
            getCart();
        }
    }, [allProducts, cartItems, getCart]);

    const placeOrder = async () => {
        // Your logic for placing an order will go here
    };

    if (Object.keys(cartItems).length === 0) {
        return (
            <div className="flex flex-col items-center justify-center h-[60vh]">
                <p className="text-xl font-medium text-gray-700">Your cart is empty.</p>
                <button
                    onClick={() => navigate("/products")} // Corrected usage
                    className="mt-4 py-2 px-6 bg-orange-300 text-white rounded hover:bg-orange-500 transition"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col md:flex-row mt-16">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={() => {
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`); // Corrected usage
                                window.scrollTo(0, 0);
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                 {/* FIX: Change 'product.image' to 'product.images' */}
                                <img className="max-w-full h-full object-cover" src={product.images[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select
                                            className='outline-none'
                                            value={product.quantity}
                                            onChange={(e) => updateCartItem(product._id, parseInt(e.target.value))}
                                        >
                                            {Array.from({ length: product.quantity > 9 ? product.quantity : 9 }, (_, i) => (
                                                <option key={i} value={i + 1}>{i + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">{currency}{product.offerPrice * product.quantity}</p>
                        <button onClick={() => removeFromCart(product._id)}
                        className="cursor-pointer mx-auto">
                            <img src={assets.remove_icon} alt="arrow" className="inline-block w-6 h-6" />
                        </button>
                    </div>
                ))}

                <button onClick={()=>{navigate("/products"); window.scrollTo(0, 0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-orange-500 font-medium">
                    <img className="group-hover:translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="arrow" />
                    Continue Shopping
                </button>
            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                        <p className="text-gray-500">{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : "No address found"}</p>
                        <button onClick={() => setShowAddress(!showAddress)} className="text-orange-500 hover:underline cursor-pointer">
                            Change
                        </button>
                        {showAddress && (
                            <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
                                {addresses.map((address, index) => (
                                    <p onClick={() => { setSelectedAddress(address); setShowAddress(false); }}
                                    className="text-gray-500 p-2 hover:bg-gray-100" key={index}>
                                        {address.street}, {address.city}, {address.state}, {address.country}
                                    </p>
                                ))}
                                <p onClick={() => navigate("/add-address")} className="text-orange-300 text-center cursor-pointer p-2 hover:bg-orange-500/10">
                                    Add address
                                </p>
                            </div>
                        )}
                    </div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{currency}{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-orange-500">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{currency}{(getCartAmount() * 2 / 100).toFixed(2)}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{currency}{(getCartAmount() + getCartAmount() * 2 / 100).toFixed(2)}</span>
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-orange-300 text-white font-medium hover:bg-orange-500 transition">
                    {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
        </div>
    );
};
export default Cart;