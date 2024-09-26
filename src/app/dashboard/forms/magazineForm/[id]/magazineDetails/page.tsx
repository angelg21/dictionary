import { MagazineDetailsForm } from '@/src/forms/components/MagazineFormComponents/MagazineDetailsComponents/MagazineDetailsForm';
import { MagazineProgressBar } from '@/src/forms/components/MagazineFormComponents/MagazineProgressBar';







export default function MagazineDetails() {

    return (
        <div>
            <div className="flex flex-col">
                <MagazineProgressBar />
                <MagazineDetailsForm />
            </div>

        </div>
    )
}
