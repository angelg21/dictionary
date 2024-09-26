import { MagazineCriticismForm } from '@/src/forms/components/MagazineFormComponents/MagazineDetailsComponents/MagazineCriticismForm';
import { MagazineProgressBar } from '../../../../../../forms/components/MagazineFormComponents/MagazineProgressBar';






export default function MagazineCriticisms() {
    return (
        <div>
            <div className="flex flex-col">
                <MagazineProgressBar />
                <MagazineCriticismForm />
            </div>
            
        </div>
    )
}
