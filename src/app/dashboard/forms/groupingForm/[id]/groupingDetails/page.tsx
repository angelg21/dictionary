import { GroupingDetailForm } from "@/src/forms/components/GroupingFormComponent/GroupingDetailForm/GroupingDetailForm";
import { GroupingProgressBar } from "@/src/forms/components/GroupingFormComponent/GroupingProgressBar/GroupingProgressBar";



export default function GroupingDetails() {
    return (
        <div>
            <div className="flex flex-col">
                <GroupingProgressBar />
                <GroupingDetailForm/>
            </div>
            
        </div>
    )
}