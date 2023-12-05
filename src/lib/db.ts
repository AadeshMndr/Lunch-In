import { MongoClient, Db } from "mongodb";

const PASSWORD = "admin";

export const executeInDB = async <Result=any>(DBQuery: (db: Db) => Promise<Result>) => {
    const client = await MongoClient.connect(`mongodb+srv://admin:${PASSWORD}@lunchin.jgiip0b.mongodb.net/`);

    const db = client.db("lunchin");

    const result = await DBQuery(db);

    client.close();

    return result;
}