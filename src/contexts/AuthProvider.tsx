/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { getUserById } from '@/api/account/getAccount';
import Provider from '@/utils/Provider';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from 'react-toastify';

interface AuthContextType {
	isAuthenticated: boolean;
	login: (tokens: { accessToken: string; refreshToken: string }) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
	children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const router = useRouter();
	const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('accessToken'));

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
			localStorage.removeItem('userId');
			setIsAuthenticated(false);
			console.log('Logged out successfully');
			router.push('/login');
		} else {
			console.error('Logout failed: window is undefined');
		}
	};

	return (
		<Provider>
			<AuthContext.Provider
				value={{
					isAuthenticated,
					login,
					logout,
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
