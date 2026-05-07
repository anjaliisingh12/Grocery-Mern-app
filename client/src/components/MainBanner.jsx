import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const MainBanner = () => {
  return (
    <div className="relative h-[260px] sm:h-[320px] md:h-[500px] overflow-hidden rounded-2xl">

      <picture>
        {/* Mobile banner */}
        <source
          media="(max-width: 768px)"
          srcSet={assets.main_banner_bg_sm}
        />

        {/* Desktop banner */}
        <img
          src={assets.main_banner_bg}
          alt="Fresh grocery banner"
          className="w-full h-full object-cover object-right md:object-center"
          width="1200"
          height="500"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end md:justify-center px-5 md:px-12 pb-6 md:pb-0">

        <h1 className="text-xl sm:text-3xl md:text-5xl font-bold leading-tight max-w-[220px] sm:max-w-md text-black">
          Freshness you can Trust,
          Savings you will love!
        </h1>

        <div className="flex items-center gap-3 mt-5 flex-wrap">

          <Link
            to="/products"
            className="flex items-center gap-2 py-2 px-5 bg-orange-300 hover:bg-orange-500 transition rounded text-white font-medium"
          >
            <img
              src={assets.white_arrow_icon}
              alt="arrow"
              width="18"
              height="18"
              loading="lazy"
            />

            <span>Shop now</span>
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-2 font-medium"
          >
            <span>Explore deals</span>

            <img
              src={assets.black_arrow_icon}
              alt="arrow"
              width="18"
              height="18"
              loading="lazy"
            />
          </Link>

        </div>
      </div>
    </div>
  );
};

export default MainBanner;
