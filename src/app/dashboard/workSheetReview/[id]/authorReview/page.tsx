'use client'

import { redirect, useRouter } from 'next/navigation';
import { useAlert } from '@/src/users/context/AlertContext';
import { AuthorReviewComponent } from '@/src/worksheetsReview/components/AuthorReview/AuthorReviewComponent';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { AtSymbolIcon, CodeBracketIcon, LinkIcon } from '@heroicons/react/20/solid'
import { GetWorksheet } from '../../actions/get-worksheet';
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
                    router.push('/dashboard/worksheets/allSheets'); // Redirigir si hay error
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
        return <p className='animate-pulse'>Cargando...</p>; // Mostrar indicador de carga
    }

    if (error || !authorData) {
        return <p>Error al cargar los datos del autor.</p>; // Mostrar error
    }

    // const response = await getAuthorWorksheet(params.id);

    return (
        
        <AuthorReviewComponent data={authorData} />
    );
}