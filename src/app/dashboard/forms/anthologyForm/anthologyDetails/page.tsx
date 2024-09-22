import { AnthologyDetailsForm } from "@/src/forms/components/AnthologyFormComponents/AnthologyDetailsForm/AnthologyDetailsForm";
import { AnthologyProgressBar } from "@/src/forms/components/AnthologyFormComponents/AnthologyProgressBar/AnthologyProgressBar";



export default function AnthologyDetails() {
    return (
        <div>
            <div className="flex flex-col">
                <span className="text-4xl text-d-blue font-bold ">Formulario de Antología</span>
                <AnthologyProgressBar />
                <AnthologyDetailsForm/>
            </div>
            
        </div>
    )
}