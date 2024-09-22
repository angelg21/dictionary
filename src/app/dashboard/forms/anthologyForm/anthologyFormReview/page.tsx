import { AnthologyFormsReview } from "@/src/forms/components/AnthologyFormComponents/AnthologyFormsReview/AnthologyFormsReview";
import { AnthologyProgressBar } from "@/src/forms/components/AnthologyFormComponents/AnthologyProgressBar/AnthologyProgressBar";



export default function AnthologyFormReview() {
    return (
        <div>
            <div className="flex flex-col">
                <span className="text-4xl text-d-blue font-bold ">Formulario de Antología</span>
                <AnthologyProgressBar />
                <AnthologyFormsReview/>
            </div>
            
        </div>
    )
}