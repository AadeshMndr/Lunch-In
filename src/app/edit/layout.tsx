"use client";

import { signOut } from "next-auth/react";

import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";

interface Props {
  children: React.ReactNode;
}

const EditLayout = ({ children }: Props) => {
  const logOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="h-screen w-full pc:overflow-y-hidden">
      <header className="w-full bg-primaryBrown flex pc:justify-around mobile:justify-between items-center px-2 py-4 mobile:p-3">
        <Title className="pc:text-3xl mobile:text-2xl text-orange-950">
          Administrative Privilages
        </Title>
        <Button onClick={logOut} colorScheme={"primaryOrange"} >
          Log Out
        </Button>
      </header>
      <div className="w-full h-full bg-gradient-to-b from-primaryBrown to-primaryOrange pt-16">
        {children}
      </div>
    </div>
  );
};

export default EditLayout;
