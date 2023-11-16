import Image from "next/image"

import TitleCard from "@/components/Homepage/TitleCard";
import Title from "@/components/UI/Title";
import MealSlider from "@/components/Homepage/MealSection/MealSlider";

import BackgroundImage from "@/assets/LunchInPoster.png";

export default function Home() {

  return (
   <>
    <section className="w-full block h-[60vh] overflow-hidden">
      <Image src={BackgroundImage} alt="lunchin poster" className="w-full h-screen z-10 absolute top-0 left-0"/>
      <TitleCard />
    </section>
    <section className="mx-auto w-3/4">
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
