// import Image from "next/image";
import Dashboard from "./components/Dashboard";

export default function Home() {
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    // </div>

    <div className="w-full  min-h-screen flex items-center justify-center">
      <Dashboard />
    </div>
  );
}
