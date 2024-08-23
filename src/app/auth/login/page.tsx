import LoginForm from "@/src/forms/components/LoginForm/LoginForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const LoginPage: React.FC = async () => {
  
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard/worksheets/allSheets");
    return null;
  }

  return (
    <LoginForm />
  )
}

export default LoginPage;