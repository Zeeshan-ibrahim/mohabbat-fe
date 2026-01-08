import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="backdrop-blur-xs">

    <div className="flex justify-between items-center mt-4 mr-10 ml-20 mb-4">
      <h1 className="text-2xl text-white font-montserrat">MOHABBAT CLOTHING</h1>
      <div className="flex gap-4 ">
        <Link href="https://www.instagram.com/mohabbat_clothing/" target="_blank"><Image src="/instagram-logo-fill.svg" className="invert rounded-4xl" alt="logo" width={30} height={30} /></Link>
        <Link href=""><Image className="invert" src="/facebook-logo-fill.svg" alt="logo" width={30} height={30} /></Link>
        <Link href=""><Image className="invert" src="/x-logo-fill.svg" alt="logo" width={30} height={30} /></Link>
      </div>
    </div>
    </div>
  );
};