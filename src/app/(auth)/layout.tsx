import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import HeaderAuth from '@/app/(auth)/components/header';
import Image from 'next/image';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../app/globals.css';
import { AuthProvider } from '@/contexts/AuthProvider';
import Provider from '@/utils/Provider';

const poppins = Poppins({
	weight: ['400', '500', '600', '700', '800', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Mayflix Cine',
	description: 'Mayflix Cine is the best cine in the world',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${poppins.className} relative h-screen`}>
				<Provider>
					<AuthProvider>
						<Image
							src='/background-auth.jpg'
							alt='Background'
							layout='fill'
							objectFit='cover'
							className='absolute w-full'
						/>
						<div className='absolute inset-0 w-full bg-black/50'></div>
						<HeaderAuth />
						{children}
						<ToastContainer />
					</AuthProvider>
				</Provider>
			</body>
		</html>
	);
}
