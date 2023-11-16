"use client";

import { useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useAnimate } from "framer-motion";

import { Meal } from "@/models/Meal";
import { useWindowDimension } from "@/hooks/dimension";

interface Props {
  meal: Meal;
  index: number;
}

const MealBox: React.FC<Props> = ({ meal: { name, image, id }, index }) => {
  const { width } = useWindowDimension();
  const router = useRouter();
  const [scope, animate] = useAnimate<HTMLDivElement>();

  const isMobile = useMemo(() => width < 500, [width]);

  const goToSpecificMenu = () => {
    router.push(`/menu?${id}`);
  };

  const showTheCard = () => {
    if (isMobile) {
      animate(`#meal-${id}`, {
        scale: 1.15,
        position: "absolute",
        left: width / 4 + index * 75,
        top: "50px",
        width: "200px",
        zIndex: 50,
        boxShadow: "0px 0px 10px black",
        backgroundColor: "rgb(212, 142, 93)",
      });
    }
  };

  return (
    <div
      ref={scope}
      onContextMenu={(event) => {
        event.preventDefault();
      }}
    >
      <motion.div
        id={`meal-${id}`}
        onClick={goToSpecificMenu}
        whileHover={
          isMobile
            ? {
                scale: 1.15,
                position: "absolute",
                left: width / 4 + index * 75,
                top: "50px",
                width: "200px",
                zIndex: 50,
                boxShadow: "0px 0px 10px black",
                backgroundColor: "rgb(212, 142, 93)",
              }
            : {
                x: [
                  -50 - index * 75,
                  -100 - index * 75,
                  -50 - index * 75 + (index !== 0 ? 0 : 25),
                ],
                scale: 1.15,
                zIndex: 40,
                rotateY: ["5deg", "10deg", "5deg", "0deg"],
                boxShadow: "0px 0px 10px black",
                backgroundColor: "rgb(212,142,93)",
              }
        }
        transition={isMobile ? { delay: 0.2 } : { stiffness: 100 }}
        initial={{ x: -index * 75 }}
        className="p-3 shadow-shadowLeft rounded-md bg-gradient-to-r from-[rgb(212,142,93)] to-[rgba(212,143,93,0.14)] text-center"
      >
        <div className="w-44 h-44 overflow-hidden rounded-md">
          <Image
            src={image}
            alt={name}
            width={176}
            height={176}
            priority={true}
          />
        </div>
        <span className="text-xl font-semibold text-center mt-4">{name}</span>
      </motion.div>
    </div>
  );
};

export default MealBox;
