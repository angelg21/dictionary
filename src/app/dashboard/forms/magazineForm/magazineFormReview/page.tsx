import { MagazineDetailsForm } from '@/src/forms/components/MagazineFormComponents/MagazineDetailsComponents/MagazineDetailsForm';
import { MagazineProgressBar } from '../../../../../forms/components/MagazineFormComponents/MagazineProgressBar';
import { MagazineReview } from '@/src/forms/components/MagazineFormComponents/MagazineReview/MagazineReview';






export default function MagazineFormReview() {
    return (
        <div>
            <div className="flex flex-col">
                <MagazineProgressBar />
                <MagazineReview/>
            </div>
            
        </div>
    )
}