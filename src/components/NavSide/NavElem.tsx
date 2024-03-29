"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";

import { AppContext } from "../Providers/context";

interface Props {
  text: string;
  Icon: JSX.Element;
  href: string;
}

const NavElem: React.FC<Props> = ({ Icon, text, href }) => {
  const { setOpen } = useContext(AppContext);

  const router = useRouter();

  return (
    <div
      onClick={() => {
        setOpen(false);
        router.push(href);
      }}
      className="hover:cursor-pointer active:scale-95 active:bg-primaryOrange active:border-primaryOrange active:text-primaryBrown text-primaryOrange flex flex-row items-center border-orange-900 border-2 rounded-md"
    >
      <div className="ml-3 self-start">{Icon}</div>
      <span className="font-cursive text-2xl flex-1 text-center">{text}</span>
    </div>
  );
};

export default NavElem;
