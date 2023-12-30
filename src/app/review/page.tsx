"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ReviewBox from "@/components/ReviewPage/ReviewBox";
import Title from "@/components/UI/Title";
import ReviewList from "@/components/ReviewPage/ReviewList";
import BackButton from "@/components/UI/BackButton";

const ReviewPage = () => {
  const [addReview, setAddReview] = useState<boolean>(false);

  return (
    <div className="w-full p-3 min-h-screen">
      <BackButton />
      <Title size={"large"} colorScheme={"primary"} spaceScheme={"spaceBelow"}>
        Reviews
      </Title>
      <input
        placeholder="(Write Your Review)"
        className="w-full focus:outline-none p-2 rounded-md mb-4 focus:ring-2 ring-primaryOrange"
        onClick={() => setAddReview(true)}
      />
      <AnimatePresence>
        {addReview && (
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 200, opacity: 0 }}
            transition={{ type: "spring" }}
            id="backdropForReview"
            onClick={(event) => {
              if ("id" in event.target) {
                if (event.target.id === "backdropForReview") {
                  setAddReview(false);
                }
              }
            }}
            className="z-50 absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primaryBrown to-primaryOrange"
          >
            <ReviewBox setAddReview={setAddReview} />
          </motion.div>
        )}
      </AnimatePresence>
      <ReviewList />
    </div>
  );
};

export default ReviewPage;
