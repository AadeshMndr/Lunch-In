import OptionBox from "./OptionBox";

interface Props {}

const Options: React.FC<Props> = () => {
  return (
    <div className="grid pc:auto-rows-min grid-cols-2 pc:grid-cols-3 gap-5 p-4 pc:h-screen">
      <OptionBox iconType="add" text="Add Dish" redirectTo="/edit/add" />
      <OptionBox iconType="edit" text="Edit Dish" redirectTo="/edit/changeMeal" />
      <OptionBox iconType="delete" text="Remove Dish" redirectTo="/edit/delete" />
      <OptionBox iconType="reviews" text="Reviews" redirectTo="/edit/review" />
    </div>
  );
};

export default Options;
