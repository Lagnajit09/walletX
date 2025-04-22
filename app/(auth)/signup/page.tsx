import BackBtn from "@/src/components/custom/BackBtn";
import { SignUpForm } from "./_components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4">
        <BackBtn />
      </header>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative">
        <div className="w-full max-w-md rounded-xl bg-white/80 backdrop-blur-md p-8 shadow-lg border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-swift-purple to-swift-blue bg-clip-text text-transparent">
              Create your SwiftPay account
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              Start sending and receiving money instantly
            </p>
          </div>

          <SignUpForm />

          <div className="mt-4 text-center text-sm">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-swift-purple hover:text-swift-dark-purple font-medium"
              >
                Sign in
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
