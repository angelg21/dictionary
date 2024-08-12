import { CheckIcon, HandThumbUpIcon, UserIcon } from '@heroicons/react/20/solid'


const timeline = [
    {
        id: 1,
        content: 'Detalles Personales',
        target: '1',
        href: '#',
        date: 'Sep 20',
        datetime: '2020-09-20',
        icon: UserIcon,
        iconBackground: 'bg-d-gray',
    },
    {
        id: 2,
        content: 'Trayectoria',
        target: '2',
        href: '#',
        date: 'Sep 22',
        datetime: '2020-09-22',
        icon: HandThumbUpIcon,
        iconBackground: 'bg-d-gray',
    },
    {
        id: 3,
        content: 'Revision de Datos',
        target: '3',
        href: '#',
        date: 'Sep 28',
        datetime: '2020-09-28',
        icon: CheckIcon,
        iconBackground: 'bg-d-gray',
    },
    {
        id: 4,
        content: 'Envio',
        target: '4',
        href: '#',
        date: 'Sep 30',
        datetime: '2020-09-30',
        icon: HandThumbUpIcon,
        iconBackground: 'bg-d-gray',
    }
]

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}


export const TimelineForm = () => {
    return (
        <div className="flow-root">
            <ul role="list" className="-mb-8">
                {timeline.map((event, eventIdx) => (
                    <li key={event.id}>
                        <div className={`relative ${eventIdx === timeline.length - 1 ? 'pb-0' : 'pb-28'}`}>
                            {eventIdx !== timeline.length - 1 ? (
                                <span aria-hidden="true" className="absolute left-[21px] top-8 -ml-px h-full w-0.5 bg-d-gray" />
                            ) : null}
                            <div className="relative flex space-x-3">
                                <div>
                                    <span
                                        className={classNames(
                                            event.iconBackground,
                                            'flex h-11 w-11 items-center justify-center rounded-full ring-8 ring-d-gray',
                                        )}
                                    >
                                        {/* <event.icon aria-hidden="true" className="h-5 w-5 text-white" /> */}
                                        <a href={event.href} className="text-2xl text-d-darkgray">
                                                {event.target}
                                        </a>
                                    </span>
                                </div>
                                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-2.5">
                                    <div>
                                        <p className="text-xl font-georgia text-black">
                                            {event.content}{' '}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
