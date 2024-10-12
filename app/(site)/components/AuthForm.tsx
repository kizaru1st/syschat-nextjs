'use client'

import Button from "@/app/components/Button";
import Input from "@/app/components/input/Input";
import { useCallback, useState } from "react"
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";

type Variant = 'LOGIN' | 'REGISTER'

export default function AuthForm() {
  const [variant, setVariant] = useState<Variant>('LOGIN');
  const [isLoading, setIsLoading] = useState(false);

  const toggleVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const { register, handleSubmit, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === 'REGISTER') {
      // Axios Register
    }

    if (variant === 'LOGIN') {
      // NextAuth SignIn
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true);
    // NextAuth Social SignIn
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              type="text"
              register={register}
              errors={errors}
              required />
          )}
          <Input
            id="email"
            label="Email Address"
            type="text"
            register={register}
            errors={errors}
            required />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            errors={errors}
            required />
            <div>
              <Button type="submit" disabled={isLoading} fullWidth>
                {variant === 'LOGIN' ? 'Sign in' : 'Register'}
              </Button>
            </div>
        </form>
        <div className="mt-6">

          {/* Separate */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Socials Login */}
          <div className="mt-6 grid grid-cols-2 gap-2">
            <div>
              <AuthSocialButton icon={BsGithub} onClick={() => socialAction('github')}/>
            </div>
            <div>
              <AuthSocialButton icon={BsGoogle} onClick={() => socialAction('google')}/>
            </div>
          </div>

          {/* Check user */}
          <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
            <div>
              {variant === 'LOGIN' ? 'New to Messenger?' : 'Already have an account?'}
            </div>
            <div onClick={toggleVariant} className="underline cursor-pointer">
              {variant === 'LOGIN' ? 'Create an account' : 'Login here'}
            </div>
          </div>  

        </div>
      </div>
    </div>
  )
}
