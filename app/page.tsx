import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Gaming Tournament App</h1>
      <p className="text-lg mb-6">Sign in to view available tournaments.</p>
      <Link href="/sign-in">
        <button className="px-6 py-2 bg-blue-600 rounded-lg">Sign In</button>
      </Link>
    </div>
  );
}
