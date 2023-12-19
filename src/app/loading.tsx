import { ChefHat, Utensils } from "lucide-react";

import Title from "@/components/UI/Title";

const LoadingPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-4 text-primaryOrange">
        <Title colorScheme={'primary'} size={"large"}>Lunch In</Title>
      <ChefHat width={60} height={60} />
      <Utensils width={40} height={40} className="animate-bounce" />
    </div>
  );
};

export default LoadingPage;
