import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/useAppContext';
import ProductCard from '../components/ProductCard';

const AllProducts = () => {
    const { allProducts, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = useState(allProducts);

    useEffect(() => {
        if (searchQuery && searchQuery.length > 0) {
            const filtered = allProducts.filter(product =>
                product && product.name && product.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(allProducts);
        }
    }, [allProducts, searchQuery]);

    return (
        <div className='m-16 flex flex-col'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All Products</p>
                <div className='w-16 h-0.5 bg-orange-500 rounded-full'></div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
                {Array.isArray(filteredProducts) && filteredProducts
                    .filter(product => product.inStock)
                    .map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default AllProducts;