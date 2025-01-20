import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import NextTopLoader from 'nextjs-toploader';
import Provider from '@/utils/Provider';
import React, { Suspense } from 'react';
import LoadingPage from '@/app/components/loading/Loading';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '@/app/globals.css';
import { AuthProvider } from '@/contexts/AuthProvider';

const roboto = Roboto({
	weight: ['100', '300', '400', '500', '700', '900'],
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body className={`${roboto.className}`}>
				<Provider>
					<AuthProvider>
						<Header />
						<NextTopLoader color='#df1e1e' showSpinner={false} />
						<Suspense fallback={<LoadingPage />}>{children}</Suspense>
						<Footer />
					</AuthProvider>
				</Provider>
				<ToastContainer />
			</body>
		</html>
	);
}
