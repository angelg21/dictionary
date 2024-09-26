import { GroupingFormsReview } from "@/src/forms/components/GroupingFormComponent/GroupingFormReview/GroupingFormsReview";
import { GroupingProgressBar } from "@/src/forms/components/GroupingFormComponent/GroupingProgressBar/GroupingProgressBar";



export default function GroupingFormReview() {
    return (
        <div>
            <div className="flex flex-col">
                <GroupingProgressBar />
                <GroupingFormsReview/>
            </div>
            
        </div>
    )
}