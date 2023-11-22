import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import LoginForm from "@/components/AdminPage/Login";
import { options } from "@/lib/auth";

const authData = {
  username: "admin",
  password: "admin",
}

const AdminPage = async () => {
  const session = await getServerSession(options);

  if (session?.user?.name){
    redirect("/");
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <LoginForm authenticationData={authData}/>
    </div>
  );
};

export default AdminPage;
