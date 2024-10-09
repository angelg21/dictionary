import { GroupingProgressBar } from "@/src/forms/components/GroupingFormComponent/GroupingProgressBar/GroupingProgressBar";
import { GroupingCriticismsForm } from '../../../../../../forms/components/GroupingFormComponent/GroupingCriticismComponents/GroupingCriticismsForm';



export default function GroupingCriticism() {
    return (
        <div>
            <div className="flex flex-col">
                <GroupingProgressBar />
                <GroupingCriticismsForm/>
            </div>
            
        </div>
    )
}