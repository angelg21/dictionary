import { GroupingFormsReview } from "@/src/forms/components/GroupingFormComponent/GroupingFormReview/GroupingFormsReview";
import { GroupingProgressBar } from "@/src/forms/components/GroupingFormComponent/GroupingProgressBar/GroupingProgressBar";



export default function GroupingFormReview() {
    return (
        <div>
            <div className="flex flex-col">
                <span className="text-4xl text-d-blue font-bold ">Formulario de Agrupación</span>
                <GroupingProgressBar />
                <GroupingFormsReview/>
            </div>
            
        </div>
    )
}