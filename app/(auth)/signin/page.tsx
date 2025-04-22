import BackBtn from "@/src/components/custom/BackBtn";
import { SignInForm } from "./_components/SignInForm";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4">
        <BackBtn />
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="w-full max-w-md rounded-xl bg-white/80 backdrop-blur-md p-8 shadow-lg border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
              Welcome back to SwiftPay
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Sign in to access your account
            </p>
          </div>

          <SignInForm />

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-swift-purple hover:text-swift-dark-purple font-medium"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
