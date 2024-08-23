import { WorkSheetFile } from "@/src/worksheets/componentes/WorkSheetFile/WorkSheetFile";

const Items = [
    {
        workSheetDate: '21/08/2024',
        workSheetName: 'Teresa Coraspe',
        workSheetType: 'Autor',
        editorImg: '',
        editorName: 'Pedro Herrera',
        reviserImg: '',
        reviserName: 'Angel Guevara',
        buttonBackground: 'bg-d-green-light-button',
        buttonPointStyle: 'bg-d-green',
        buttonTextColor: 'text-d-green',
        buttonTitle: 'Validada',
    },
]





export default function AllSheets() {
    return (
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:gap-4 xl:gap-0 xl:flex-col">
            <WorkSheetFile {...Items[0]}/>
            <WorkSheetFile {...Items[0]}/>
            <WorkSheetFile {...Items[0]}/>
            <WorkSheetFile {...Items[0]}/>
            <WorkSheetFile {...Items[0]}/>
            <WorkSheetFile {...Items[0]}/>
            <WorkSheetFile {...Items[0]}/>
            <WorkSheetFile {...Items[0]}/>
        </div>
    );
}

