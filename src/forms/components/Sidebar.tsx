import { TimelineForm } from "./TimelineForm";



export const Sidebar = () => {
    return (
        <div
            style={{ width: '400px', minHeight: 'calc(100vh - 1.5rem)' }}
            className="bg-d-lightblue m-3 rounded-l-2xl z-10 text-slate-300 left-0 "
        >

            <text className="flex pt-7 pl-7 font-georgia text-black text-3xl"> Nuevo Autor </text>
            <div className="flex pt-14 items-center justify-center">

                <TimelineForm />
            </div>
        </div>
    );
}