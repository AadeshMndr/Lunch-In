"use client";

import { Meal } from "@/models/Meal";
import { Review } from "@/models/Review";

interface Props {
  deletionItems: Meal[] | Review[];
  onDelete: () => {},
  onCancel: () => {},
}

const DeletionModal: React.FC<Props> = ({ deletionItems }) => {
  const worder = (item: typeof deletionItems): string => {
    if (item.length === 0) {
      return "item";
    } else if ("category" in item[0]) {
      if (item.length === 1) {
        return "dish";
      } else {
        return "dishes";
      }
    } else {
      if (item.length === 1) {
        return "review by";
      } else {
        return "reviews by";
      }
    }
  };

  return (
    <div className="absolute z-50 w-full h-full top-0 left-0 flex flex-col items-center pt-24">
      <div className="flex flex-col p-4 rounded-lg w-2/5 gap-y-3">
        <span className="text-primaryOrange text-2xl text-center">
          Are You Sure?
        </span>
        <span>
          The {worder(deletionItems)}{" "}
          {deletionItems.map(({ name }) => ` ${name}`)} will be deleted!
        </span>
        <div>
          <button>Cancel</button>
          <button>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default DeletionModal;
