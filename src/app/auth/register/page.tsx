import RegisterForm from "@/src/forms/components/RegisterForm/RegisterForm";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const RegisterPage: React.FC = async () => {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/dashboard/worksheets");
    return null;
  }

  return (
    <RegisterForm />
  )
}

export default RegisterPage;