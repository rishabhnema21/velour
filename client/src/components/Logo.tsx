import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <div className="shrink-0 rounded-full">
      <Link
        href="/"
        className="text-2xl font-medium tracking-tight flex items-center"
      >
        <Image
          src="/velour.png"
          alt="logo"
          height={70}
          width={70}
          className="rounded-full"
        />
        <h2 className="text-neutral-200">velour.</h2>
      </Link>
    </div>
  );
};

export default Logo;
