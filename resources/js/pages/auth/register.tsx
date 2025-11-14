import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout title="" description="">
            <Head title="Register" />

            {/* Centered Card */}
            <div className="relative max-w-md mx-auto mt-12 p-10 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/10 border border-white/20 text-white">

                {/* Welcome Header */}
                <h1 className="text-center text-4xl font-extrabold tracking-wide mb-2">
                    WELCOME TO <span className="text-yellow-300">WELANCER</span>
                </h1>
                <p className="text-center text-gray-200 text-sm mb-8">
                    Enter your details to create an account
                </p>

                <Form
                    {...store.form()}
                    resetOnSuccess={['password', 'password_confirmation']}
                    disableWhileProcessing
                    className="flex flex-col gap-6"
                >
                    {({ processing, errors }) => (
                        <>
                            <div className="grid gap-6">

                                {/* Name */}
                                <div className="grid gap-2">
                                    <Label htmlFor="name" className="text-white">
                                        Full Name
                                    </Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        required
                                        autoFocus
                                        placeholder="Your full name"
                                        className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="text-white">
                                        Email address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="email@example.com"
                                        className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="text-white">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        placeholder="Password"
                                        className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                {/* Confirm Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation" className="text-white">
                                        Confirm Password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        name="password_confirmation"
                                        required
                                        placeholder="Confirm Password"
                                        className="bg-white/20 text-white placeholder:text-gray-300 border-white/30"
                                    />
                                    <InputError message={errors.password_confirmation} />
                                </div>

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    className="mt-2 w-full py-3 text-lg font-semibold bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl"
                                    disabled={processing}
                                >
                                    {processing && <Spinner />}
                                    Create account
                                </Button>
                            </div>

                            {/* Login Link */}
                            <div className="text-center text-sm text-gray-200 mt-4">
                                Already have an account?{' '}
                                <TextLink href={login()} className="text-yellow-300 hover:underline">
                                    Log in
                                </TextLink>
                            </div>
                        </>
                    )}
                </Form>
            </div>
        </AuthLayout>
    );
}
