import { convertToStringObject } from "@/lib/utils";
import { MealFormInput } from "@/models/MealForm";
import { executeInDB } from "@/lib/db";
import { Meal, ArrayOfMealsSchema } from "@/models/Meal";
import Title from "@/components/UI/Title";
import EditForm from "@/components/EditPage/EditForm";

interface PageProps {
  params: {
    mealId: string;
  };
  searchParams: {};
}

export const dynamic = "force-dynamic";

const FormPage = async ({ params }: PageProps) => {
  const meal = await executeInDB<MealFormInput>(async (db) => {
    const collection = db.collection("meals");

    const data = await (await collection.find({ id: params.mealId })).toArray();

    const actualData = data.map((item) => {
      let copyOfItem: any = item;

      delete copyOfItem["_id"];

      return copyOfItem;
    }) as Meal[];

    const typeArrangedData = actualData.map(({ price, ...rest }) => {
      const obj: MealFormInput = {
        ...rest,
        price: convertToStringObject(price),
      };

      return obj;
    });

    return typeArrangedData[0];
  });

  return (
    <div className="shadow-lg pc:pb-16 pt-7">
      <Title colorScheme={"primary"} size={"lessThanLarge"}>
        { `Edit ${meal.name}` }
      </Title>
      <EditForm defaultValues={meal} originalID={params.mealId}/>
    </div>
  );
};

export default FormPage;

export const generateStaticParams = async () => {
  try{
  const data = await executeInDB<Meal[]>(async (db) => {
    const collection = db.collection("meals");

    const data = await (await collection.find()).toArray();

    const actualData = data.map((item) => {
      let copyOfItem: any = item;

      delete copyOfItem["_id"];

      return copyOfItem;
    });

    return actualData;
  });

  const parsedData = ArrayOfMealsSchema.parse(data);

  return parsedData.map( ({ id }) => ({ mealId: id }));
  
  } catch (error) {
    console.log("Some Error happened while generating static params.");

    return [];
  }
}
