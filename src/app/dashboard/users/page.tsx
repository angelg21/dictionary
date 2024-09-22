import FilteredUserTable from "@/src/users/components/FilteredUserTable/FilteredUserTable";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getUsers } from "@/src/users/actions/get-paginated-users";
import { redirect } from "next/navigation";
import { AlertProvider } from "@/src/users/context/AlertContext"; 

export const revalidate = 0;

export default async function Users() {
    const session = await getServerSession(authOptions);
    
    const { ok, data = [] } = await getUsers(session?.user._id);

    if (!ok) {
        redirect("/dashboard/worksheets/allSheets");
    }

    const users = data.map((user: any) => ({
        id: user._id,
        name: user.fullName,
        email: user.email,
        roles: user.roles,
        image: user.imageUrl,
    }));

    return (
        <AlertProvider> {/* Envolver todo en AlertProvider */}
            <div className="max-sm:px-[20px] min-[500px]:px-[40px] py-[50px] max-lg:max-w-[600px] mx-auto lg:px-[45px] lg:py-[10px] min-[1300px]:px-[70px] min-[1300px]:py-[25px]">
                <h2 className="text-d-blue font-bold text-4xl lg:text-5xl mb-[30px]">Usuarios</h2>
                <FilteredUserTable users={users} />
            </div>
        </AlertProvider>
    );
}