import LoginForm from "../auth/LoginForm";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900 text-white">
      <div className="bg-zinc-800/70 p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to your TMDB account
        </h1>

        <LoginForm />

        <div className="mt-6 text-center">
          <a
            href="https://www.themoviedb.org/signup"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 hover:underline"
          >
            Don’t have an account? Sign up here
          </a>
        </div>
      </div>
    </div>
  );
}
