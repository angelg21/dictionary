import { WorkSheetCreator } from "../WorkSheetCreator/WorkSheetCreator"
import { WorkSheetProfile } from "../WorkSheetsProfile/WorkSheetProfile"
import { EllipsisHorizontalIcon } from "@heroicons/react/20/solid"
import { ButtonWithPointLeft } from "@/src/components/ButtonWithPointLeft/ButtonWithPointLeft";

interface Props {
    workSheetName: string;
    workSheetDate: string;
    workSheetType: string;
    editorImg: string;
    editorName: string;
    reviserImg: string;
    reviserName: string;
    buttonTitle: string;
    buttonPointStyle: string;
    buttonBackground: string;
    buttonTextColor: string;
}

export const WorkSheetFile = ({
    workSheetName,
    workSheetDate,
    workSheetType,
    editorImg,
    editorName,
    reviserImg,
    reviserName,
    buttonTitle,
    buttonPointStyle,
    buttonBackground,
    buttonTextColor
}: Props) => {
    return (
        <div className="flex-col max-w-[360px] space-y-4 xl:flex xl:flex-row xl:max-w-none xl:justify-between bg-white py-5 px-6 items-center rounded-md">
            <div className="flex justify-between xl:hidden">
                <ButtonWithPointLeft title={buttonTitle} textColor={buttonTextColor} backgroundColor={buttonBackground} pointColor={buttonPointStyle} />
                <EllipsisHorizontalIcon className="w-7 h-7 text-d-gray-text" />
            </div>
            <div className="flex flex-col xl:contents">
                <WorkSheetCreator workSheeetName={workSheetName} workSheeetDate={workSheetDate} workSheeetType={workSheetType} />
                <WorkSheetProfile userImg={editorImg} userName={editorName} userRol="Editor" />
                <WorkSheetProfile userImg={reviserImg} userName={reviserName} userRol="Revisor" />

            </div>
            <div className="hidden xl:contents">

                <ButtonWithPointLeft title={buttonTitle} textColor={buttonTextColor} backgroundColor={buttonBackground} pointColor={buttonPointStyle} />
                <EllipsisHorizontalIcon className="w-7 h-7 text-d-gray-text" />
            </div>
        </div>
    )
}
