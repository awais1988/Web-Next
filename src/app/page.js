import Link from "next/link";

export default function Home() {
  return (
    <section className="text-center py-20">
      <h1 className="text-4xl font-bold mb-6">
        Welcome to <span className="text-green-600">AEON</span>
      </h1>
      <Link
        href="/login"
        className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition"
      >
        Begin Assessment
      </Link>
    </section>
  );
}
