import Image from "next/image";

type RightSectionElementProps = {
  text: string;
  src: string;
  onClick?: () => void;
};

export default function RightSectionElement({
  text,
  src,
  onClick,
}: RightSectionElementProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-between p-2 rounded-md w-full text-left hover:bg-gray-100 transition"
    >
      <div className="flex items-center space-x-3">
        <Image src={src} alt={text} width={24} height={24} />
        <span className="relative text-base font-medium after:block after:h-[2px] after:w-0 after:bg-gray-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 hover:after:w-full">
          {text}
        </span>
      </div>
    </button>
  );
}
