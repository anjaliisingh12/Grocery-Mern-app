import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const MainBanner = () => {
  return (
    <div className="relative h-[260px] sm:h-[320px] md:h-[500px] overflow-hidden">

      <picture>
        <source
          media="(max-width: 768px)"
          srcSet={assets.main_banner_bg_sm}
        />

        <img
          src={assets.main_banner_bg}
          alt="banner"
          className="w-full h-full object-cover object-center"
          width="1200"
          height="500"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </picture>

      <div className="absolute inset-0 flex flex-col items-start justify-end md:justify-center pb-10 md:pb-0 px-4 md:px-10">

        <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-72 md:max-w-md text-black">
          Freshness you can Trust,
          Savings you will love!
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
