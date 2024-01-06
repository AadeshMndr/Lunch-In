"use client";

import { useContext } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

import { AppContext } from "../Providers/context";
import { Recommendation } from "@/models/Review";

interface Props {
  recommendation: Recommendation;
}

const RecommendationBox: React.FC<Props> = ({
  recommendation: { image, name, id },
}) => {
  const { setSelectedMeal } = useContext(AppContext);
  const router = useRouter();

  return (
    <motion.div
      whileHover={{ translateY: -16 }}
      onClick={() => {
        setSelectedMeal(id);
        router.push("/menu");
      }}
      className="p-2 flex flex-col justify-center items-center active:scale-95"
    >
      <div className="h-36 w-36 rounded-md overflow-hidden relative">
        <Image src={image} alt={name} layout="fill" objectFit="cover" />
      </div>
      <div className="text-orange-950 font-bubblegum text-lg">{name}</div>
    </motion.div>
  );
};

export default RecommendationBox;
