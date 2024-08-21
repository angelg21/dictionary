import { ButtonWithIconLeft } from "@/src/components/ButtonWithIconLeft/ButtonWithIconLeft";
import { InputWithIconLeft } from "@/src/components/InputWithIconLeft/InputWithIconLeft";
import { Filters } from "@/src/worksheets/componentes/Filters/Filters";
import { TabsMenu } from "@/src/worksheets/componentes/TabsMenu/TabsMenu";
import { MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline'

export default function WorksheetsLayout({ children }: { children: React.ReactNode; }) {


    return (
        <div className="flex flex-col mx-5 lg:mx-20">
            <div className="flex justify-between mt-2">
                <span className="text-4xl text-d-blue font-bold ">Mis Fichas</span>
                <div className="p-2 rounded-full bg-d-green xl:hidden ">
                    <PlusIcon className="h-6 w-6 text-white" />
                </div>
            </div>
            <div className="flex flex-col sm:flex-row mt-5 justify-between">
                <TabsMenu />
                <ButtonWithIconLeft
                    title="Nueva Ficha"
                    textColor="text-white"
                    backgroundColor="bg-d-green hidden xl:flex"
                    hover="hover:bg-d-green-light"
                    icon=<PlusIcon />
                    iconColor="text-white"
                />
            </div>

            <div className="flex flex-col xl:flex-row xl:items-center my-5 justify-between ">
                <InputWithIconLeft
                    name="searchWorkSheets"
                    type="text" icon=<MagnifyingGlassIcon />
                    iconColor="text-d-gray-light"
                    inputWidth="w-full max-w-lg lg:w-[280px]"
                    hover="hover:ring-gray-400"
                />
                <div className="mt-5 xl:mt-0">
                    <Filters />
                </div>
            </div>
            {children}
        </div>
    );
}