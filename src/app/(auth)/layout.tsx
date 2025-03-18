// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="w-full bg-green-200">
//       <div className="bg-white w-full rounded-xl tablet:p-10">{children}</div>
//     </main>
//   );
// }

import Aside from "../components/Aside";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full  flex  items-start justify-center">
      <div className="w-full  flex items-center justify-center">
        <div className="w-full lg:w-[49.05%] bg-white">{children}</div>
        <div className=" w-[50.95%] flex items-center justify-center">
          <Aside />
        </div>
      </div>
    </main>
  );
}

//w-[49.12%]
