import ResetPasswordForm from "./_components/ResetPasswordForm";

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="p-4">
        <a
          href="/signin"
          className="inline-flex items-center gap-1 text-sm font-medium"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Sign In
        </a>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6 relative">
        <div className="absolute -z-10 w-72 h-72 rounded-full bg-swift-purple/10 blur-3xl top-10 right-10"></div>
        <div className="absolute -z-10 w-96 h-96 rounded-full bg-swift-blue/10 blur-3xl -bottom-20 -left-20"></div>

        <div className="w-full max-w-md rounded-xl bg-white/80 backdrop-blur-md p-8 shadow-lg border border-white/20">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
}
