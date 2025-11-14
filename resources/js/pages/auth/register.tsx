import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
  return (
    <AuthLayout title="Create your account" description="Join Welancer and start freelancing today.">
      <Head title="Register" />

      {/* Clean White Background */}
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">

          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200"
          >
            {/* Logo & Title */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl shadow-md mb-3"
              >
                <Sparkles className="w-7 h-7 text-black" />
              </motion.div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Welcome to <span className="text-yellow-500">Welancer</span>
              </h1>
              <p className="mt-1 text-gray-600 text-sm">
                Create your account to get started
              </p>
            </div>

            <Form
              {...store.form()}
              resetOnSuccess={['password', 'password_confirmation']}
              disableWhileProcessing
              className="space-y-5"
            >
              {({ processing, errors }) => (
                <>
                  {/* Name */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-1"
                  >
                    <Label htmlFor="name" className="text-gray-800 font-medium">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      required
                      autoFocus
                      placeholder="John Doe"
                      className="h-12 border-gray-300 text-gray-900 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
                               rounded-lg"
                    />
                    <InputError message={errors.name} className="text-red-600 text-xs mt-1" />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="space-y-1"
                  >
                    <Label htmlFor="email" className="text-gray-800 font-medium">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="you@example.com"
                      className="h-12 border-gray-300 text-gray-900 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
                               rounded-lg"
                    />
                    <InputError message={errors.email} className="text-red-600 text-xs mt-1" />
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-1"
                  >
                    <Label htmlFor="password" className="text-gray-800 font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      name="password"
                      required
                      placeholder="••••••••"
                      className="h-12 border-gray-300 text-gray-900 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
                               rounded-lg"
                    />
                    <InputError message={errors.password} className="text-red-600 text-xs mt-1" />
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-1"
                  >
                    <Label htmlFor="password_confirmation" className="text-gray-800 font-medium">
                      Confirm Password
                    </Label>
                    <Input
                      id="password_confirmation"
                      type="password"
                      name="password_confirmation"
                      required
                      placeholder="••••••••"
                      className="h-12 border-gray-300 text-gray-900 placeholder:text-gray-400 
                               focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 
                               rounded-lg"
                    />
                    <InputError message={errors.password_confirmation} className="text-red-600 text-xs mt-1" />
                  </motion.div>

                  {/* Submit Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                  >
                    <Button
                      type="submit"
                      disabled={processing}
                      className="w-full h-12 text-lg font-semibold rounded-lg bg-yellow-400 hover:bg-yellow-500 
                               text-black shadow-md transition-all duration-200 
                               disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {processing ? (
                        <span className="flex items-center justify-center gap-2">
                          <Spinner className="w-5 h-5" />
                          Creating Account...
                        </span>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </motion.div>

                  {/* Login Link */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-center text-sm text-gray-600"
                  >
                    Already have an account?{' '}
                    <TextLink
                      href={login()}
                      className="font-semibold text-yellow-600 hover:text-yellow-700 underline-offset-4 hover:underline"
                    >
                      Log in
                    </TextLink>
                  </motion.p>
                </>
              )}
            </Form>
          </motion.div>
        </div>
      </div>
    </AuthLayout>
  );
}