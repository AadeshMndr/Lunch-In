"use client";

import { signOut } from "next-auth/react";

import Button from "@/components/UI/Button";

const EditPage = () => {
    const leaveAdminMode = () => {
        signOut({ redirect: true, callbackUrl: "/admin" })
    }

  return (
    <div>
      This is the edit page
      <Button onClick={leaveAdminMode}>Sign Out</Button>
    </div> 
  );
};

export default EditPage;
