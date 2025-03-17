// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <main className="flex justify-center min-h-screen bg-white tablet:bg-inherit tablet:items-center">
//       <div className="h-full w-full p-8 flex flex-col gap-y-16 tablet:gap-y-[51px] tablet:max-w-[30rem] tablet:items-center tablet:p-0">
//         <div className="bg-white w-full rounded-xl tablet:p-10">{children}</div>
//       </div>
//     </main>
//   );
// }



export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full bg-green-200">
      <div className="bg-white w-full rounded-xl tablet:p-10">{children}</div>
    </main>
  );
}
