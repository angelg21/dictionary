import { ExclamationCircleIcon } from '@heroicons/react/20/solid'


export const InputWithLabel = () => {
    return (
        <div>
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email
            </label>
            <div className="mt-2">
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    className="block w-[500px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
        </div>
    );
}