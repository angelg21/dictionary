

const featuredTestimonial = {
    body: 'Letrascopio es un diccionario IA de literatura regional venezolana hecho para todos los niveles, desde el investigador experto hasta el estudiante de las últimas etapas de la educación básica. Pretende ser un primer paso para remediar la ausencia de historias y críticas acerca de nuestras letras y además constituye una suerte de biblioteca digital (con bibliotecario incluido) que preserva y difunde la literatura del estado Bolívar. Con Letrascopio redescubriremos un universo de nuestra cultura regional que nos deparará grandiosas sorpresas',
    author: {
        name: 'Dr. Diego Rojas Ajmad',
        handle: 'Universidad Nacional Experimental de Guayana y Universidad Católica Andrés Bello-Guayana.',
        imageUrl:
            'https://res.cloudinary.com/dlhvylz4p/image/upload/v1731637786/Dictionary/Landing/Testimonials/b3e7pidza3jyzu5dekcf.jpg',
        logoUrl: 'https://res.cloudinary.com/dlhvylz4p/image/upload/v1729139215/Dictionary/Landing/Testimonials/zbsgps0fv74j3e55uo6m.png',
    },
}
const testimonials = [
    [
        [
            {
                body: 'El Diccionario de literatura del estado Bolívar es un maravilloso ejemplo de construcción interdisciplinar del conocimiento. En él, los diseñadores han puesto todo su saber e ingenio y estoy segura de que será una valiosa herramienta de consulta permanente para redescubrir nuestro estado. Felicitaciones para los creadores.',
                author: {
                    name: 'Dra. Nay Valero',
                    handle: 'Educación Ambiental para la Sostenibilidad. UNEG.',
                    imageUrl:
                        'https://res.cloudinary.com/dlhvylz4p/image/upload/v1730825035/Dictionary/Landing/Testimonials/msthbwlkkbcbcqomm3vk.jpg',
                },
            },
            // More testimonials...
        ],
        [
            // {
            //     body: 'Aut reprehenderit voluptatem eum asperiores beatae id. Iure molestiae ipsam ut officia rem nulla blanditiis.',
            //     author: {
            //         name: 'Lindsay Walton',
            //         handle: 'lindsaywalton',
            //         imageUrl:
            //             'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            //     },
            // },
            // More testimonials...
        ],
    ],
    [
        [
            // {
            //     body: 'Voluptas quos itaque ipsam in voluptatem est. Iste eos blanditiis repudiandae. Earum deserunt enim molestiae ipsum perferendis recusandae saepe corrupti.',
            //     author: {
            //         name: 'Tom Cook',
            //         handle: 'tomcook',
            //         imageUrl:
            //             'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            //     },
            // },
            // More testimonials...
        ],
        [
            {
                body: 'Es como tener un amigo al que puedo consultar cuando deseo saber algo o aclarar alguna duda acerca de la literatura del estado Bolívar, porque tiene la información que necesito y está disponible las 24 horas del día',
                author: {
                    name: 'Dra. Aura Balbi',
                    handle: 'Profesora de la UCAB Guayana.',
                    imageUrl:
                        'https://res.cloudinary.com/dlhvylz4p/image/upload/v1731638137/Dictionary/Landing/Testimonials/zolenmdfug9ugukuz8ik.jpg',
                },
            },
            // More testimonials...
        ],
    ],
]

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export const Testimonials = () => {
    return (
        <div className="relative isolate bg-white dark:bg-[#2D2D2D] pb-20 pt-18 ">
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/2 -z-10 -translate-y-1/2 transform-gpu overflow-hidden opacity-30 blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="ml-[max(50%,38rem)] aspect-[1313/771] w-[82.0625rem] bg-gradient-to-tr from-[#DAA520] to-[#F3DFA7]"
                />
            </div>
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-0 -z-10 flex transform-gpu overflow-hidden pt-32 opacity-25 blur-3xl sm:pt-40 xl:justify-end"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="ml-[-22rem] aspect-[1313/771] w-[82.0625rem] flex-none origin-top-right rotate-[30deg] bg-gradient-to-tr from-[#DAA520] to-[#F3DFA7] xl:ml-0 xl:mr-[calc(50%-12rem)]"
                />
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-lg font-semibold leading-8 tracking-tight text-d-yellow">TESTIMONIOS</h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
                        Hemos transformado la forma en que se explora la literatura del estado Bolívar
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 grid-rows-1 gap-8 text-sm leading-6 text-gray-900 sm:mt-20 sm:grid-cols-2 xl:mx-0 xl:max-w-none xl:grid-flow-col xl:grid-cols-4">
                    <figure className="relative rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 sm:col-span-2 xl:col-start-2 xl:row-end-1">
                        <img
                            alt=""
                            src={featuredTestimonial.author.imageUrl}
                            className="absolute top-0 left-1/2 max-sm:h-[90px] max-sm:w-[90px] h-[118px] w-[118px] rounded-full bg-gray-50 border-4 border-white shadow-2xl transform -translate-y-10 -translate-x-1/2"
                        />
                        <blockquote className="px-6 pb-6 pt-14 sm:pt-20 sm:py-12 sm:px-12 text-lg font-semibold leading-7 tracking-tight text-gray-900 sm:text-xl sm:leading-8">
                            <p>{`${featuredTestimonial.body}`}</p>
                        </blockquote>
                        <figcaption className="flex flex-wrap items-center gap-x-4 gap-y-4 border-t border-gray-900/10 px-6 py-4 sm:flex-nowrap">
                            <div className="flex-auto">
                                <div className="font-semibold">{featuredTestimonial.author.name}</div>
                                <div className="text-gray-600">{`${featuredTestimonial.author.handle}`}</div>
                            </div>
                            {/* <img alt="" src={featuredTestimonial.author.logoUrl} className="h-10 w-auto flex-none" /> */}
                        </figcaption>
                    </figure>
                    {testimonials.map((columnGroup, columnGroupIdx) => (
                        <div key={columnGroupIdx} className="xl:contents xl:space-y-0">
                            {columnGroup.map((column, columnIdx) => (
                                <div
                                    key={columnIdx}
                                    className={classNames(
                                        (columnGroupIdx === 0 && columnIdx === 0) ||
                                            (columnGroupIdx === testimonials.length - 1 && columnIdx === columnGroup.length - 1)
                                            ? 'xl:row-span-2'
                                            : 'xl:row-start-1',
                                        'space-y-8',
                                    )}
                                >
                                    {column.map((testimonial) => (
                                        <figure
                                            key={testimonial.author.handle}
                                            className="relative rounded-2xl bg-white p-6 shadow-lg ring-1 ring-gray-900/5"
                                        >
                                            <blockquote className="text-gray-900 font-medium">
                                                <p>{`${testimonial.body}`}</p>
                                            </blockquote>
                                            <figcaption className="mt-6 flex items-center gap-x-4 relative">
                                                <img
                                                    alt=""
                                                    src={testimonial.author.imageUrl}
                                                    className={classNames(
                                                        'absolute max-sm:h-[90px] max-sm:w-[90px] h-[115px] w-[115px] xl:h-[100px] xl:w-[100px] rounded-full bg-gray-50 border-4 border-white shadow-lg transform translate-y-7 ',
                                                        // Si está en la columna de la derecha, alinearlo a la derecha; si no, alinearlo a la izquierda
                                                        columnIdx % 2 === 0 ? '-translate-x-16 left-0' : 'translate-x-16 right-0'
                                                    )}
                                                />
                                                <div className={classNames(
                                                    columnIdx % 2 === 0 ? 'text-right' : 'pr-16', // Alineado a la derecha y con el mismo padding
                                                    'flex-1'
                                                )}>
                                                    <div className="font-semibold">{testimonial.author.name}</div>
                                                    <div className="text-gray-600">{`${testimonial.author.handle}`}</div>
                                                </div>
                                            </figcaption>
                                        </figure>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
