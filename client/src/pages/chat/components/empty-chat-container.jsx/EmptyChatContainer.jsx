import React from 'react'
import Lottie from 'react-lottie'
import { animationDefaultOptions } from '../../../../lib/utils'

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-gradient-to-t from-black from-5% via-black via-85% to-emerald-950 to-200% md:flex flex-col justify-center items-center hidden duration-1000 transition-all  ">
      <div className="animate-pulse ">
        <Lottie
          isClickToPauseDisabled={true}
          height={200}
          width={200}
          options={animationDefaultOptions}
        />
      </div>
      <h3 className="golden text-xl mt-6 ">
        {/* <span className="">Hi! </span>
        Welcome to.... */}
        <span className="golden block text-2xl ">
          <span className='text-3xl font-bold'>REAL-TIME </span> FREE CHAT APP
        </span>
      </h3>
    </div>
  );
}

export default EmptyChatContainer