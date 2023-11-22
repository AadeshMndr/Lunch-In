"use client";

import { useRouter } from "next/navigation";
import {
  Plus,
  Utensils,
  UtensilsCrossed,
  Trash,
  MessagesSquare,
  User2,
} from "lucide-react";
import { motion } from "framer-motion";

interface Props {
  text: string;
  iconType: "add" | "edit" | "delete" | "reviews";
  redirectTo: string;
}

const OptionBox: React.FC<Props> = ({ text, iconType, redirectTo }) => {
    const router = useRouter();

  let Icon: React.ReactNode = <></>,
    Caption: React.ReactNode = (
      <span className="text-xl text-center font-bubblegum font-semibold">
        {text}
      </span>
    );

  if (iconType === "add") {
    Icon = (
      <div className="flex justify-center items-center">
        <Plus width={40} height={40} />
        <Utensils width={40} height={40} />
      </div>
    );
  } else if (iconType === "edit") {
    Icon = (
      <div className="flex justify-center items-center">
        <UtensilsCrossed width={45} height={45} />
      </div>
    );
  } else if (iconType === "delete") {
    Icon = (
      <div className="flex justify-center items-center">
        <Trash width={45} height={45} />
      </div>
    );
  } else if (iconType === "reviews") {
    Icon = (
      <div className="flex justify-center items-center flex-col">
        <MessagesSquare width={45} height={45} />
        <User2 width={45} height={45} />
      </div>
    );
  }

  return (
    <motion.div
        onClick={() => router.push(redirectTo)}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 7px rgb(67, 20, 7)" }}
      className="max-h-[175px] flex flex-col justify-center gap-5 items-center p-10 rounded-md border-2 border-orange-950 shadow-lg bg-primaryBrown text-orange-950"
    >
      {Icon} {Caption}
    </motion.div>
  );
};

export default OptionBox;
