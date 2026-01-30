import React from 'react';
import { useAppContext } from './../context/useAppContext';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
    const { allProducts } = useAppContext();
    const { category } = useParams();

    // FIX: Filter products by checking if the product category, formatted for the URL, matches the category param.
    const filteredProducts = allProducts.filter((product) => {
        const productCategoryFormatted = product.category.toLowerCase().replace(/\s+/g, '-');
        return productCategoryFormatted === category;
    });

    return (
        <div className="mt-16">
            <div className='flex flex-col items-end w-44'>
                <div className="text-2xl font-medium uppercase">{category}</div>
                <div className="w-10 h-1 bg-orange-300 rounded-full"></div>
            </div>
            
            {/* Conditional Rendering: Check if filteredProducts has items */}
            {filteredProducts.length > 0 ? (
                <div className='flex flex-wrap gap-4 justify-center'>
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className='flex items-center justify-center h-[60vh]'>
                    <p>No Products found in this category</p>
                </div>
            )}
        </div>
    );
};

export default ProductCategory;