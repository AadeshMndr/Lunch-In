import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import { executeInDB } from "@/lib/db";
import { ReviewSchema } from "@/models/Review";

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