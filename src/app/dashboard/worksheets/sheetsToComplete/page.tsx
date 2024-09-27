import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getAllPendingEdits } from "../actions/get-all-pending-edits";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";

export const revalidate= 0;

export default async function SheetsToComplete() {
    
    const session = await getServerSession(authOptions);

    const { data = [] } = session?.user.roles.includes('admin') ? await getAllPendingEdits() : await getAllPendingEdits(session?.user._id);
    
    return (
        <FilteredWorksheets data={data} />
    );
}

