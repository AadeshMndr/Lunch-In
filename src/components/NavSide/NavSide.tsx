"use client";

import { useContext, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ChevronLeft, Soup, UserCircle, FileSignature, Map, Users } from "lucide-react";

import { AppContext } from "../Providers/context";
import { useWindowDimension } from "@/hooks/dimension";
import NavElem from "./NavElem";
import Logo from "./Logo/Logo";

interface Props {}

const NavSide: React.FC<Props> = () => {
  const { open, setOpen } = useContext(AppContext);
  const [adminOptions, setAdminOptions] = useState<boolean>(false);

  const { scrollY } = useScroll();
  const { height, width } = useWindowDimension();

  const scrollVariable = useTransform(
    scrollY,
    [0, height * 3],
    [0, height * 3]
  );
  const rotateVariable = useTransform(
    scrollY,
    [0, height * 3],
    [0, open ? 0 : 360 * 2]
  );

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            key="open"
            style={{ translateY: scrollVariable, rotate: "0deg" }}
            className="mobile:w-[50%] pc:w-[20%] absolute z-50 top-4 right-4 bg-gradient-to-bl from-primaryOrange to-primaryBrown p-2 to-20% rounded-md flex flex-col justify-start gap-y-3 items-stretch border-orange-900 border-2"
            id="NavSide"
            initial={{
              clipPath: "circle(0% at 100% 0%)",
              borderRadius: "100%",
            }}
            animate={{
              clipPath: "circle(150% at 100% 0%)",
              borderRadius: "6px",
            }}
            transition={{ duration: 0.3 }}
            exit={{ clipPath: "circle(10% at 70% 50%)", opacity: 0.3 }}
          >
            <div className="flex flex-row items-center">
              <ChevronLeft
                width={20}
                height={20}
                className="text-primaryBrown300 self-start"
                onClick={() => setOpen(false)}
              />
              <span
                onDoubleClick={() => {
                  setAdminOptions((prevState) => !prevState);
                }}
                className="hover:cursor-default select-none text-orange-900 font-bubblegum text-lg text-center flex-1"
              >
                Welcome!
              </span>
            </div>
            <NavElem
              href="/menu"
              Icon={<Soup width={30} height={30} />}
              text="Menu"
            />
            <NavElem
              href="/review"
              Icon={<UserCircle width={30} height={30} />}
              text="Reviews"
            />
            <NavElem
              href="/"
              Icon={<Map width={30} height={30} />}
              text="Location"
            />
            <NavElem
              href="/"
              Icon={<Users width={30} height={30} />}
              text="Socials"
            />
            {adminOptions && (
              <NavElem
                href="/edit"
                Icon={<FileSignature width={30} height={30} />}
                text="Edit"
              />
            )}
          </motion.div>
        ) : (
          <motion.div
            key="close"
            style={{ translateY: scrollVariable, rotate: rotateVariable }}
            className="w-20 h-20 overflow-hidden rounded-full absolute z-50 top-4 right-4 hover:cursor-pointer hover:ring-4 hover:ring-primaryOrange"
            onClick={() => setOpen((prevState) => !prevState)}
            initial={{ rotate: "45deg" }}
            animate={{ rotate: "0deg", opacity: 1, scale: 1 }}
            exit={{ rotate: "360deg", opacity: 0.2, scale: 0.2 }}
          >
            <Logo />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavSide;
