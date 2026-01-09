import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="backdrop-blur-xs">
      <div className="flex justify-between items-center mt-4 mr-10 ml-10 mb-4">
        <h1 className="text-sm sm:text-xl lg:text-2xl text-white font-montserrat">
          MOHABBAT CLOTHING
        </h1>

        <div className="flex gap-4 items-center">
          <Link
            href="https://www.instagram.com/mohabbat_clothing/"
            target="_blank"
          >
            <Image
              src="/instagram-logo-fill.svg"
              alt="Instagram"
              width={24}
              height={24}
              className="invert rounded-4xl w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </Link>

          <Link href="">
            <Image
              src="/facebook-logo-fill.svg"
              alt="Facebook"
              width={24}
              height={24}
              className="invert w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </Link>

          <Link href="">
            <Image
              src="/x-logo-fill.svg"
              alt="X"
              width={24}
              height={24}
              className="invert w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
