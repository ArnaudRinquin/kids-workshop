import { Link } from "react-router-dom";
import "@/app.css";

export default function Home() {
  return (
    <main className="container mx-auto">
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pb-12">Kids & Workshops</h1>
      <div className="flex items-center justify-center gap-x-12">
        <Link
          to="/kids"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Kids
        </Link>
        <Link
          to="/workshops"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-5 py-5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Workshops
        </Link>
      </div>
    </main>
  );
}
