import { GroupingProgressBar } from "@/src/forms/components/GroupingFormComponent/GroupingProgressBar/GroupingProgressBar";
import { GroupingCriticismsForm } from '../../../../../forms/components/GroupingFormComponent/GroupingCriticismComponents/GroupingCriticismsForm';



export default function GroupingCriticism() {
    return (
        <div>
            <div className="flex flex-col">
                <span className="text-4xl text-d-blue font-bold ">Formulario de Agrupación</span>
                <GroupingProgressBar />
                <GroupingCriticismsForm/>
            </div>
            
        </div>
    )
}