'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { MealSchema, MealType } from "@/models/Meal";

interface Props {

}

const MealForm: React.FC<Props> = () => {
    const { register } = useForm<MealType>({
        resolver: zodResolver(MealSchema),
    });

    return <form className="p-5">
        <div className="flex flex-row gap-3 items-center text-orange-950 mb-5">
            <label htmlFor="name" className="text-lg font-semibold">Name: </label>
            <input id="name" type="text" className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"/>
        </div>
        <div className="flex flex-col gap-3 items-center text-orange-950 mb-5">
            <label htmlFor="description" className="self-start text-lg font-semibold">Description: </label>
            <textarea rows={3} id="description" className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"/>
        </div>
    </form>
}

export default MealForm;


<div>
<label></label>
<input />
</div>
