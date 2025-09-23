import React from 'react';
import { Link } from 'react-router-dom';
import {assets} from '../assets/assets.js';

const MainBanner = () => {
  return (
    <div className="relative">
      <img
        src={assets.main_banner_bg}
        alt="banner"
        className="w-full hidden md:block"
      />
      <img
        src={assets.main_banner_bg_sm}
        alt="banner"
        className="w-full block md:hidden"
      />

      {/* This div contains all the text and buttons */}
      <div className="absolute inset-0 flex flex-col items-start justify-end md:justify-center pb-24 md:pb-0 px-4">
        <h1 className="text-xl md:text-4xl lg:text-5xl font-bold md:text-left leading-tight lg:leading-normal max-w-72 md:max-w-xs">
          Freshness you can Trust, Savings you will love!
        </h1>
        <div className="flex items-center mt-6 font-medium">
          {/* Shop now button */}
          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 px-7 text-white bg-orange-300 hover:bg-orange-500 transition rounded"
          >
            <img
              className="md:hidden transition group-focus:translate-x-1"
              src={assets.white_arrow_icon}
              alt="arrow"
            />
            <span className='text white' >Shop now</span>
          </Link>

          {/* Explore deals link */}
          <Link
            to="/products"
            className="group flex items-center gap-2 py-3 cursor-pointer ml-4"
          >
            <span>Explore deals</span>
            <img
              className="transition group-hover:translate-x-1"
              src={assets.black_arrow_icon}
              alt="arrow"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
