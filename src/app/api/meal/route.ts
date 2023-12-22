import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { executeInDB } from "@/lib/db";
import { Meal, MealSchema, ArrayOfMealsSchema } from "@/models/Meal";
import { ArrayOfStringsSchema } from "@/models/utils";

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

    //for vercel hobby build only
    // console.log('request started! ');
    // const timer = setTimeout( () => console.log("10 seconds have gone!"), 1000 * 10);

    try {
        const data = await executeInDB<Meal[]>(async (db) => {
            const collection = db.collection("meals");

            // console.log("Asking the DB for data!");
            
            const data = (await (await collection.find()).toArray());

            // console.log("Got the data!");

            const actualData = data.map( (item) => {
                let copyOfItem: any = item;

                delete copyOfItem["_id"];

                return copyOfItem;
                
            })

            return (actualData);
        });

        // console.log("Sending the data for parsing!");

        const parsedData = ArrayOfMealsSchema.parse(data).sort((a, b) => a.section.localeCompare(b.section));

        // console.log("Data is parsed!");

        // console.log("request complete!");
        // clearTimeout(timer);

        return new NextResponse(JSON.stringify(parsedData));

    } catch (err){
        console.log("Some error occured: ", err);

        if (err instanceof ZodError){
            return new NextResponse("The correct type of data was not provided by the DB.");
        }

        return new NextResponse("Some error occured");
    }
}

export const DELETE = async (req: NextRequest) => {
    const body = await req.json();

    if (body && "passcode" in body && body.passcode === "passcode-bidek" && "data" in body){

        try{

            const parsedData = ArrayOfStringsSchema.parse(body.data);

            await executeInDB( async (db) => {
                const collection = db.collection("meals");

                await Promise.all(parsedData.map( (id) => collection.deleteOne({ id })));
            })

            return new NextResponse("Deletion Successfull!");
        } catch (error){

            if (error instanceof ZodError){
                return new NextResponse("Please Don't use Postman or Postman like apps to send request to this api !", { status: 401 });
            }

            return new NextResponse("Some error occured in the API", { status: 400 });
        }
    } else {
        return new NextResponse("You cannot access this part of the API from outside the webapp!", { status: 401 })
    }

}