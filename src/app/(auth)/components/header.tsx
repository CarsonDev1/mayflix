'use client';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

const HeaderAuth = () => {
	const pathname = usePathname();
	const router = useRouter();
	const isLoginPage = pathname === '/login';
	const buttonText = isLoginPage ? 'Register' : 'Login';
	const redirectPath = isLoginPage ? '/register' : '/login';

	const handleButtonClick = () => {
		router.push(redirectPath);
	};

	return (
		<div className='container'>
			<div className='flex justify-between items-center bg-transparent py-2'>
				<Image src='/logo.png' alt='Logo' className='h-14 w-auto' width={200} height={200} />
				<Button variant='default' className='px-8 py-3' onClick={handleButtonClick}>
					{buttonText}
				</Button>
			</div>
		</div>
	);
};

export default HeaderAuth;
