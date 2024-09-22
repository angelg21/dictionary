import { AuthorProgressBar } from "@/src/forms/components/AuthorFormComponents/AuthorProgressBar/AuthorProgressBar";
import { CriticismsForm } from "@/src/forms/components/CriticismsFormComponents/CriticismsForm";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";





export default function Criticisms() {


    return (
        <div>
            <div className="flex flex-col">
                <AuthorProgressBar />
                <CriticismsForm />
            </div>
        </div>
    );
}