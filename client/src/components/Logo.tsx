import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="shrink-0 ml-2 rounded-full select-none">
      <Link
        href="/"
        className="text-2xl font-medium tracking-tight flex items-center"
      >
        <Image
          src="/Logo.png"
          alt="logo"
          height={50}
          width={50}
          className="rounded-full"
        />
        <h2 className="text-neutral-800  font=[urbanist]">velour.</h2>
      </Link>
    </div>
  );
};

export default Logo;
