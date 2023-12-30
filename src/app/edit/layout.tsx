"use client";

import { signOut } from "next-auth/react";

import Title from "@/components/UI/Title";
import Button from "@/components/UI/Button";
import BackButton from "@/components/UI/BackButton";

interface Props {
  children: React.ReactNode;
}

const EditLayout = ({ children }: Props) => {
  const logOut = () => {
    signOut({ redirect: true, callbackUrl: "/" });
  };

  return (
    <div className="h-screen w-full pt-4">
      <header className="w-full bg-primaryBrown flex pc:justify-around mobile:justify-between items-center px-2 py-4 mobile:p-3 h-[10vh]">
        <div className="relative w-10 h-10">
          <BackButton  actuallyGoBack={true} />
        </div>
        <Title className="pc:text-3xl mobile:text-2xl text-orange-950">
          Administrative Privilages
        </Title>
        <Button onClick={logOut} colorScheme={"primaryOrange"}>
          Log Out
        </Button>
      </header>
      <div className="w-full bg-gradient-to-b from-primaryBrown to-primaryOrange min-h-[90vh]">
        {children}
      </div>
    </div>
  );
};

export default EditLayout;
