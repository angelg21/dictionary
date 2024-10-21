
const stats = [
    { id: 1, name: 'Autores registrados', value: '120+' },
    { id: 2, name: 'Obras literarias analizadas', value: '500+' },
    { id: 3, name: 'Usuarios que han utilizado la plataforma', value: '1,000+' },
    { id: 4, name: 'Reseñas y análisis generados por IA', value: '1,500+' },
]

export const StatsSection = () => {
    return (
        <div className="bg-white dark:bg-[#2D2D2D]">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:max-w-none">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                            Impacto de la plataforma en la literatura del estado Bolívar
                        </h2>
                        <p className="mt-4 text-lg leading-8 text-gray-600 dark:text-gray-400">
                            Nuestra plataforma ha unido a una comunidad de lectores, autores y académicos que comparten su pasión por la literatura del Estado Bolívar, creando nuevas oportunidades para el descubrimiento y la colaboración.
                        </p>
                    </div>
                    <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => (
                            <div key={stat.id} className="flex flex-col bg-white dark:bg-[#2D2D2D] p-8">
                                <dt className="text-sm font-semibold leading-6 text-gray-600 dark:text-gray-200">{stat.name}</dt>
                                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">{stat.value}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
