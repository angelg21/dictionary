import { getServerSession } from "next-auth";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";
import { getAllRejectedSheets } from "../actions/get-all-rejected";
import { authOptions } from "@/utils/config/authOptions";

export const revalidate = 0;

export default async function SheetsValidated() {  
    const session = await getServerSession(authOptions);
    const { data = [] } = await getAllRejectedSheets();
    
    return (
        <FilteredWorksheets data={data} />
    );
}
