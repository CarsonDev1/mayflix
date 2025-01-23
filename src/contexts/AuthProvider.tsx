/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getUserById } from '@/api/account/getAccount';
// import { getAccount } from '@/app/apis/getProfile';
import Provider from '@/utils/Provider';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (tokens: { accessToken: string; refreshToken: string }) => void;
	logout: () => void;
	cartCount: number;
	addToCart: (product: any) => void;
	clearCart: () => void;
	dataProfile: any;
	isLoading: boolean;
	error: any;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(
		typeof window !== 'undefined' && !!localStorage.getItem('accessToken')
	);

	const [cartCount, setCartCount] = useState<number>(0);

	useEffect(() => {
		const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
		setCartCount(storedCart.length);
	}, []);

	const addToCart = (product: any) => {
		const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
		const updatedCart = [...existingCart, product];
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		setCartCount(updatedCart.length);
		toast.success('Thêm vào giỏ hàng thành công!');
	};

	const clearCart = () => {
		localStorage.removeItem('cart');
		setCartCount(0);
	};

	// Auth functions
	const login = ({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) => {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
		setIsAuthenticated(true);
	};

	const logout = () => {
		if (typeof window !== 'undefined') {
			console.log('Logging out...');
			localStorage.removeItem('accessToken');
			localStorage.removeItem('refreshToken');
			localStorage.removeItem('cart');
			localStorage.removeItem('userId');
			setIsAuthenticated(false);
			setCartCount(0);
			console.log('Logged out successfully');
			router.push('/login');
		} else {
			console.error('Logout failed: window is undefined');
		}
	};

	const userId: any = localStorage.getItem('userId');

	const {
		data: dataProfile,
		isLoading,
		error,
	} = useQuery({
		queryKey: ['dataProfile', userId],
		queryFn: () => getUserById(userId),
	});

	useEffect(() => {
		setIsAuthenticated(!!localStorage.getItem('accessToken'));
	}, []);

	return (
		<Provider>
			<AuthContext.Provider
				value={{
					isAuthenticated,
					login,
					logout,
					cartCount,
					addToCart,
					clearCart,
					dataProfile,
					isLoading,
					error,
				}}
			>
				{children}
			</AuthContext.Provider>
		</Provider>
	);
};

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};
