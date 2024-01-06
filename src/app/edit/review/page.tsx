import ReviewList from "@/components/ReviewPage/ReviewList";
import Title from "@/components/UI/Title";

const ReviewPage = () => {
  return (
    <div className="w-full pt-4">
      <div className="flex flex-row justify-center items-center gap-3 mb-9">
        <Title colorScheme={"primary"} size={"lessThanLarge"} spaceScheme={"spaceAbove"}>
          Delete Reviews
        </Title>
      </div>
      <ReviewList admin={true} />
    </div>
  );
};

export default ReviewPage;
