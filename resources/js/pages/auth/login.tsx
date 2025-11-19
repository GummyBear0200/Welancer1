import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Form, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
}

export default function Login({ status, canResetPassword, canRegister }: LoginProps) {
    return (
        <AuthLayout title="" description="">
            <Head title="Log in" />

            {/* Centered Login Card */}
            <div className="min-h-screen flex items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative w-full max-w-md bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-10"
                >
                    {/* Welcome Header */}
                    <h1 className="text-4xl font-extrabold text-center mb-2 text-gray-900 dark:text-white">
                        WELCOME TO <span className="text-yellow-400">WELANCER</span>
                    </h1>
                    <p className="text-center text-gray-500 dark:text-gray-300 mb-8">
                        Enter your login details to continue
                    </p>

                    {/* Login Form */}
                    <Form {...store.form()} resetOnSuccess={['password']} className="space-y-6">
                        {({ processing, errors }) => (
                            <>
                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-gray-700 dark:text-gray-200">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        placeholder="email@example.com"
                                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="password" className="text-gray-700 dark:text-gray-200">
                                            Password
                                        </Label>
                                        {canResetPassword && (
                                            <TextLink
                                                href={request()}
                                                className="text-sm text-yellow-400 hover:underline"
                                            >
                                              
                                            </TextLink>
                                        )}
                                    </div>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Password"
                                        className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-300 border border-gray-300 dark:border-gray-600 rounded-lg"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center space-x-2">
                                    <Checkbox id="remember" name="remember" />
                                    <Label htmlFor="remember" className="text-gray-700 dark:text-gray-200">
                                        Remember me
                                    </Label>
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-xl shadow-lg"
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Log in
                                </Button>
                            </>
                        )}
                    </Form>

                    {/* Register */}
                    {canRegister && (
                        <p className="text-center text-gray-500 dark:text-gray-300 mt-4">
                            Don’t have an account?{' '}
                            <TextLink href={register()} className="text-yellow-400 hover:underline">
                                Sign up
                            </TextLink>
                        </p>
                    )}

                    {/* Status */}
                    {status && <p className="text-center text-green-500 mt-4">{status}</p>}
                </motion.div>
            </div>
        </AuthLayout>
    );
}
    