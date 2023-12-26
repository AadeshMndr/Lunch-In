"use client";

import { motion, MotionValue } from "framer-motion";

import Title from "../UI/Title";

interface Props {
  scrollValue: MotionValue<number>;
  opacityValue: MotionValue<number>;
}

const TitleCard: React.FC<Props> = ({ scrollValue, opacityValue }) => {
  return (
    <motion.div
      style={{ translateY: scrollValue, opacity: opacityValue }}
      className="z-20 w-full absolute top-10 flex justify-center items-center"
    >
      <div className="bg-primaryBrown rounded-lg shadow-md shadow-primaryBrown200 p-10 w-fit">
        <Title size={"large"} colorScheme={"primary"}>
          LUNCH IN
        </Title>
        <p className="text-center italic font-sans">
          Grab a quick and delicious meal!
        </p>
      </div>
    </motion.div>
  );
};

export default TitleCard;
