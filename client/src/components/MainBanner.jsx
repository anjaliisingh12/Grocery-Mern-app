import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const MainBanner = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-[#eaf7f5]">

      <picture className="block">
        <source
          media="(max-width:768px)"
          srcSet={assets.main_banner_bg_sm}
        />

        <img
          src={assets.main_banner_bg}
          alt="banner"
          className="w-full h-[260px] md:h-[500px] object-cover md:object-cover object-center block"
          fetchpriority="high"
          loading="eager"
          decoding="async"
          width="1200"
          height="500"
          sizes="(max-width:768px) 100vw, 1200px"
        />
      </picture>

      <div className="absolute inset-0 flex flex-col justify-center px-5 md:px-10">

        <h1 className="text-[20px] sm:text-2xl md:text-5xl font-bold leading-tight max-w-[220px] md:max-w-[420px] text-gray-800">
          Freshness you can Trust,
          Savings you will love!
        </h1>

        <div className="flex items-center mt-5 md:mt-7 font-medium">

          <Link
            to="/products"
            className="group flex items-center justify-center gap-2 py-2.5 md:py-3 px-5 md:px-7 text-sm md:text-base text-white bg-orange-300 hover:bg-orange-500 transition rounded-lg"
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
