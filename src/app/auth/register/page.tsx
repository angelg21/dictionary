import RegisterForm from "@/src/forms/components/RegisterForm/RegisterForm";
import { authOptions } from "@/utils/config/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const RegisterPage: React.FC = async () => {
  
  const session = await getServerSession(authOptions)
  const userRoles = session?.user?.roles || [];

  if (session) {
    const userRoles = session?.user?.roles || [];

    if (userRoles.includes('admin')) {
      // Redirigir si es admin
      redirect("/dashboard/worksheets/validatedSheets");
    } else if (userRoles.includes('editor') && !userRoles.includes('reviewer')) {
      // Redirigir si solo es editor
      redirect("/dashboard/worksheets/sheetsToComplete");
    } else if (userRoles.includes('reviewer') && !userRoles.includes('editor')) {
      // Redirigir si solo es revisor
      redirect("/dashboard/worksheets/sheetsToReview");
    } else if (userRoles.includes('editor') && userRoles.includes('reviewer')) {
      // Redirigir si es editor y revisor
      redirect("/dashboard/worksheets/sheetsToComplete");
    } 
  }

  return (
    <RegisterForm />
  )
}

export default RegisterPage;