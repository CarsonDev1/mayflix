import React from 'react';

const LoadingPage = () => {
	return (
		<div>
			<div className='w-full h-screen flex items-center justify-center bg-gray-200'>
				<div className='animate-spin border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full'></div>
			</div>
		</div>
	);
};

export default LoadingPage;
