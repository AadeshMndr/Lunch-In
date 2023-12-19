// "use client";

import Image from "next/legacy/image";

import LogoPic from "@/assets/Logo.png";

interface Props {}

const Logo: React.FC<Props> = () => {

  return (
      <Image
        src={LogoPic}
        alt="lunchin"
        className="w-20 h-20"
        layout="fill"
        objectFit="cover"
        id="Logo"
      />
  );
};

export default Logo;
