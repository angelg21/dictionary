'use client'

import { AuthorDetailsForm } from "@/src/forms/components/AuthorFormComponents/AuthorDetailsForm/AuthorDetailsForm";
import { AuthorProgressBar } from "@/src/forms/components/AuthorFormComponents/AuthorProgressBar/AuthorProgressBar";
import { CloudArrowUpIcon } from '@heroicons/react/24/outline'
import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft";
import { useAlert } from "@/src/users/context/AlertContext";


export default function AuthorDetails() {

    const { showAlert } = useAlert();

    const handleSafeForm = () => {
        console.log('hola')
        showAlert("Informacion guardada", "success");
    }

    return (
        <div>
            <div className="flex flex-col">
                <AuthorProgressBar />
                <AuthorDetailsForm />
            </div>

        </div>

    );
}