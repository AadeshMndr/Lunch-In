import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { executeInDB } from "@/lib/db";
import { MealSchema } from "@/models/Meal";

interface IRouteProps {
    params: {
        mealId: string;
    },
    searchParams: {},
}

export const POST = async (req: NextRequest, { params }: IRouteProps) => {
    const body = await req.json();

    try {
        const parsedBody = MealSchema.parse(body);

        await executeInDB(async (db) => {
            const collection = db.collection("meals");
            
            await collection.replaceOne({ id: params.mealId }, parsedBody);
        });

        return new NextResponse("OK");
    } catch (error){
        if (error instanceof ZodError){
            return new NextResponse("Don't send a request here from POSTMAN!", { status: 401 });
        } 

        return new NextRequest("The DB failed to replace the data !");
    }   
}