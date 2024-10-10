import { WorkSheetFile } from "@/src/worksheets/componentes/WorkSheetFile/WorkSheetFile";
import { getServerSession } from "next-auth";
import { getAllValidated } from "../actions/get-all-validated";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";
import { authOptions } from "@/utils/config/authOptions";

export const revalidate = 0;

export default async function SheetsValidated() {
    
    const session = await getServerSession(authOptions);

    const { data = [] } = session?.user.roles.includes('admin') ? await getAllValidated() : await getAllValidated(session?.user._id);
    
    return (
        <FilteredWorksheets data={data} />
    );
}

