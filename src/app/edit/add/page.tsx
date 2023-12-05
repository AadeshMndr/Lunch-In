import Title from "@/components/UI/Title";
import MealForm from "@/components/EditPage/MealForm";

import { DUMMY_DATA } from "@/models/Meal";

const AddPage = () => {
  return (
    <div className="shadow-lg pc:pb-16 pt-7">
      <Title colorScheme={"primary"} size={"lessThanLarge"}>
        Add New Dish
      </Title>
      <MealForm meals={DUMMY_DATA} purpose="adding"/>
    </div>
  );
};

export default AddPage;
