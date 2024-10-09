import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getAllPendingReviews } from "../actions/get-all-pending-reviews";
import FilteredWorksheets from "@/src/worksheets/componentes/FilteredWorksheets/FilteredWorksheets";

export const revalidate = 0;

export default async function SheetsToReview() {  
    const session = await getServerSession(authOptions);
    const { data = [] } = session?.user.roles.includes('admin') ? await getAllPendingReviews() : await getAllPendingReviews(session?.user._id);

    return (
        <FilteredWorksheets data={data} />
    );
}

