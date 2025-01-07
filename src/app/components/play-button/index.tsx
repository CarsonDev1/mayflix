import React from 'react';

const PlayButton: React.FC = () => {
	return (
		<a
			href='#'
			data-toggle='modal'
			data-target='#savoybeachhotel'
			className='relative z-10 block w-8 h-11 rounded-full p-[18px_20px_18px_28px] mx-auto transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2'
		>
			{/* Pulse effect background */}
			<span
				className='absolute inset-0 z-0 rounded-full bg-[#eb2055] animate-pulse'
				style={{ animationDuration: '1100ms' }}
			></span>

			{/* Play button ring effect */}
			<span className='absolute inset-0 z-1 rounded-full bg-[#eb2055] transition-all duration-200'></span>

			{/* Play icon */}
			<span className='relative z-3 block w-0 h-0 border-l-[19px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent top-2 left-[5px]'></span>
		</a>
	);
};

export default PlayButton;
