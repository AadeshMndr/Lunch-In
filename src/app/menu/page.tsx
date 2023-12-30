import { Soup } from "lucide-react";

import Menu from "@/components/MenuPage/Menu";
import MealShowCase from "@/components/MenuPage/MealShowCase";
import { executeInDB } from "@/lib/db";
import { Meal, ArrayOfMealsSchema } from "@/models/Meal";
import BackButton from "@/components/UI/BackButton";

interface PageProps {
  params: {};
  searchParams: {};
}

export const dynamic = "force-dynamic";

const MenuPage = async ({}: PageProps) => {

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

  const parsedData = ArrayOfMealsSchema.safeParse(data);

  let mealData: Meal[] | undefined = [];

  if (parsedData.success) {
    mealData = parsedData.data.sort((a, b) =>
      a.section.localeCompare(b.section)
    );
  } else {
    mealData = undefined;
  }

  return mealData === undefined ? (
    <div className="w-full h-[86vh] flex flex-col gap-3 justify-start items-center">
      <Soup width={50} height={50} className="text-primaryOrange" />{" "}
      <span>{"Couldn't Load The Menu !"}</span>
      <span>Sorry ! For the inconvenience .</span>
    </div>
  ) : (
    <div>
      <BackButton />
      <MealShowCase meals={mealData} />
      <section>
        <Menu backupData={mealData} />
      </section>
      <section>
        Having trouble deciding your meal, take a look at some recommendations.
      </section>
    </div>
  );
};

export default MenuPage;
