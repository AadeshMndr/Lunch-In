import Title from "@/components/UI/Title";
import MealForm from "@/components/EditPage/MealForm";

import { DUMMY_DATA } from "@/models/Meal";

const AddPage = () => {
    return <div className="shadow-lg">
    <Title colorScheme={"primary"} size={"lessThanLarge"}>Add New Dish</Title>
    <MealForm meals={DUMMY_DATA}/></div>;
}

export default AddPage;