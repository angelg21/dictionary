import { AnthologyDetailsForm } from "@/src/forms/components/AnthologyFormComponents/AnthologyDetailsForm/AnthologyDetailsForm";
import { AnthologyProgressBar } from "@/src/forms/components/AnthologyFormComponents/AnthologyProgressBar/AnthologyProgressBar";



export default function AnthologyDetails() {
    return (
        <div>
            <div className="flex flex-col">
                <AnthologyProgressBar />
                <AnthologyDetailsForm/>
            </div>
            
        </div>
    )
}