import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";
import { getAllRejectedSheets } from "../actions/get-all-rejected";

export default async function SheetsValidated() {  
    const session = await getServerSession(authOptions);
    const { data = [] } = await getAllRejectedSheets();
    
    return (
        <FilteredWorksheets data={data} />
    );
}
