"use client";

import { useState } from "react";

import ReviewBox from "@/components/ReviewPage/ReviewBox";
import Title from "@/components/UI/Title";
import ReviewList from "@/components/ReviewPage/ReviewList";

const ReviewPage = () => {
  const [addReview, setAddReview] = useState<boolean>(false);

  //workToBeDone: When we click/focus on the input tag, animate and bring in the ReviewBox with the message part already focused.
    //maybe use a useRef get the input ie: message one input's ref then inside useEffect refVariable.current.focus();


  return (
    <div className="w-full p-3">
      <Title size={"large"} colorScheme={"primary"} spaceScheme={"spaceBelow"}>
        Reviews
      </Title>
      <input
        placeholder="(Write Your Review)"
        className="w-full focus:outline-none p-2 rounded-md mb-4 focus:ring-2 ring-primaryOrange"
        onClick={() => setAddReview(true)}
        
      />
      {addReview && (
        <div id="backdropForReview">
          <ReviewBox />
        </div>
      )}
      <ReviewList />
    </div>
  );
};

export default ReviewPage;
