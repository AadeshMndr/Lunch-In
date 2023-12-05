import AvailableMeals from "@/components/EditPage/AvailableMeals";
import Title from "@/components/UI/Title";

const ChangeMealPage = () => {
  return (
    <div className="w-full pt-10">
        <Title size={"lessThanLarge"} colorScheme={"primary"} spaceScheme={"spaceBelow"}>Current Dishes</Title>
      <AvailableMeals />
    </div>
  );
};

export default ChangeMealPage;
