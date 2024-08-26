'use server'

import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const changeUserRole = async( userId: string | undefined, roles: string[] = []) => {

    const session = await getServerSession(authOptions);

    if ( !session?.user.roles.includes('admin') ) {
        return {
            ok: false,
            message: 'No tienes permisos para realizar esta acción',
        };
    }

    try{
        const response = await fetch(process.env.API_URL + `/users/assign-roles`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, roles }),
        });

        if (!response.ok) {
            return {
                ok: false,
                message: 'No se pudo actualizar el rol',
            };
        }

        revalidatePath('/dashboard/users');

        return {
            ok: true,
            message: 'Roles actualizados correctamente',
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        return {
            ok: false,
            message: 'No se pudo actualizar el rol',
        };
    }
}
