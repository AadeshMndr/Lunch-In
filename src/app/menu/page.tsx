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
        {mealId && DUMMY_DATA.some((meal) => meal.id === mealId) && (
          <section>
            <MealShowCase
              meal={DUMMY_DATA.filter((meal) => meal.id === mealId)[0]}
            />
          </section>
        )}
        <section>
          <Menu meals={DUMMY_DATA} />
        </section>
        <section>
          Having trouble deciding your meal, take a look at some
          recommendations.
        </section>
      </div>
  );
};

export default MenuPage;
