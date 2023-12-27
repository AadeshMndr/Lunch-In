import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { executeInDB } from "@/lib/db";
import { ReviewSchema, ArrayOfReviewSchema } from "@/models/Review";

export const GET = async () => {
    try {
        const data = await executeInDB(async (db) => {
            const collection = db.collection("reviews");

            const data = (await (await collection.find()).toArray());

            const correctedData = data.map( (item) => {
                let correctedItem:any = item;

                delete correctedItem["_id"];

                return correctedItem;
            });

            const parsedData = ArrayOfReviewSchema.parse(correctedData);

            return parsedData;
        });

        return new NextResponse(JSON.stringify(data));
    } catch(error){
        if (error instanceof ZodError){
            return new NextResponse("The DB is providing ZOD invalid data!", { status: 402 });
        }

        return new NextResponse("Some error occured while fetching the reviews!", { status: 400 })
    }
}

export const POST = async (req: NextRequest) => {
    const body = await req.json();
    
    try {   

        const parsedBody = ReviewSchema.parse(body);

        await executeInDB(async (db) => {
            const collection = db.collection("reviews");

            await collection.insertOne(parsedBody);
        });

    } catch (error) {

        if(error instanceof ZodError){
            return new NextResponse("Please Don't use post man to send request to this API", { status: 401 });
        } else {
            return new NextResponse("Some error occured!", { status: 400 });
        }
    }

    return new NextResponse("OK");
}