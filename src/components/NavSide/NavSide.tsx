"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import { useWindowDimension } from "@/hooks/dimension";
import Logo from "./Logo/Logo";

interface Props {}

const NavSide: React.FC<Props> = () => {
  const [open, setOpen] = useState<boolean>(false);

  const { scrollY } = useScroll();
  const { height, width } = useWindowDimension();

  const scrollVariable = useTransform(
    scrollY,
    [0, height * 3],
    [0, height * 3]
  );
  const rotateVariable = useTransform(scrollY, [0, height * 3], [0, open ? 0 : 360 * 2]);

  return open ? (
    <motion.div
      style={{ translateY: scrollVariable, rotate: 0 }}
      className="w-[50%] absolute z-50 top-4 right-4 bg-primaryBrown p-2 rounded-md flex flex-col justify-start gap-y-3 items-stretch"
    >
        <div className="flex flex-row items-center">
            <ChevronLeft width={20} height={20} className="text-primaryBrown300" />
        <div className="text-primaryBrown300 font-bubblegum text-lg text-center">Welcome! Take a tour!</div></div>
      Some Nav Options
    </motion.div>
  ) : (
    <motion.div
      style={{ translateY: scrollVariable, rotate: rotateVariable }}
      className="w-20 h-20 overflow-hidden rounded-full absolute z-50 top-4 right-4 hover:cursor-pointer hover:ring-4 hover:ring-primaryOrange"
      onClick={() => setOpen((prevState) => !prevState)}
    >
      <Logo />
    </motion.div>
  );
};

export default NavSide;
