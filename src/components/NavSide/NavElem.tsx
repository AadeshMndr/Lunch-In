"use client";

import { useRouter } from "next/navigation";

interface Props {
    text: string;
    Icon: JSX.Element;
    href: string;
}

const NavElem: React.FC<Props> = ({ Icon, text, href }) => {

    const router = useRouter();

  return (
    <div onClick={() => router.push(href)} className="active:scale-95 active:bg-primaryOrange active:border-primaryOrange active:text-primaryBrown text-primaryOrange flex flex-row justify-evenly items-center border-orange-900 border-2 rounded-md">
      { Icon }
      <span className="font-cursive text-2xl">{text}</span>
    </div>
  );
};

export default NavElem;
