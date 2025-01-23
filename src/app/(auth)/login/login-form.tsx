'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import api from '@/utils/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/contexts/AuthProvider';

// Define the validation schema with Zod for login
const schema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

// Define the type for the form data
type FormData = z.infer<typeof schema>;

// Define schema for Forgot Password
const forgotPasswordSchema = z.object({
	email: z.string().email({ message: 'Invalid email address' }),
});

type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;

export default function LoginForm() {
	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [isForgotPassword, setIsForgotPassword] = useState(false);
	const router = useRouter();
	const { login } = useAuth();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const {
		register: forgotPasswordRegister,
		handleSubmit: handleForgotPasswordSubmit,
		formState: { errors: forgotPasswordErrors },
	} = useForm<ForgotPasswordData>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	const onSubmit = async (data: FormData) => {
		setLoading(true);
		try {
			const response = await api.post('v1/auth/login', {
				email: data.email,
				password: data.password,
			});

			if (response.status === 200) {
				const { tokens, user } = response.data;
				login({ accessToken: tokens.access.token, refreshToken: tokens.refresh.token });

				localStorage.setItem('userId', user.id);
				localStorage.setItem('accessToken', tokens.access.token);
				localStorage.setItem('refreshToken', tokens.refresh.token);

				toast.success('Login successful!');
				router.push('/');
			}
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'Login Failed!');
			console.error('Login error:', err?.response?.data?.message);
		} finally {
			setLoading(false);
		}
	};

	const onForgotPasswordSubmit = async (data: ForgotPasswordData) => {
		setLoading(true);
		try {
			const response = await api.post('/auth/forgot-password', {
				email: data.email,
			});

			if (response?.data?.status === 200) {
				toast.success('Password reset instructions sent to your email!');
				setIsForgotPassword(false);
				router.push('/reset-password');
			} else {
				toast.error(response?.data?.message || 'Failed to send password reset instructions');
			}
		} catch (err: any) {
			toast.error(err?.response?.data?.message || 'An error occurred');
			console.error('Forgot Password error:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative container flex items-center justify-center pt-16 sm:pt-24 md:pt-28 lg:pt-32'>
			<div className='bg-black/60 bg-opacity-80 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-lg relative z-10'>
				<div className='absolute top-5 right-5'></div>
				<div className='space-y-6 mb-8'>
					<h1 className='text-2xl font-bold text-white text-center'>
						{isForgotPassword ? 'Forgot Password' : 'LOG IN'}
					</h1>
				</div>

				{/* Forgot Password Form */}
				{isForgotPassword ? (
					<form className='flex flex-col gap-3' onSubmit={handleForgotPasswordSubmit(onForgotPasswordSubmit)}>
						{/* Email Field */}
						<div className='flex flex-col gap-1 relative'>
							<Input
								className='h-12 bg-white text-black placeholder:text-gray-500 text-lg'
								placeholder='Email'
								type='email'
								{...forgotPasswordRegister('email')}
							/>
							{forgotPasswordErrors.email && (
								<p className='text-red-500'>{forgotPasswordErrors.email.message}</p>
							)}
						</div>

						{/* Submit Button */}
						<div className='mt-6 flex flex-col gap-2'>
							<Button
								className='w-full h-12 text-lg font-bold bg-[#F5A524] hover:bg-[#F5A524]/90 text-black'
								type='submit'
								disabled={loading}
							>
								{loading ? 'Sending...' : 'SEND RESET LINK'}
							</Button>
							<Button
								variant='default'
								className='w-full h-12 text-lg font-bold border-[#F5A524] text-[#F5A524] hover:bg-[#F5A524] hover:text-black'
								onClick={() => setIsForgotPassword(false)} // Go back to login form
							>
								BACK TO LOGIN
							</Button>
						</div>
					</form>
				) : (
					// Login Form
					<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
						{/* Email Field */}
						<div className='flex flex-col gap-1'>
							<Input
								className='h-12 bg-white text-black placeholder:text-gray-500 text-lg'
								placeholder='Email'
								type='email'
								{...register('email')}
							/>
							{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
						</div>

						{/* Password Field */}
						<div className='flex flex-col gap-1'>
							<div className='relative'>
								<Input
									className='h-12 bg-white text-black placeholder:text-gray-500 text-lg'
									placeholder='Password'
									type={showPassword ? 'text' : 'password'}
									{...register('password')}
								/>
								<span
									className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
									onClick={() => setShowPassword((prev) => !prev)}
								>
									{showPassword ? '👁️' : '👁️‍🗨️'}
								</span>
							</div>
							{errors.password && <p className='text-red-500'>{errors.password.message}</p>}
						</div>

						{/* Submit Button */}
						<div className='mt-6 flex flex-col gap-2'>
							<Button
								className='w-full h-12 text-lg font-bold'
								type='submit'
								disabled={loading}
								variant='default'
							>
								{loading ? 'Logging in...' : 'LOG IN'}
							</Button>
							<div className='mt-6 text-center text-white border-t border-gray-700 pt-4'>
								<p className='mb-2'>
									New to Mayflix?{' '}
									<a href='/register' className='text-blue-400 underline hover:text-blue-300'>
										Sign up now.
									</a>
								</p>
								<p className='text-sm'>
									This page is protected by Google reCAPTCHA to ensure you're not a bot.{' '}
									<a
										href='https://www.google.com/recaptcha'
										className='text-blue-400 underline hover:text-blue-300'
									>
										Learn more.
									</a>
								</p>
							</div>
							<div className='text-center text-sm text-gray-400'>
								<button
									type='button'
									className='text-[#f5242e] hover:text-[#f5242e] focus:outline-none'
									onClick={() => setIsForgotPassword(true)}
								>
									Forgot your password?
								</button>
							</div>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}
