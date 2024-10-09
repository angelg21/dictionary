'use client'
import { AuthorProgressBar } from "@/src/forms/components/AuthorFormComponents/AuthorProgressBar/AuthorProgressBar";
import { WorksForm } from "@/src/forms/components/WorksFormComponents/WorksForm/WorksForm";
import { CloudArrowUpIcon } from "@heroicons/react/24/outline";




export default function Works() {

    return (
        <div>
            <div className="flex flex-col">
                <AuthorProgressBar/>
                <WorksForm/>

            </div>
        </div>
    );
}