'use client'

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { MagazineReviewComponent } from "@/src/worksheetsReview/components/MagazineReview/MagazineReviewComponent";
import { GroupingReviewComponent } from "@/src/worksheetsReview/components/GroupingReview/GroupingReviewComponent";
import { AnthologyReviewComponent } from "@/src/worksheetsReview/components/AnthologyReview/AnthologyReviewComponent";
import { GetWorksheet } from "../../../actions/get-worksheet";

export default function AnthologyReview({ params }: { params: { id: string } }) {

    const [anthologyData, setAnthologyData] = useState<any>(null); // Para almacenar los datos del autor
    const [loading, setLoading] = useState(true); // Para controlar el estado de carga
    const [error, setError] = useState(false); // Para controlar errores
    const router = useRouter(); // Usar router para redirección en el cliente

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetWorksheet(params.id);
                if (response.ok) {
                    setAnthologyData(response.data);
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

    if (error || !anthologyData) {
        return <p>Error al cargar los datos del autor.</p>; // Mostrar error
    }

    return (
        <div className="">
            <AnthologyReviewComponent data={anthologyData}/>
        </div>
    );
}