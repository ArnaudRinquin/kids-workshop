import { Link } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import "@/app.css";

export default function Home() {
  return (
    <main className="container mx-auto">
      <PageTitle text="Kids & Workshops" />
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
