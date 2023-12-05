import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { executeInDB } from "@/lib/db";
import { Meal, MealSchema, ArrayOfMealsSchema } from "@/models/Meal";

export const POST = async (req: NextRequest) => {   
    const body = await req.json();

    try {
        const parsedData = MealSchema.parse(body);

        executeInDB<void>(async (db) => {
            const collection = db.collection("meals");

            await collection.insertOne(parsedData);
        })

        return new NextResponse("Ok");

    } catch (error){
        if (error instanceof ZodError){
            return new NextResponse("Please Don't use Postman or Postman like apps to send request to this api !", { status: 401 });
        }

        return new NextResponse("Some Error occured while storing the data in the DB!");
    }
}   


export const GET = async (req: NextRequest) => {
    try {
        const data = await executeInDB<Meal[]>(async (db) => {
            const collection = db.collection("meals");

            const data = (await (await collection.find()).toArray());

            const actualData = data.map( (item) => {
                let copyOfItem: any = item;

                delete copyOfItem["_id"];

                return copyOfItem;
                
            })

            return (actualData);
        });

        const parsedData = ArrayOfMealsSchema.parse(data);

        return new NextResponse(JSON.stringify(parsedData));

    } catch (err){
        console.log("Some error occured: ", err);

        if (err instanceof ZodError){
            return new NextResponse("The correct type of data was not provided by the DB.");
        }

        return new NextResponse("Some error occured");
    }
}