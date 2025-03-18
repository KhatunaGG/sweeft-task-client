import Image from "next/image";

const Aside = () => {
  return (
    <div className='w-full  min-h-screen relative'>
      {/* <Image src={"/assets/img.png"} alt={""} fill /> */}
      <Image
        src="/assets/img.png"
        alt="Image description" // Add a descriptive alt text
        fill
        priority // This helps load the image as soon as possible (important for LCP)
        sizes="(max-width: 768px) 100vw, 50vw" // Add sizes for responsive images (adjust based on layout)
      />

    </div>
  )
}

export default Aside