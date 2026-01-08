import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="backdrop-blur-xs">

    <div className="flex justify-between items-center mt-4 mr-10 ml-20 mb-4">
      <h1 className="text-2xl text-white">MOHABBAT CLOTHING</h1>
      <div className="flex gap-4 ">
        <Link href="https://www.instagram.com/mohabbat_clothing/" target="_blank"><Image src="/insta-logo.png" className="rounded-4xl" alt="logo" width={25} height={25} /></Link>
        <div className="bg-white rounded-4xl"><Link href=""><Image src="/fb-logo.svg" alt="logo" width={25} height={25} /></Link></div>
        <Link href="/contact"><Image src="/x.jpg"  className="rounded-4xl" alt="logo" width={25} height={25} /></Link>
      </div>
    </div>
    </div>
  );
};