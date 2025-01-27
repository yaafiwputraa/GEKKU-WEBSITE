// app/(auth)/register/page.tsx
import { AuthForm } from "@/components/auth/auth-form"

export default function RegisterPage() {
  return (
    <div className="container relative min-h-[calc(100vh-4rem)] flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <h1 className="text-xl font-light tracking-widest">GEKKU DESIGN</h1>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-light tracking-tight">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email below to create your account
            </p>
          </div>
          <AuthForm mode="register" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <a 
              href="/login" 
              className="hover:text-brand underline underline-offset-4"
            >
              Already have an account? Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

