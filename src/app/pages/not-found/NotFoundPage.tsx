'use client';

import React from 'react';
import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<div className='text-center'>
			<h1 className='text-4xl font-bold'>404 - Page Not Found</h1>
			<p className='mt-4 text-lg'>Sorry, the page you are looking for does not exist.</p>
			<Link href='/' className='text-blue-500 underline mt-4'>
				Go back to Home
			</Link>
		</div>
	);
};

export default NotFoundPage;
