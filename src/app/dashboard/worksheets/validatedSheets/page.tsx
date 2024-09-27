import { WorkSheetFile } from "@/src/worksheets/componentes/WorkSheetFile/WorkSheetFile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getAllValidated } from "../actions/get-all-validated";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";

export default async function SheetsValidated() {
    
    const session = await getServerSession(authOptions);

    const { data = [] } = session?.user.roles.includes('admin') ? await getAllValidated() : await getAllValidated(session?.user._id);
    
    return (
        <FilteredWorksheets data={data} />
    );
}

