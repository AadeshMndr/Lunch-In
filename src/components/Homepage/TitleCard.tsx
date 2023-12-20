"use client";

import { motion, MotionValue } from "framer-motion";

import Title from "../UI/Title";

interface Props {
    scrollValue: MotionValue<number>;
}   

const TitleCard: React.FC<Props> = ({ scrollValue }) => {
    return (
        <motion.div style={{ translateY: scrollValue }} className="z-20 left-[8%] absolute top-10 sm:left-[37%] bg-primaryBrown rounded-lg shadow-md shadow-primaryBrown200 p-10">
            <Title size={"large"} colorScheme={"primary"}>LUNCH IN</Title>
            <p className="text-center italic font-sans">Grab a quick and delicious meal!</p>
        </motion.div>
    )
}

export default TitleCard