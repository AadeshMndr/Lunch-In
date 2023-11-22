import { NextAuthOptions } from "next-auth"; 
import Credentials from "next-auth/providers/credentials";

const adminCredentials = {
    username: "admin",
    password: "admin",
}

export const options: NextAuthOptions = {
    providers: [
        Credentials({
            name: "admin-credentials",
            credentials: {},
            async authorize(credentials){

                if (credentials === undefined){
                    return null;
                }

                if("username" in credentials && "password" in credentials){
                    if (credentials.username === adminCredentials.username && credentials.password === adminCredentials.password){
                        return { id: "admin", name: credentials.username };
                    }
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/admin",
    },
}