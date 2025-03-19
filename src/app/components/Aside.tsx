import Image from "next/image";

const Aside = () => {
  return (
    <section className="w-full  min-h-screen relative">
      {/* <Image src={"/assets/img.png"} alt={""} fill /> */}
      <Image
        src="/assets/img.png"
        alt="Image description"
        fill
        priority
        sizes="(max-width: 768px) 100vw, 50vw"
      />
    </section>
  );
};

export default Aside;
