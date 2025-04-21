import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center gap-2 p-3 bg-white shadow-sm sticky top-0 z-50">
      <Image src="/images/home-button-1.svg" alt="Home icon" width={24} height={24} />
      <span className="text-blue-600 font-bold text-2xl">Back to home</span>
    </div>
  );
}
