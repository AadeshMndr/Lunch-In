"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

import { useWindowDimension } from "@/hooks/dimension";
import TitleCard from "@/components/Homepage/TitleCard";
import Title from "@/components/UI/Title";
import MealSlider from "@/components/Homepage/MealSection/MealSlider";
import NavSide from "@/components/NavSide/NavSide";
import GoogleMaps from "@/components/UI/Map";
import Media from "@/components/Homepage/Media";
import OpeningTime from "@/components/Homepage/OpeningTime";

import BackgroundImage from "@/assets/LunchInPoster.png";


export default function Home() {
  const { scrollY } = useScroll();

  const { width } = useWindowDimension();

  const scrollVariable = useTransform(
    scrollY,
    [0, 100],
    [0, width > 500 ? -280 : -200]
  );

  const reverseScrollVariable = useTransform(
    scrollY,
    [0, 400, 700],
    [0, width > 500 ? 700 : 600, width > 500 ? 700 : 600]
  );

  const welcomeVariable = useTransform(
    scrollY,
    [0, 100, 400],
    [-500, width > 500 ? -200 : -210, -200]
  );

  const topShadeVariable = useTransform(
    scrollY,
    [0, 200],
    [-400, width > 500 ? 320 : 270]
  );

  const opacityValue = useTransform(scrollY, [0, 100, 200], [1, 1, 0]);

  return (
    <div className="bg-gradient-to-b from-primaryBrown to-[#af6e3f] from-50%">
      <NavSide />
      <motion.div
        style={{ translateY: topShadeVariable, rotate: "180deg" }}
        className="custom-shape-divider-top-1703073171 z-20 relative"
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
      </motion.div>
      <motion.section
        id="background-image"
        className="w-full block mobile:h-[60vh] pc:h-[70vh] overflow-hidden relative z-10"
        style={{ translateY: reverseScrollVariable }}
      >
        <Image
          priority={true}
          src={BackgroundImage}
          alt="lunchin poster"
          className="w-full mobile:h-[80vh] pc:h-screen absolute top-0 left-0"
        />
        <TitleCard scrollValue={reverseScrollVariable} opacityValue={opacityValue}/>
      </motion.section>
      <motion.section
        style={{ translateY: scrollVariable }}
        className="relative z-20 custom-shape-divider-bottom-1703067560"
      >
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            className="shape-fill"
          ></path>
        </svg>
        <motion.div
          className="mx-auto mobile:w-full pc:w-3/4 z-40 relative"
          style={{ translateY: welcomeVariable }}
        >
          <Title size={"large"} spaceScheme={"spaceBelow"} className="relative z-40 mobile:w-3/4 mx-auto">
            Welcome to Lunch In !
          </Title>
          <p className="z-40 font-cursive mobile:text-2xl pc:text-3xl text-center">{`"Pickup your tasty meal kerbside or take your time enjoying our service."`}</p>
        </motion.div>
      </motion.section>
      <section className="block relative z-20 mobile:-translate-y-44">
        <Title
          size={"large"}
          spaceScheme={"spaceBelow"}
          className="bg-primaryBrown max-w-max w-3/5 p-4 rounded-lg mx-auto"
        >
          Savor to the fullest !
        </Title>
        <MealSlider />
      </section>
      <section className="block pc:mt-16 mobile:-translate-y-24" id="location">
        <Title size={"large"} spaceScheme={"spaceBelow"}>
          Come visit Us
        </Title>
        <GoogleMaps />
      </section>
      <section className="block pc:mt-16 pc:pt-6 mobile:-translate-y-10 mb-4" id="socials">
        <Title size={"large"} spaceScheme={"spaceBelow"}>
          Contact Us
        </Title>
        <OpeningTime />
        <Media />
      </section>
    </div>
  );
}
