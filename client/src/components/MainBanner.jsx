import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const MainBanner = () => {
  return (
    <div className="relative">

      <picture>
        <source media="(max-width: 768px)" srcSet={assets.main_banner_bg_sm.png.jpeg} />
        <img
          src={assets.main_banner_bg.jpeg}
          alt="banner"
          className="w-full"
          fetchpriority="high"
          width="1200"
          height="500"
        />
      </picture>

      <div className="absolute inset-0 flex flex-col items-start justify-end md:justify-center pb-24 md:pb-0 px-4">
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-72 md:max-w-xs">
          Freshness you can Trust, Savings you will love!
        </h1>

        <div className="flex items-center mt-6 font-medium">
          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 px-7 text-white bg-orange-300 hover:bg-orange-500 transition rounded"
          >
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              width="20"
              height="20"
              loading="lazy"
            />
            <span>Shop now</span>
          </Link>

          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 ml-4"
          >
            <span>Explore deals</span>
            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              width="20"
              height="20"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
