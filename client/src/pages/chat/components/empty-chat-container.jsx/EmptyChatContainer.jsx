import React from 'react'
import Lottie from 'react-lottie'
import { animationDefaultOptions } from '../../../../lib/utils'

const EmptyChatContainer = () => {
  return (
    <div className="flex-1 md:bg-[#1c1d25] md:flex flex-col justify-center items-center hidden duration-1000 transition-all  ">
      <div className="animate-pulse ">
        <Lottie
          isClickToPauseDisabled={true}
          height={200}
          width={200}
          options={animationDefaultOptions}
        />
      </div>
      <h3 className="text-fuchsia-300 text-xl ">
        <span className="text-purple-400">hi! </span>
        welcome to....
        <span className="text-yellow-400 block text-4xl ">
          {" "}
          FREE CHAT APP
        </span>
      </h3>
    </div>
  );
}

export default EmptyChatContainer