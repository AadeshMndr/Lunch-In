import "./globals.css";
import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { SpeedInsights } from "@vercel/speed-insights/next"

import AuthProvider from "@/components/Providers/auth";
import ToastProvider from "@/components/Providers/toast";
import QueryProvider from "@/components/Providers/tanstack";
import ContextProvider from "@/components/Providers/context";
import { queryClient } from "@/lib/tanstack";
import { Meal, ArrayOfMealsSchema } from "@/models/Meal";
import { executeInDB } from "@/lib/db";

export const metadata: Metadata = {
  title: "Lunch In",
  description:
    `Looking for a place to have your lunch? 
    Welcome to Lunch In, We serve you the best meals around Kathmandu. 
    Pickup your tasty meal kerbside or take your time enjoying our service.`,
    keywords: ["Lunch", "LunchIn", "restaurant"],
    metadataBase: new URL('http://lunchin.vercel.app'),
  openGraph: {
    type: "website",
    url: "http://lunchin.vercel.app",
    title: "Lunch In",
    description: `Looking for a place to have your lunch? 
    Welcome to Lunch In, We serve you the best meals around Kathmandu. 
    Pickup your tasty meal kerbside or take your time enjoying our service.`,
    siteName: "Lunch In",
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await queryClient.prefetchQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      try {
        const data = await executeInDB<Meal[]>(async (db) => {
          const collection = db.collection("meals");

          const data = await (await collection.find()).toArray();

          const actualData = data.map((item) => {
            let copyOfItem: any = item;

            delete copyOfItem["_id"];

            return copyOfItem;
          });

          return actualData;
        });

        const parsedData = ArrayOfMealsSchema.parse(data).sort((a, b) =>
          a.section.localeCompare(b.section)
        );

        return parsedData;
      } catch (error) {
        console.log("Unable to extract correct / valid data from the DB !");

        return [];
      }
    },
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body className="w-screen h-full relative bg-no-repeat bg-gradient-to-b from-primaryBrown from-[20%] to-[#af6e3f]">
        <AuthProvider>
          <ContextProvider>
            <QueryProvider>
              <HydrationBoundary state={dehydratedState}>
                <ToastProvider>{children}</ToastProvider>
              </HydrationBoundary>
            </QueryProvider>
          </ContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
