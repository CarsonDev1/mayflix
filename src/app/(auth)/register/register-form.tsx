'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import api from '@/utils/api';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';

const schema = z
	.object({
		name: z.string().min(1, { message: 'Name is required' }),
		email: z.string().email({ message: 'Invalid email address' }),
		password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords don't match",
		path: ['confirmPassword'],
	});

type FormData = z.infer<typeof schema>;

const RegisterForm = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const onSubmit = async (data: FormData) => {
		if (data.password !== data.confirmPassword) {
			setError('confirmPassword', {
				type: 'manual',
				message: "Passwords don't match",
			});
			return;
		}
		setLoading(true);
		try {
			const response = await api.post('v1/auth/register', {
				name: data.name,
				email: data.email,
				password: data.password,
			});

			if (response?.data.status === 400) {
				toast.error(response.data.message);
			} else {
				toast.success('Registration successful!');
				router.push('/login');
			}
		} catch (err: any) {
			toast.error(err.response?.data?.message || 'Registration failed');
			console.error('Registration error:', err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='relative container flex items-center justify-center pt-16 sm:pt-24 md:pt-28 lg:pt-32'>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='bg-black/60 bg-opacity-80 p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg w-full max-w-lg relative z-10'
			>
				<h2 className='text-white text-2xl sm:text-3xl mb-6 text-center font-bold'>Create Account</h2>
				<div className='space-y-3'>
					<div>
						<Input
							className='h-12 bg-white text-black placeholder:text-gray-500 text-base sm:text-lg'
							placeholder='Full Name'
							type='text'
							{...register('name')}
						/>
						{errors.name && <p className='text-red-500'>{errors.name.message}</p>}
					</div>

					<div>
						<Input
							className='h-12 bg-white text-black placeholder:text-gray-500 text-base sm:text-lg'
							placeholder='Email'
							type='email'
							{...register('email')}
						/>
						{errors.email && <p className='text-red-500'>{errors.email.message}</p>}
					</div>

					<div className='flex flex-col gap-1'>
						<div className='relative'>
							<Input
								className='h-12 bg-white text-black placeholder:text-gray-500 text-base sm:text-lg'
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

					<div className='flex flex-col gap-1'>
						<div className='relative'>
							<Input
								className='h-12 bg-white text-black placeholder:text-gray-500 text-base sm:text-lg'
								placeholder='Confirm Password'
								type={showConfirmPassword ? 'text' : 'password'}
								{...register('confirmPassword')}
							/>
							<span
								className='absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer'
								onClick={() => setShowConfirmPassword((prev) => !prev)}
							>
								{showConfirmPassword ? '👁️' : '👁️‍🗨️'}
							</span>
						</div>
						{errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
					</div>

					<div className='mt-6 flex flex-col gap-2'>
						<Button variant='default' className='w-full h-12' type='submit' disabled={loading}>
							{loading ? 'Registering...' : 'REGISTER'}
						</Button>
					</div>
				</div>
				<div className='mt-6 text-center text-white border-t border-gray-700 pt-4'>
					<p className='mb-2'>
						Already have an account?{' '}
						<a href='/login' className='text-blue-400 underline hover:text-blue-300'>
							Log in.
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
			</form>
		</div>
	);
};

export default RegisterForm;
