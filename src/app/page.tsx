import Image from "next/image"

import TitleCard from "@/components/Homepage/TitleCard";
import Title from "@/components/UI/Title";
import MealSlider from "@/components/Homepage/MealSection/MealSlider";


import BackgroundImage from "@/assets/LunchInPoster.png";

//Optimistic Updating is remaining in edit : change meal part, then use actual data rather then dummy data in menu and manage viewing the specific data in the top of the menu page when working with actual data, cause for some reason it didn't work in temporary implementation.

export default async function Home() {

  return (
   <>
    <section className="w-full block mobile:h-[50vh] pc:h-[70vh] overflow-hidden">
      <Image src={BackgroundImage} alt="lunchin poster" className="w-full mobile:h-[80vh] pc:h-screen z-10 absolute top-0 left-0"/>
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
