"use client";

import Image from "next/image"

import TitleCard from "@/components/Homepage/TitleCard";
import Title from "@/components/UI/Title";
import MealSlider from "@/components/Homepage/MealSection/MealSlider";
import NavSide from "@/components/NavSide/NavSide";


import BackgroundImage from "@/assets/LunchInPoster.png";

//Right now the NavSide doesn't close once open, and also the menuSlider doesn'e close when clicked outside so maybe make a useContext to handle both of them. For this just use a context wrapper or make the context in the main home page because we are going to make the home page a client component/page anyway later when we use framer motion, thus make both the mealSlider view and the NavSide close when clicked outside.

export default function Home() {

  return (
   <>
   <NavSide />
    <section id="background-image" className="w-full block mobile:h-[50vh] pc:h-[70vh] overflow-hidden">
      <Image priority={true} src={BackgroundImage} alt="lunchin poster" className="w-full mobile:h-[80vh] pc:h-screen z-10 absolute top-0 left-0"/>
      <TitleCard />
    </section>
    <section className="mx-auto w-3/4 mt-14">
      <Title size={"large"} spaceScheme={"spaceBelow"}>Welcome to Lunch In !</Title>
      <p className="font-cursive text-3xl text-center">{`"Pickup your tasty meal kerbside or take your time enjoying our service."`}</p>
    </section>
    <section className="block mt-36 relative"> 
      <Title size={"large"} spaceScheme={"spaceBelow"}>Savor to the fullest !</Title>
      <MealSlider />
    </section>
    <section className="block mt-9">
      <Title size={"large"} spaceScheme={"spaceBelow"}>Come visit Us</Title>
      <p className="text-center">The map will be here!</p>
    </section>
    <section className="block mt-36">
      <Title size={"large"} spaceScheme={"spaceBelow"}>Social Media and Contacts</Title>
      <p className="text-center">The social media links will go here!</p>
    </section>
   </>
  )
}
