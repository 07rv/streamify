import Login from "@/components/common/Login";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  if (session && session?.user) {
    redirect("/dashboard");
  }
  return <Login />;
}
