"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface Props {
    href?: string;
    actuallyGoBack?: boolean;
}

const BackButton: React.FC<Props> = ({ href="/", actuallyGoBack=false }) => {
    const router = useRouter();

    const goBack = () => {
        if (actuallyGoBack){
            router.back();
        } else {
            router.push(href);
        }
    }

    return <ArrowLeft height={35} width={35} onClick={goBack} className="text-primaryBrown cursor-pointer absolute z-40 top-4 left-2 hover:scale-95 rounded-full bg-primaryOrange"/>
}

export default BackButton;