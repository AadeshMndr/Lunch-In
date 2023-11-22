import { MongoClient, Db } from "mongodb";

const PASSWORD = "admin";

export const executeInDB = async <T=any, Result=any>(nameOfDB: string, DBQuery: (db: Db) => Promise<T>) => {
    const client = await MongoClient.connect(`mongodb+srv://admin:${PASSWORD}@lunchin.jgiip0b.mongodb.net/`);

    const db = client.db(nameOfDB);

    const result = (await DBQuery(db)) as Result;

    client.close();

    return result;
}