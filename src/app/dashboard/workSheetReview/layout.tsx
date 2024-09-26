import { AlertProvider } from "@/src/users/context/AlertContext";



export default function WorkSheetReviewLayout({ children }: { children: React.ReactNode; }) {
    return (
        <div className='flex flex-col mx-5 lg:mx-9 xl:mx-20'>
            <AlertProvider>
                {children}
            </AlertProvider>
        </div>
    );
}