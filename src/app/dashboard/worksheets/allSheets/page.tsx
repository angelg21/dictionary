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
        <div className="">
            <WorkSheetFile {...Items[0]}/>
        </div>
    );
}

