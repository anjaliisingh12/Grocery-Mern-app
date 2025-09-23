import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../assets/assets';

const Categories = () => {
    const navigate = useNavigate();

    const formatPath = (path) => {
        return path.toLowerCase().replace(/\s+/g, '-');
    };

    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Categories</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mt-6 gap-6 mt-10 gap-10'>
                {categories.map((category, index) => (
                    <div key={index} className='group cursor-pointer py-5 px-3 rounded-lg flex flex-col justify-center items-center'
                        style={{ backgroundColor: category.bgColor }}
                        onClick={() => {
                            // FIX: Use the formatted path for a URL without spaces
                            navigate(`/products/${formatPath(category.path)}`);
                            scrollTo(0, 0);
                        }}>
                        <img src={category.image} alt={category.text} className='group-hover:scale-108 transition max-w-28' />
                        <p className='text-sm font-medium'>{category.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;