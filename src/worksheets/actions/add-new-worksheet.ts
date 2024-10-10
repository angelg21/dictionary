'use server'

import { authOptions } from "@/utils/config/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface AddNewWorksheetPayload {
    type: string;
    title: string;
    createdBy: string;
    assignedEditors: string[];
    assignedReviewers: string[];
}

export const addNewWorksheet = async (payload: AddNewWorksheetPayload) => {

    const session = await getServerSession(authOptions);

    if (!session?.user.roles.includes('admin')) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción',
        };
    }

    try {
        const response = await fetch(process.env.API_URL + `/cards`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...payload }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating worksheet:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo crear la ficha',
            };
        }

        revalidatePath('/dashboard/worksheets/sheetsToComplete');

        return {
            ok: true,
            message: 'Ficha creada correctamente',
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar el rol',
        };
    }
}
