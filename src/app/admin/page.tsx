import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import LoginForm from "@/components/AdminPage/Login";
import { options } from "@/lib/auth";

const AdminPage = async () => {
  const session = await getServerSession(options);

  if (session?.user?.name){
    redirect("/");
  }

  return (
    <div className="w-screen h-screen flex-col flex justify-center items-center">
      <div className="font-bold leading-6 bg-black text-primaryBrown p-4 rounded-md text-lg">Verify yourself as Admin</div>
      <LoginForm />
    </div>
  );
};

export default AdminPage;
