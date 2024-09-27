
import { XCircleIcon } from '@heroicons/react/20/solid'

interface ObservationTextProps {
    observation: string;
}

export const ObservationText = ({observation}: ObservationTextProps) => {
    return (
        <div className="rounded-b-md bg-red-50 p-4">
            <div className="flex">
                <div className="flex-shrink-0">
                    <XCircleIcon aria-hidden="true" className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Observación</h3>
                    <div className="mt-2 text-sm text-red-700">
                        <span>{observation}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
