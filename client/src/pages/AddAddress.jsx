import React, { useState, useEffect } from 'react'; // FIX: Added useEffect import
import { assets } from '../assets/assets';
import { useAppContext } from '../context/useAppContext'; // FIX: Added useAppContext import
import { useNavigate } from 'react-router-dom'; // FIX: Added useNavigate import
import toast from 'react-hot-toast'; // FIX: Added toast import

// Input Field Component
const InputField = ({ type, placeholder, name, handleChange, address }) => (
    <input
        className='w-full px-2.5 py-2 border border-gray-500/30 rounded outline-none text-gray-500 focus:border-primary transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
    />
);

const AddAddress = () => {
    // FIX: Correctly call hooks at the top of the component
    const navigate = useNavigate();
    const { axios, user } = useAppContext();

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAddress((prevAddress) => ({
            ...prevAddress,
            [name]: value,
        }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/address/add', { address });

            if (data.success) {
                toast.success(data.message);
                navigate('/cart');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };
    
    // FIX: Added the dependency array to prevent infinite loops
    useEffect(() => {
        if (!user) {
            navigate('/cart');
        }
    }, [user, navigate]);

    return (
        <div className='mt-16 pb-16'>
            <p className='text-2xl md:text-3xl text-gray-500'>
                Add Shipping<span className='font-semibold text-green-500'> Address</span>
            </p>
            <div className='flex flex-col-reverse md:flex-row justify-between mt-10'>
                {/* CHANGED: max-w-2xl for a much larger form */}
                <div className='flex-1 max-w-2xl'>
                    <form onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm'>
                        {/* CHANGED: gap-8 for more space between grid items */}
                        <div className='grid grid-cols-2 gap-6'>
                            <InputField handleChange={handleChange} address={address} name="firstName" type="text" placeholder="First Name" />
                            <InputField handleChange={handleChange} address={address} name="lastName" type="text" placeholder="Last Name" />
                        </div>
                        <InputField handleChange={handleChange} address={address} name="email" type="email" placeholder="Email Address" />
                        <InputField handleChange={handleChange} address={address} name="street" type="text" placeholder="Street" />

                        {/* CHANGED: gap-8 */}
                        <div className='grid grid-cols-2 gap-6'>
                            <InputField handleChange={handleChange} address={address} name="city" type="text" placeholder="city" />
                            <InputField handleChange={handleChange} address={address} name="state" type="text" placeholder="State" />
                        </div>

                        {/* CHANGED: gap-8 */}
                        <div className='grid grid-cols-2 gap-6'>
                            <InputField handleChange={handleChange} address={address} name="zipcode" type="number" placeholder="Zipcode" />
                            <InputField handleChange={handleChange} address={address} name="country" type="text" placeholder="Country" />
                        </div>
                        
                        <InputField handleChange={handleChange} address={address} name="phone" type="number" placeholder="Phone" />
                        
                        <button type="submit" className='w-full mt-6 bg-orange-300 text-white py-3 hover:bg-orange-500 transition cursor-pointer uppercase'>
                            Save address
                        </button>
                    </form>
                </div>
                <img src={assets.add_address_iamge} alt='Add Address' className='max-w-xs' />
            </div>
        </div>
    );
};

export default AddAddress;