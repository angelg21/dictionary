import { TabsMenu } from "@/src/worksheets/componentes/TabsMenu/TabsMenu";


export default function WorksheetsLayout({ children }: { children: React.ReactNode; }) {


    return (
        <div className="flex flex-col mx-5 lg:mx-20">
            <span className="text-4xl text-d-blue font-bold mt-2 mb-8">Mis Fichas</span>
            <TabsMenu/>
            {children}
        </div>
    );
}