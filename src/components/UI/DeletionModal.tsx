"use client";

import { motion, useScroll, useTransform } from "framer-motion";

import Button from "./Button";
import { Meal } from "@/models/Meal";
import { Review } from "@/models/Review";

interface Props {
  deletionItems: Meal[] | Review[];
  onDelete: () => void;
  onCancel: () => void;
}

const DeletionModal: React.FC<Props> = ({
  deletionItems,
  onCancel,
  onDelete,
}) => {
  const { scrollY } = useScroll();

  const moveDownAlong = useTransform(scrollY, [0, 4000], [0, 4000]);

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
    <motion.div
      id="backdropForDeletionModal"
      onClick={(event) => {
        if ("id" in event.target) {
          if (event.target.id === "backdropForDeletionModal") {
            onCancel();
          }
        }
      }}
      style={{ translateY: moveDownAlong }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute z-40 w-full h-full top-0 left-0 flex flex-col items-center pt-36 bg-primaryOrange bg-opacity-50"
    >
      <motion.div
        initial={{ translateY: 700 }}
        animate={{ translateY: 0 }}
        exit={{ translateY: 700, rotate: "60deg" }}
        className="flex flex-col p-4 rounded-lg pc:w-2/5 mobile:w-4/5 gap-y-3 bg-primaryBrown opacity-100 z-50"
      >
        <span className="text-primaryOrange text-2xl text-center self-start">
          Are You Sure?
        </span>
        <span>
          The {worder(deletionItems)}{" "}
          <span className="text-primaryOrange">
            {deletionItems.map(({ name }) => ` ${name}`).join(", ")}
          </span>{" "}
          will be deleted!
        </span>
        <div className="self-end">
          <Button
            onClick={onCancel}
            colorScheme={"inversePrimaryOrange"}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button onClick={onDelete} colorScheme={"primaryOrange"}>
            Confirm
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeletionModal;
