import { getServerSession } from "next-auth";
import { getAllSheets } from "../actions/get-all-sheets";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";

export default async function AllSheets() {
    
    const session = await getServerSession(authOptions);
    const { data = [] } = session?.user.roles.includes('admin') ? await getAllSheets() : await getAllSheets(session?.user._id);

    return (
        <FilteredWorksheets data={data} />
    );
}

