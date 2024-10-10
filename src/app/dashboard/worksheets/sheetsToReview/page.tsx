import { getServerSession } from "next-auth";
import { getAllPendingReviews } from "../actions/get-all-pending-reviews";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";
import { authOptions } from "@/utils/config/authOptions";

export const revalidate = 0;

export default async function SheetsToReview() {  
    const session = await getServerSession(authOptions);
    const { data = [] } = session?.user.roles.includes('admin') ? await getAllPendingReviews() : await getAllPendingReviews(session?.user._id);

    return (
        <FilteredWorksheets data={data} />
    );
}

