import { WorkSheetFile } from "@/src/worksheets/componentes/WorkSheetFile/WorkSheetFile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getAllPendingReviews } from "../actions/get-all-pending-reviews";

const greenVariant = {
    buttonBackground: 'bg-d-green-light-button',
    buttonPointStyle: 'bg-d-green',
    buttonTextColor: 'text-d-green',
    buttonTitle: 'Validada',
}

const yellowVariant = {
    buttonBackground: 'bg-d-yellow-light-button',
    buttonPointStyle: 'bg-d-yellow',
    buttonTextColor: 'text-d-yellow',
    buttonTitle: 'Por Revisar',
}

const blueVariant = {
    buttonBackground: 'bg-d-blue-light-button',
    buttonPointStyle: 'bg-d-blue',
    buttonTextColor: 'text-d-blue',
    buttonTitle: 'Por Completar',
}

const statusVariants: { [key: string]: typeof greenVariant } = {
    'Validated': greenVariant,
    'Pending Review': yellowVariant,
    'Pending Edit': blueVariant,
};

export default async function SheetsToReview() {
    
    const session = await getServerSession(authOptions);

    const { data = [] } = session?.user.roles.includes('admin') ? await getAllPendingReviews() : await getAllPendingReviews(session?.user._id);
    
    const Items = data.map((item: any) => {
        const variant = statusVariants[item.status] || {};
    
        return {
            workSheetDate: new Date(item.createdAt).toLocaleDateString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            }),
            workSheetName: item.title,
            workSheetType: item.type,
            editors: item.assignedEditors,
            reviewers: item.assignedReviewers,
            ...variant,
        };
    });

    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-4 xl:gap-0 xl:flex-col">
            {
                Items.map((item: any) => (
                    <WorkSheetFile {...item} />
                ))
            }
        </div>
    );
}

