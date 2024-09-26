import { AnthologyProgressBar } from "@/src/forms/components/AnthologyFormComponents/AnthologyProgressBar/AnthologyProgressBar";
import { AnthologysCriticism } from "@/src/forms/components/AnthologyFormComponents/AnthologysCriticism/AnthologysCriticism";



export default function AnthologyFormReview() {
    return (
        <div>
            <div className="flex flex-col">
                <AnthologyProgressBar />
                <AnthologysCriticism/>
            </div>
            
        </div>
    )
}