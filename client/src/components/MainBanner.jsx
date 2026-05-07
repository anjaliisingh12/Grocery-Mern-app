import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const MainBanner = () => {
  return (
    <div className="relative overflow-hidden bg-[#e6f5f3] rounded-lg">

      <picture className="block">

        {/* Mobile Image */}
        <source
          media="(max-width: 768px)"
          srcSet={assets.main_banner_bg_sm}
        />

        {/* Desktop Image */}
        <img
          src={assets.main_banner_bg}
          alt="banner"
          className="w-full h-[220px] md:h-[500px] object-cover block"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          width="1200"
          height="500"
          sizes="(max-width:768px) 100vw, 1200px"
        />
      </picture>

      <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-4 md:px-10 pb-5 md:pb-0">

        <h1 className="text-[24px] md:text-5xl font-bold leading-tight max-w-[240px] md:max-w-[420px] text-gray-800">
          Freshness you can Trust, Savings you will love!
        </h1>

        <div className="flex items-center mt-4 md:mt-6 font-medium">

          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 py-2.5 md:py-3 px-5 md:px-7 min-w-[120px] md:min-w-[150px] text-sm md:text-base text-white bg-orange-300 hover:bg-orange-500 transition rounded"
          >
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              width="18"
              height="18"
              loading="lazy"
              decoding="async"
            />

            <span>Shop now</span>
          </Link>

          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 ml-4 text-sm md:text-base text-gray-700"
          >
            <span>Explore deals</span>

            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              width="18"
              height="18"
              loading="lazy"
              decoding="async"
            />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MainBanner;
