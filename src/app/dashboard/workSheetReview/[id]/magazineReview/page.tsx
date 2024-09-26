'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GetWorksheet } from "../../actions/get-worksheet";
import { MagazineReviewComponent } from "@/src/worksheetsReview/components/MagazineReview/MagazineReviewComponent";


export default function MagazineReview({ params }: { params: { id: string } }) {

    const [magazineData, setMagazineData] = useState<any>(null); // Para almacenar los datos del autor
    const [loading, setLoading] = useState(true); // Para controlar el estado de carga
    const [error, setError] = useState(false); // Para controlar errores
    const router = useRouter(); // Usar router para redirección en el cliente

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetWorksheet(params.id);
                if (response.ok) {
                    setMagazineData(response.data);
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

    if (error || !magazineData) {
        return <p>Error al cargar los datos del autor.</p>; // Mostrar error
    }
    
    return (
        <div className="">
            <MagazineReviewComponent data={magazineData} />
        </div>
    );
}