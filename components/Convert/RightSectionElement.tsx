import Image from "next/image";
import Link from "next/link";

type RightSectionElementProps = {
  text: string;
  src: string;
};

export default function RightSectionElement({text,src,}: RightSectionElementProps) {
  return (
    <Link
      href="#"
      className="flex items-center justify-between hover:bg-[#E6E6ED] p-2 rounded-md"
    >
      <div className="flex items-center space-x-3">
        <Image src={src} alt="" width={24} height={24} />
        <span className="text-base font-medium">{text}</span>
      </div>
    </Link>
  );
}
