'use server'
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteCard = async (cardId: string | undefined) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return {
                ok: false,
                message: 'El usuario debe estar autenticado para realizar esta acción',
            };
        }

        const response = await fetch(process.env.API_URL + `/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar la ficha',
            };
        }

        const data = await response.json();

        revalidatePath('/dashboard/worksheets/validatedSheets');

        return {
            ok: true,
            data: data,
        };
    } catch (error) {
        console.error('Error fetching cards:', error);
        return {
            ok: false,
            message: 'Error al eliminar la ficha',
        };
    }
};