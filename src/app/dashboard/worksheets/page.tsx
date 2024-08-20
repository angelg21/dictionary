import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function Worksheets() {
    
    const session = await getServerSession(authOptions)

    console.log(session);

    if (session?.user.roles.includes("researcher")){
        redirect("/dashboard/searcher");
    }

    return (
        <div className="flex flex-col">
            <span></span>
        </div>
    );
}