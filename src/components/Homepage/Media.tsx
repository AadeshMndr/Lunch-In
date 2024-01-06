import { Phone } from "lucide-react";
import Link from "next/link";

interface Props {}

const Media: React.FC<Props> = () => {
  const phoneNumber = 9808629725;
  const personalNumber = 9851188771;

  return (
    <div className="w-full p-3 flex flex-row items-center mobile:justify-center mobile:gap-x-4 pc:justify-between pc:px-32">
      <div className="flex flex-col justify-center items-center">
        <span className="text-lg text-orange-900">Reception</span>
        <div className="flex flex-row items-center justify-start gap-x-2">
          <Phone width={20} height={20} />{" "}
          <Link href={`tel:${phoneNumber}`}>+977 {phoneNumber}</Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
      <span className="text-lg text-orange-900">Owner</span>
        <div className="flex flex-row items-center justify-start gap-x-2">
          <Phone width={20} height={20} />{" "}
          <Link href={`tel:${personalNumber}`}>+977 {personalNumber}</Link>
        </div>
      </div>
    </div>
  );
};

export default Media;
