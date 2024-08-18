


const tabs =
    [
        { name: 'Todas las Fichas', href: '#', current: false },
        { name: 'Fichas por Completar', href: '#', current: false },
        { name: 'Fichas por Revisar', href: '#', current: true },
        { name: 'Fichas Validadas', href: '#', current: false },
    ]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}



export const TabsMenu = () => {
    return (
        <div>
            <div className="sm:hidden mx-3">
                <label htmlFor="tabs" className="sr-only">
                    Select a tab
                </label>
                {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                <select
                    id="tabs"
                    name="tabs"
                    defaultValue={tabs.find((tab) => tab.current)?.name || ''}
                    // defaultValue={tabs.find((tab) => tab.current).name}
                    className="block w-full rounded-md border-gray-300  py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
            </div>
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav aria-label="Tabs" className="-mb-px flex space-x-8">
                        {tabs.map((tab) => (
                            <a
                                key={tab.name}
                                href={tab.href}
                                aria-current={tab.current ? 'page' : undefined}
                                className={classNames(
                                    tab.current
                                        ? 'border-d-blue text-d-blue '
                                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                    'whitespace-nowrap border-b-2 px-1 py-4 text-lg font-medium',
                                )}
                            >
                                {tab.name}
                            </a>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
