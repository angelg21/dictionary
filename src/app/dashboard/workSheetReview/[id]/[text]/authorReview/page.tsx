'use client'

import { redirect, useRouter } from 'next/navigation';
import { useAlert } from '@/src/users/context/AlertContext';
import { AuthorReviewComponent } from '@/src/worksheetsReview/components/AuthorReview/AuthorReviewComponent';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { AtSymbolIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/20/solid'
import { GetWorksheet } from '../../../actions/get-worksheet';
import { div } from 'framer-motion/client';
import { useEffect, useState } from 'react';


export default function AuthorReview({ params }: { params: { id: string } }) {


    
    const [authorData, setAuthorData] = useState<any>(null); // Para almacenar los datos del autor
    const [loading, setLoading] = useState(true); // Para controlar el estado de carga
    const [error, setError] = useState(false); // Para controlar errores
    const router = useRouter(); // Usar router para redirección en el cliente

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetWorksheet(params.id);
                if (response.ok) {
                    setAuthorData(response.data);
                } else {
                    router.push('/dashboard/worksheets/sheetsToComplete'); // Redirigir si hay error
                }
            } catch (err) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Llama a la API cuando el componente se monte
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-d-fondo">
                <div className="flex flex-col items-center space-y-2">
                    {/* Spinner */}
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-d-blue"></div>

                    {/* Texto de carga */}
                    <p className="text-lg font-semibold text-gray-700 tracking-wide">
                        Cargando...
                    </p>
                </div>
            </div>
        );
    }

    if (error || !authorData) {
        return <p>Error al cargar los datos del autor.</p>; // Mostrar error
    }

    // const response = await getAuthorWorksheet(params.id);

    return (
        
        <AuthorReviewComponent data={authorData} />
    );
}