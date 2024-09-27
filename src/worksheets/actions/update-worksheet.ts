'use server'

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

interface UpdateWorksheetPayload {
    id: string | undefined
    title: string;
    assignedEditors: string[];
    assignedReviewers: string[];
}

export const updateWorksheet = async (payload: UpdateWorksheetPayload) => {

    const session = await getServerSession(authOptions);
    const { id, ...body } = payload;

    console.log("ID: ",id)
    if (!session?.user.roles.includes('admin')) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción',
        };
    }

    try {
        const response = await fetch(process.env.API_URL + `/cards/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...body }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            console.error('Error creating worksheet:', responseData);
            return {
                ok: false,
                message: responseData.message || 'No se pudo actualizar la ficha',
            };
        }

        revalidatePath('/dashboard/worksheets/validatedSheets');

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
