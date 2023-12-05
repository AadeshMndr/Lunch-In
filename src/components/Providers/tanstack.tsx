"use client";

import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@/lib/tanstack";

interface Props {
  children: React.ReactNode;
}

const QueryProvider: React.FC<Props> = ({ children }) => {
  

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
