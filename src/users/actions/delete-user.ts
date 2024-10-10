'use server'

import { authOptions } from "@/utils/config/authOptions";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const deleteUser = async (userId: string | undefined) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            return {
                ok: false,
                message: 'El usuario debe estar autenticado para realizar esta acción',
            };
        }

        const response = await fetch(process.env.API_URL + `/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return {
                ok: false,
                message: 'Error al eliminar el usuario',
            };
        }

        const data = await response.json();

        revalidatePath('/dashboard/users');

        return {
            ok: true,
            data: data,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            ok: false,
            message: 'Error al eliminar el usuario',
        };
    }
};