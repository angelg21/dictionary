import { AnthologyFormsReview } from "@/src/forms/components/AnthologyFormComponents/AnthologyFormsReview/AnthologyFormsReview";
import { AnthologyProgressBar } from "@/src/forms/components/AnthologyFormComponents/AnthologyProgressBar/AnthologyProgressBar";



export default function AnthologyFormReview() {
    return (
        <div>
            <div className="flex flex-col">
                <AnthologyProgressBar />
                <AnthologyFormsReview/>
            </div>
            
        </div>
    )
}