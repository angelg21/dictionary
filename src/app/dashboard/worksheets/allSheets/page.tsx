import { getServerSession } from "next-auth";
import { getAllSheets } from "../actions/get-all-sheets";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";
import { authOptions } from "@/utils/config/authOptions";

export const revalidate = 0;

export default async function AllSheets() {
    
    const session = await getServerSession(authOptions);
    const { data = [] } = session?.user.roles.includes('admin') ? await getAllSheets() : await getAllSheets(session?.user._id);
    return (
        <FilteredWorksheets data={data} />
    );
}

