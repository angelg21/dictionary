

const featuredTestimonial = {
    body: 'Integer id nunc sit semper purus. Bibendum at lacus ut arcu blandit montes vitae auctor libero. Hac condimentum dignissim nibh vulputate ut nunc. Amet nibh orci mi venenatis blandit vel et proin. Non hendrerit in vel ac diam.',
    author: {
        name: 'Diego Rojas Ajmad',
        handle: 'Profesor de la UCAB en la Escuela de Comunicación Social',
        imageUrl:
            'https://res.cloudinary.com/dlhvylz4p/image/upload/v1729138961/Dictionary/Landing/Testimonials/rgdulhd72lpzq5qjtuk2.jpg',
        logoUrl: 'https://res.cloudinary.com/dlhvylz4p/image/upload/v1729139215/Dictionary/Landing/Testimonials/zbsgps0fv74j3e55uo6m.png',
    },
}
const testimonials = [
    [
        [
            {
                body: 'Laborum quis quam. Dolorum et ut quod quia. Voluptas numquam delectus nihil. Aut enim doloremque et ipsam.',
                author: {
                    name: 'Leslie Alexander',
                    handle: 'lesliealexander',
                    imageUrl:
                        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
                body: 'Molestias ea earum quos nostrum doloremque sed. Quaerat quasi aut velit incidunt excepturi rerum voluptatem minus harum.',
                author: {
                    name: 'Leonard Krasner',
                    handle: 'leonardkrasner',
                    imageUrl:
                        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
                                            <blockquote className="text-gray-900">
                                                <p>{`${testimonial.body}`}</p>
                                            </blockquote>
                                            <figcaption className="mt-6 flex items-center gap-x-4 relative">
                                                <img
                                                    alt=""
                                                    src={testimonial.author.imageUrl}
                                                    className={classNames(
                                                        'absolute max-sm:h-[90px] max-sm:w-[90px] h-[118px] w-[118px] rounded-full bg-gray-50 border-4 border-white shadow-lg transform translate-y-7',
                                                        // Si está en la columna de la derecha, alinearlo a la derecha, si no, alinearlo a la izquierda
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
