import { AnthologyDetailsForm } from "@/src/forms/components/AnthologyFormComponents/AnthologyDetailsForm/AnthologyDetailsForm";
import { AnthologyProgressBar } from "@/src/forms/components/AnthologyFormComponents/AnthologyProgressBar/AnthologyProgressBar";

export const revalidate = 0;

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