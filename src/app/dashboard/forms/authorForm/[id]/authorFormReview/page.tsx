import { AuthorFormReviews } from "@/src/forms/components/AuthorFormComponents/AuthorFormReview/AuthorFormReviews";
import { AuthorProgressBar } from "@/src/forms/components/AuthorFormComponents/AuthorProgressBar/AuthorProgressBar";





export default function AuthorFormReview() {
    

    return (
        <div>
            <div className="flex flex-col">
                <AuthorProgressBar/>
                <AuthorFormReviews/>
            </div>
        </div>
    );
}