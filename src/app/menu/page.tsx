import Menu from "@/components/MenuPage/Menu";
import MealShowCase from "@/components/MenuPage/MealShowCase";

import { DUMMY_DATA } from "@/models/Meal";

interface PageProps {
  params: {};
  searchParams: {
    mealId: string;
  };
}

const MenuPage = ({ searchParams: { mealId } }: PageProps) => {

  return (
    <div>
      {(mealId && DUMMY_DATA.some( (meal) => meal.id === Number(mealId) )) && (
        <section>
          <MealShowCase meal={DUMMY_DATA.filter( (meal) => meal.id === Number(mealId))[0]}/>
        </section>
      )}
      <section>
        <Menu meals={DUMMY_DATA} />
      </section>
      <section>
        This section shows some of the popular foods, maybe in some fade in fade
        out transition or in a scroll animation list
      </section>
    </div>
  );
};

export default MenuPage;
