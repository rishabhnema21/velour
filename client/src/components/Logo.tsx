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
          height={41}
          width={41}
          className="rounded-full"
        />
        <h2 className="text-neutral-800 text-3xl  font=[urbanist]">velour.</h2>
      </Link>
    </div>
  );
};

export default Logo;
